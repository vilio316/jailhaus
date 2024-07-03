export function SideNav(){
    return(
        <>
            <div className="side_nav grid">
                <div className="nav_icons">
                    <div className="icon_side">
                    <p>Icon</p>
                    <a href="/dashboard">Home</a>
                    </div>
                </div>

                <div className="nav_icon">
                <p>Icon</p>
                <a href="/dashboard/passwords">Passwords</a>
                </div>
                <div className="nav_icon">
                <p>Icon</p>
                <a href="/dashboard">Secure Files</a>
                </div>
                <div className="nav_icon">
                <p>Icon</p>
                <a href="/dashboard">Settings</a>
                </div>
                <div className="nav_icon">
                <p>Icon</p>
                <a href="/">Sign Out</a>
                </div>
            </div>
        </>
    )
}