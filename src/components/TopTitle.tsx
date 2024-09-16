import { useState } from "react"
import { signOut } from "../supabase/signUpIn"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../redux/hooks"
import { changePwds, setSeedValues } from "../redux/idState"

export function TopTitleBar<Q extends {text: string}>(props : Q ){
    let text : string = props.text
    let [navState, change] = useState(false)
    let gideon = useNavigate();
    let dispatch = useAppDispatch()
    return(
        <div className='dash_head'>
        <h2 style={{textTransform:"capitalize"}}>{text}</h2>
        <div className='mobile_nav'>
                <div className="nav_click" onClick={()=> change(true)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div className={`nav_content ${navState ? 'show' : ''}`}>
                    <span onClick={()=> change(false)}>X</span>
                    <a href="/dashboard">Home</a>
                    <a href="/dashboard/passwords">Passwords</a>
                    <a href="/dashboard/files">Secure Files</a>
                    <a>Settings</a>
                    <a onClick={()=> {
                        dispatch(changePwds([]));
                        dispatch(setSeedValues([]));
                        signOut();
                        gideon('/')
                    }}>Sign Out</a>
                </div>
        </div>
    )
}
