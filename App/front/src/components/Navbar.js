import React from "react";
import { FaDisease } from "react-icons/fa"
import { useNavigate } from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate()

    const handleUploadRedirect = () => {
        navigate('/upload', {replace: true})
    }

    const handleLandingRedirect = () => {
        navigate('/', {replace: true})
    }

    return (
        <div className="nav primary">
            <div className="nav-container" onClick={handleLandingRedirect}>
                <FaDisease className="nav-icon"/>
                <span className="nav-span">Skin Disease Classification Helper</span>
            </div>
            <div>
                <button className="nav-btn" onClick={handleUploadRedirect}>Charger une image</button>
            </div>
        </div>
    )
}