import { useState } from "react"

export function TopTitleBar<Q extends {text: string}>(props : Q ){
    let text : string = props.text
    let [navState, change] = useState(false)
    return(
        <div className='dash_head'>
        <h2 style={{textTransform:"capitalize"}}>{text}</h2>
        <div className='mobile_nav'>
                <div className="nav_click" onClick={()=> change(true)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className={`nav_content ${navState ? 'show' : ''}`}>
                    <span onClick={()=> change(false)}>X</span>
                    <a href="/dashboard">Home</a>
                    <a href="/dashboard/passwords">Passwords</a>
                    <a href="/dashboard/files">Secure Files</a>
                    <a>Settings</a>
                    <a>Sign Out</a>
                </div>
            </div>
        </div>
    )
}
