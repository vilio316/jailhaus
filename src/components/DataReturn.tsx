import {  FaEye, FaEyeSlash, FaEdit, FaTrash } from 'react-icons/fa'
import { useState } from 'react'

export function PassDetails(props: any){
    let [showState, changeShow] = useState(false)
    let pass_detail = props.object
    return(
        <>
        <div>
            <p className= "pass_head">{pass_detail.service}</p>
            <input className="pass_string" 
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
            <button> <FaTrash fill='red'/></button>
            </div>
        </div>
        </>
    )
}