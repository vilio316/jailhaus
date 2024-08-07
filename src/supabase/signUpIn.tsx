import { useState } from "react";
import supaClient from "./supaconfig"
import { setID } from "../redux/idState"
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";

export function SignIn(){
    let [email, changeMail] = useState('');
    let [password, changePassword] = useState('')
    let [sign_inEmail, signMail] = useState('');
    let [sign_inPassword, signPassword] = useState('')
    let dispo= useAppDispatch()
    let goTo = useNavigate()


    async function signUp(){
        let {data, error} = await supaClient.auth.signUp({
            email: email, 
            password: password
        })
        console.log(data);
        console.error(error)
    }

    async function signIn(){
        let {data, error} = await supaClient.auth.signInWithPassword({
            email: sign_inEmail,
            password: sign_inPassword
        })
        if(data.user){
        dispo(setID(data.user.id))
        console.log(data)
        goTo('/dashboard')
        }
        else{
            console.log(error)
        }
    }

    return(
        <>
        <div>
            <p>Sign Up For JailHaus</p>
        <input type='text' placeholder="Email" onChange={(e)=> changeMail(e.target.value)}/>
        <input type="password" name="password" id="Password" placeholder="pwd" onChange={(e) => changePassword(e.target.value)} />
        <button onClick={()=> signUp()}>Sign Up!</button>
        </div>

        <div>
            <p>Sign In to your Jailhaus</p>
        <input type='text' placeholder="Sign_IN: Email" onChange={(e)=> signMail(e.target.value)}/>
        <input type="password" name="password" id="password" placeholder="Sign In: Password" onChange={(e) => signPassword(e.target.value)} />
        <button onClick={()=> {signIn()}}>Sign In!</button>
        </div>
        </>
    )
}

export async function signOut(){
    let { error } = await supaClient.auth.signOut()
    console.log(error)
}