import { useState } from "react"
import { FaEye, FaEyeSlash, FaEdit, FaTrash } from "react-icons/fa"
import { PwdDetail
 } from "./Passwords";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { changePwds, userPwds, userID } from "../redux/idState";
import supaClient from "../supabase/supaconfig";

export function PassDetails(props: any){
    let pass_detail : PwdDetail = props.object
    let user_passes = useAppSelector(userPwds)
    let user_id_val = useAppSelector(userID)
    let sendOff = useAppDispatch()

    async function deleteValue(passwordObject : PwdDetail){
        let store_value : PwdDetail[]= user_passes[0];
        let pass_str = passwordObject.service
        let empty = []
        let updated_store_value = store_value.filter((member) => member.service !== pass_str)
        empty.push(updated_store_value)
        sendOff(changePwds(empty))
        let {data, error} = await supaClient.from("data_bank").update({
            passwords: updated_store_value

        }).eq('id', user_id_val)
        console.log(data, error)
    }

    async function editValue(pass : PwdDetail, new_service_name : string, new_pass_value : string){
        let store_value : PwdDetail[] = user_passes[0]
        let check_Str = pass.service
        let empty = []
        let new_array = store_value.filter((member) => member.service !== check_Str)
        let new_pass_obj ={...pass, password: new_pass_value, service: new_service_name}
        new_array.push(new_pass_obj)
        empty.push(new_array)
        
        sendOff(changePwds(empty))
        let {data, error} = await supaClient.from("data_bank").update({
            passwords: new_array

        }).eq('id', user_id_val)
        console.log(data, error)
        alert("Edited Successfully!")
    }
   
    let [showState, changeShow] = useState(false)
    let [edit_feat, showEdit] = useState(false)
    let [service, changeService] = useState(pass_detail.service)
    let [password, changePassword] = useState(pass_detail.password)

   
    return(
        <>
        <div style={{position: 'relative'}}>
            <p className= "pass_head">{pass_detail.service}</p>
            <input className="pass_string" name={pass_detail.service}
            value={pass_detail.password} 
            type={showState? 'text' : "password"} 
            style={{
                border: "none",
                outline: "none",
                textIndent: "0",
            }}
            readOnly />        
            </div>
        <div className="grid like_material" style={{
            gridTemplateColumns: "auto auto"
        }}>
            <button onClick={()=> changeShow(!showState)}>
                {showState? <FaEye/> : <FaEyeSlash/>}
            </button>

            <div className='grid buttons' style={{gridTemplateColumns:"auto auto", gap:"0.25rem"}}>
            <button title="Edit Item" onClick={()=> showEdit(true)}>
            <FaEdit/>
            </button>
            <button onClick={()=> deleteValue(pass_detail)} title="Delete Item"> <FaTrash fill='red'/></button>
            </div>

           {edit_feat ? 
           <>
           <div style={{position: "absolute", top: '0', left:"0", width:"100%", height:"100%", zIndex:'2', backgroundColor:"rgba(175,175,175,0.8)", display:'grid', justifyItems:"center", alignItems:"center"}}>
                <div style={{display:'grid', alignSelf:"start", marginTop:'10rem'}}>
                    <span style={{
                        fontSize: '1.5rem',
                        justifySelf: 'end',

                    }} onClick={()=> showEdit(false)}> X </span>
                    <h3>Edit This Password?</h3>
                    <label htmlFor="ed_serv">Edit Service</label>
                    <input type="text" id="ed_serv" defaultValue={pass_detail.service} onChange={(e) => changeService(e.target.value) }/>
                    <label htmlFor="ed_pass">Edit Password</label>
                    <input type="text" id="ed_pass" defaultValue={pass_detail.password} onChange={(e) => changePassword(e.target.value)} />
                    <button style={{
                        backgroundColor: 'teal',
                        width:"7.5rem"
                    }} onClick={()=> {
                        editValue(pass_detail, service, password);
                        showEdit(false);
                    }}>Confirm Edit</button>
                </div>
            </div>
            </> : <></>}
        </div>
        </>
    )
    }