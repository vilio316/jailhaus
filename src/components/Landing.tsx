export default function Landing(){
    return(
        <>
        <div className="header grid">
            <div>
                <h2 className="logo">Jailhaus</h2>
            </div>
            <div className="topNav">
                <a href='/'>Home</a>
                <a>About</a>
                <a>Our Services</a>
                <a>Contact</a>
            </div>
            <div  className="side">
                <a href="/sign-in">Log In / Sign Up</a>
            </div>
        </div>

            <section className="hero">
                <div className="grid">
                    <p className="lead">YONO: You Only Need One</p>
                    <p className="follow">Dependable and secure storage for passwords, files and sensitive data</p>
                    <a className="cta">Read More</a>
                </div>
            </section>

            <section className="perk"> 
                <div>
                    <p>What We Do</p>
                    <p>Jailhaus is a web-based software platform that allows users to access and store files, documents and other sensitive files. If you've ever been worried about forgetting your passwords or losing your hardware tokens and seed phrases, Jailhaus was made with you in mind! We offer top-notch security for all your data and can ensure that no one but you has access to <i>your</i> files.</p>
                </div>
            </section>
                <p>Why Should You Use Jailhaus?</p>

                <section className="perk">
                <div>
                    <p>Security</p>
                    <p>"Whatever's stored with Jailhaus stays with Jailhaus". It's been our motto from the very beginning and now, it's an assurance we're giving you as well. Jailhaus will <i>never</i> disclose your data to external parties and we will always mantain a high security standard with all of our apps. Our databases are also <i>Row Level Secure</i>, which basically means that they're totally safe from any bad actors trying to worm their way in.</p>
                </div>
            </section>

            <section className="perk">
                <div>
                    <p>Ease of Access</p>
                    <p>Away from all of the technical jargon, Jailhaus prioritises you, the user. We've engineered the system to ensure that it's easy and hitch-free to use. From any of your devices and at any point in time, you're sure to have secure, dependable access to the files that you store with us!</p>
                </div>
            </section>

            <section className="perk">
                <div>
                    <p>Versatility</p>
                    <p>While passwords are our most common use case, our system is also suited for several other purposes, including file storage and encryption. With Jailhaus, you won't have to worry about losing access to vital files because we'll ensure that they're all tidily stored in one place.</p>
                </div>
            </section>

            <section className="pricing">
                <h3>Find A Plan That's Right for You</h3>
                <div className="price_board grid">
                    <div className="price_card">
                        <p className='price_tier'>Free</p>
                        <div>
                            <ul className="features">
                                <li>Unlimited Password Storage</li>
                                <li>5GB Storage for Files</li>
                                <li className="hidden">Password Generator</li>
                                <li className="hidden">Multi-device login</li>
                                <li className="hidden">Password Health Stats</li>
                                <li className="hidden">Access Logs & 2FA</li>
                            </ul>
                        </div>
                    </div>
                    <div className="price_card">
                        <p className='price_tier'>Basic</p>
                        <div>
                            <ul className="features">
                            <li>Unlimited Password Storage</li>
                                <li>15GB Storage for Files</li>
                                <li>Password Generator</li>
                                <li>Multi-device login</li>
                                <li className="hidden">Password Health Stats</li>
                                <li className="hidden">Access Logs & 2FA</li>
                            </ul>
                        </div>
                    </div>
                    <div className="price_card">
                        <p className='price_tier'>UberLok</p>
                        <div>
                            <ul className="features">
                            <li>Unlimited Password Storage</li>
                                <li>50GB Storage for Files</li>
                                <li>Password Generator</li>
                                <li>Multi-device login</li>
                                <li>Password Health Stats</li>
                                <li>Access Logs & 2FA</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="grid">
                    <a className="cta">View Custom Plans</a>
                </div>
            </section>

        <footer className="grid">
            <div>
                <h2>Jailhaus</h2>
                <p> &copy; 2024 vilio316</p>
                <p>The One Pass System</p>
            </div>
            <div className="links">
                <p>About Jailhaus</p>
                <a>Mission and Vision Statement</a>
                <a>Our Services</a>
                <a>Our Staff</a>
                <a>Pricing Plans</a>
                <a>Privacy and Information Security Policy</a>
                <a>Terms and Conditions</a>
            </div>    
            <div className="links">
                <p>Contact Us</p>
                <a>E-Mail</a>
                <a>Twitter</a>
                <a>Instagram</a>
                <a>Github</a>
            </div>
        </footer>
        </>
    )
}