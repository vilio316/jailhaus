import { useState } from "react"
import { FaEye, FaEyeSlash, FaEdit, FaTrash } from "react-icons/fa"
import { PwdDetail
 } from "./Passwords";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { changePwds, userPwds, userID } from "../redux/idState";
import supaClient from "../supabase/supaconfig";

export function PassDetails(props: any){
    let user_passes = useAppSelector(userPwds)
    let user_id_val = useAppSelector(userID)
    let sendOff = useAppDispatch()
    async function deleteValue(passwordObject : PwdDetail){
        let store_value : PwdDetail[]= user_passes[0];
        let pass_str = passwordObject.password
        let empty = []
        let updated_store_value = store_value.filter((member) => member.password !== pass_str)
        empty.push(updated_store_value)
        sendOff(changePwds(empty))
        let {data, error} = await supaClient.from("data_bank").update({
            passwords: updated_store_value

        }).eq('id', user_id_val)
        console.log(data, error)
    }
   
    let [showState, changeShow] = useState(false)
    let pass_detail = props.object
    return(
        <>
        <div>
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

            <div className='grid' style={{gridTemplateColumns:"auto auto", gap:"0"}}>
            <button>
            <FaEdit/>
            </button>
            <button onClick={()=> deleteValue(pass_detail)}> <FaTrash fill='red'/></button>
            </div>
        </div>
        </>
    )
    }