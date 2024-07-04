import { FaFile, FaHome, FaSignOutAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { FcSettings } from "react-icons/fc";

export function SideNav(){
    return(
        <>
            <div className="side_nav grid">
                <div className="nav_icons">
                    <div className="icon_side">
                    <FaHome/>
                    <a href="/dashboard">Home</a>
                    </div>
                </div>

                <div className="nav_icon">
                <FaLock/>
                <a href="/dashboard/passwords">Passwords</a>
                </div>
                <div className="nav_icon">
                <FaFile/>
                <a href="/dashboard">Secure Files</a>
                </div>
                <div className="nav_icon">
                <FcSettings/>
                <a href="/dashboard">Settings</a>
                </div>
                <div className="nav_icon">
                <FaSignOutAlt/>
                <a href="/">Sign Out</a>
                </div>
            </div>
        </>
    )
}