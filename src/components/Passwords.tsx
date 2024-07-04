import { SideNav } from "./SideNav";
import { TopTitleBar } from "./TopTitle";

export default function Passwords(){
    return(
        <>
        <TopTitleBar text={'Passwords'} />
        <div className="body grid">
        <SideNav/>
        <div className="details">
            <h3>Details for Your Passwords</h3>
            <div className="password">
                <div className="password">
                    <h4>Service</h4>
                    <p className='passText'>........</p>
                </div>
            </div>
        </div>
        </div>
        </>
    )
}