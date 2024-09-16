import { useState } from "react";
import supaClient from "./supaconfig";
import { setID } from "../redux/idState"
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
//import { FaFacebook, FaGoogle } from "react-icons/fa";

export function SignUp(){
    let [email, changeMail] = useState('');
    let [password, changePassword] = useState('')
    let navigate = useNavigate()

    async function signUp(email: string, password: string){
        let {data, error} = await supaClient.auth.signUp({
            email: email, 
            password: password
        })
        console.log(data);
        console.error(error)
    }
    return(
        <>
            <div> 
            <h2>Sign Up For JailHaus</h2>
        <input type='text'  className="sign_form_input"  placeholder="Email" onChange={(e)=> changeMail(e.target.value)}/>
        <input type="password"  className="sign_form_input" name="password" id="Password" placeholder="Password" onChange={(e) => changePassword(e.target.value)} />
        <button className="form_button" onClick={()=> {
            signUp(email, password); 
            navigate('/sign-in')
        }}>Sign Up!</button>
        <p><i>Already have an account? <a href='/sign-in' className="actionLink">Sign in here</a></i></p>
        </div>
        </>
    )
}

export function SignIn(){
    let [pass_valid, validity] = useState(true)
    let [sign_inEmail, signMail] = useState('');
    let [sign_inPassword, signPassword] = useState('')
    let dispo= useAppDispatch()
    let goTo = useNavigate()

    async function signIn(email : string, password : string){
        let {data, error} = await supaClient.auth.signInWithPassword({
            email: email,
            password: password,
        })
        if(data.user){
        dispo(setID(data.user.id))
        validity(true)
        console.log(data)
        goTo('/dashboard')
        }
        else{
            console.log(error)
            validity(false)
        }
    }

    return(
        <>
        <div>
            <h2>Sign In to your Jailhaus</h2>
        <input type='text' className="sign_form_input" placeholder="Email" onChange={(e)=> signMail(e.target.value)}/>
        <input type="password"  className="sign_form_input" name="password" id="password" placeholder="Password" onChange={(e) => signPassword(e.target.value)} />
        <p style={{
            color: 'red',
        }}>{pass_valid ? '' : "Error: Incorrect Username or Password"}</p>
        <button className="form_button" onClick={()=> {signIn(sign_inEmail, sign_inPassword)}}>Sign In!</button>
        <p>Don't have an account? <a href='/sign-up' className="actionLink">Sign Up</a> here</p>
        </div>
        </>
    )
}

export async function signOut(){
    let { error } = await supaClient.auth.signOut()
    console.log(error)
}