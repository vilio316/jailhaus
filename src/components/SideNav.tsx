import { FaFile, FaHome, FaSignOutAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { FcSettings } from "react-icons/fc";
import { signOut } from "../supabase/signUpIn"
import { useAppDispatch } from "../redux/hooks"
import { changePwds, setID, setSeedValues } from "../redux/idState"
import { useNavigate } from "react-router-dom"
import { useState } from "react";


export function SideNav(){
    let dispo = useAppDispatch();
    let drought = useNavigate();
    let [modalState, setMod]= useState(false)
    
    return(
        <>
            <div className="side_nav grid">
                <div className="nav_icon">
                    <div className="icon_side">
                    <FaHome/>
                    <a href="/dashboard">Home</a>
                    </div>
                </div>

            <div className="nav_icon" style={{position: "relative"}} onClick={()=> setMod(!modalState)}>
                <FaLock/>
                <a>Passwords</a>
                {modalState? <div id="password_container" >
                    <a href="/dashboard/passwords">Passwords</a>
                    <a href="/dashboard/passwords#seed_phrases">Seed Phrases</a>
                </div> : <>
                
                </>}
                </div>
                <div className="nav_icon">
                <FaFile/>
                <a href="/dashboard/files">Secure Files</a>
                </div>
                <div className="nav_icon">
                <FcSettings/>
                <a href="/dashboard">Settings</a>
                </div>
                <div className="nav_icon">
                <FaSignOutAlt/>
                <button className= "signOut_button" onClick={()=> {
                signOut(); 
                dispo(setID(''));
                dispo(changePwds([]));
                dispo(setSeedValues([]));
                drought('/')
                }
                }><a>Sign Out</a></button>
                </div>
            </div>
        </>
    )
}