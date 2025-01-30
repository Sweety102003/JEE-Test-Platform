const nodemailer=require("nodemailer");
const cron=require("node-cron");
const USER = require("../models/user");
const Test = require("../models/tests");
const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"kavyahooda83@gmail.com",
        pass:"wtzj yozt utnu atgu"
    }
});
cron.schedule("1 5 * * *", async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const upcomingTests = await Test.find({ date: { $gte: tomorrow, $lt: new Date(tomorrow).setHours(23, 59, 59) } });

    if (upcomingTests.length > 0) {
        const users = await USER.find();

        users.forEach(user => {
            transporter.sendMail({
                from: "kavyahooda83@gmail.com",
                to: user.email,
                subject: "Upcoming Test Reminder",
                text: `Hello ${user.name}, you have the following tests tomorrow: ${upcomingTests.map(test => test.testname).join(", ")}.Please attempt it as it will enhance your performance`,
            });
        });
    }
});

