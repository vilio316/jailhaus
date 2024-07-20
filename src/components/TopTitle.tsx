import {FaUser} from "react-icons/fa"
import { signOut } from "../supabase/signUpIn"
import { useDispatch } from "react-redux"
import { setID } from "../redux/idState"

export function TopTitleBar <Q extends {text: string}> (props : Q ){
    let text : string = props.text
    let dispo = useDispatch()
    return(
        <div className='grid dash_head'>
        <h2 style={{textTransform:"capitalize"}}>{text}</h2>
        <div className='user_icon'>
            <FaUser color="blue" onClick={()=> {signOut(); dispo(setID(''))}}/>
        </div>
        </div>
    )
}