import { useState } from "react";
import supaClient from "./supaconfig"

export function SignIn(){
    let [email, changeMail] = useState('');
    let [password, changePassword] = useState('')
    let [sign_inEmail, signMail] = useState('');
    let [sign_inPassword, signPassword] = useState('')


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
        console.log(data, error)
    }


    return(
        <>
        <input type='text' placeholder="email" onChange={(e)=> changeMail(e.target.value)}/>
        <input type="password" name="password" id="pwd" placeholder="pwd" onChange={(e) => changePassword(e.target.value)} />
        <button onClick={()=> signUp()}>Sign Up!</button>

        <input type='text' placeholder="Sign_IN: Email" onChange={(e)=> signMail(e.target.value)}/>
        <input type="password" name="password" id="pwd" placeholder="Sign In: Password" onChange={(e) => signPassword(e.target.value)} />
        <button onClick={()=> signIn()}>Sign Up!</button>
        </>
    )
}