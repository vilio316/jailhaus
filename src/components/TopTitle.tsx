import {FaUser} from "react-icons/fa"
import { signOut } from "../supabase/signUpIn"
import { useAppDispatch } from "../redux/hooks"
import { changePwds, setID } from "../redux/idState"
import { useNavigate } from "react-router-dom"

export function TopTitleBar<Q extends {text: string}>(props : Q ){
    let text : string = props.text
    let dispo = useAppDispatch();
    let drought = useNavigate();
    return(
        <div className='grid dash_head'>
        <h2 style={{textTransform:"capitalize"}}>{text}</h2>
        <div className='user_icon'>
            <FaUser color="blue" onClick={()=> {
                signOut(); 
                dispo(setID(''));
                dispo(changePwds([]));
                drought('/sign-up')}}/>
        </div>
        </div>
    )
}