import { SideNav } from "./SideNav"
import { TopTitleBar } from "./TopTitle"
export default function Dashboard(){
    return(
        <>
        <TopTitleBar text={"Dashboard"}/>
        <div className="body grid">
            <SideNav/>
            <div className="actual_dash_body">
                <h3>Home</h3>
                <h4>Your Jailhaus Details: </h4>
                <div className="grid thingies">
                    <div>
                        <p>Passwords: 27</p>
                        <p>Average Password Length: 5 characters</p>
                        <p>Password Strength Status : 24.75%, Needs Work</p>
                        <a href='/dashboard/passwords'>See Password Advisor</a>
                    </div>
                    <div>
                        <p>Files: 5/ 25GB</p>
                        <p>File Type(s): .mkv, .docx, .pdf, .jpg</p>
                        <a>Get More Storage</a>
                    </div>
                    <div>
                        <p>Files: 5/ 25GB</p>
                        <p>File Type(s): .mkv, .docx, .pdf, .jpg</p>
                        <a>Get More Storage</a>
                    </div>
                </div>
            </div>
        </div>
        </>
    )  
}