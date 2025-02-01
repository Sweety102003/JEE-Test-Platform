import React from 'react';
import { RiCloseLine } from "react-icons/ri";
import "./css files/modal.css";
import { useNavigate } from 'react-router-dom';

export default function Logout({ setmodalOpen }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        window.dispatchEvent(new Event("storage"));  
        setmodalOpen(false);
        navigate("/login");
    };

    return (
        <div className='darkBg' onClick={() => setmodalOpen(false)}>
            <div className="centered">
                <div className="modal">
                    <div className="modalHeader">
                        <h5 className='heading'>Confirm</h5>
                        <button className='closeBtn' style={{ width: "20%" }} onClick={() => setmodalOpen(false)}>
                            <RiCloseLine />
                        </button>
                    </div>
                    <div className="modalContent">
                        Are you really want to log out?
                    </div>
                    <div className="modalActions">
                        <div className="actionsContainer">
                            <button className='logOutBtn' onClick={handleLogout}>
                                Log Out
                            </button>
                            <button className='cancelBtn' onClick={() => setmodalOpen(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
