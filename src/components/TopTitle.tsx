import {FaUser} from "react-icons/fa"

export function TopTitleBar <Q extends {text: string}> (props : Q ){
    let text : string = props.text

    return(
        <div className='grid dash_head'>
        <h2 style={{textTransform:"capitalize"}}>{text}</h2>
        <div className='user_icon'>
            <FaUser color="blue"/>
        </div>
        </div>
    )
}