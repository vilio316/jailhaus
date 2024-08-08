import { FaAward } from "react-icons/fa6";
import { SideNav } from "./SideNav";
import { TopTitleBar } from "./TopTitle";
import { useEffect, useState } from "react";
import supaClient from "../supabase/supaconfig";
import { userID } from "../redux/idState";
import { useAppSelector } from "../redux/hooks";

/*type PwdDetail = {
    service: string,
    password: string,
}*/

/*type Insert ={
    passwords?: Json| null
  }[] | any[]
*/

export default function Passwords(){
    const user_value = useAppSelector(userID)
    console.log(user_value)

    useEffect(()=> {
        async function loadVal(){
            const {data} = await supaClient.from('data_bank').select("passwords").eq('id', user_value);
            console.log(data)
        };
        loadVal()
    }, [])
    async function house(){
        let {data, error} = await supaClient.from('data_bank').update({
            id: user_value,
            passwords: [{
                service: "Google",
                password: 'SegregatedWerey69'
            },
            {
                service: 'Apple',
                password: 'Efd2225/'
            }, 
            {
                service: 'MiCare',
                password: 'Escudero55'
            }, 
        ]
        }).eq('id', user_value)
        console.log(data, error)
    }


    let [modal_state, setModal] = useState(false)
    let [pass, toSeed] = useState(true)
    let [value, setVal]= useState('')

    return(
        <>
        <TopTitleBar text={'Passwords'} />
        <div className="body grid">
        <SideNav/>
        <div className="details">
            <h3>Details for Your Passwords</h3>
            <div className="password">
                <div className="password">
                    <h4>Service</h4>
                    <p className='passText'>........</p>
                </div>
            </div>
        {modal_state ? <>
            <div className="modal_wrapper grid">
                <div className="grid">
                    <p>Add New: </p>
                    <button onClick={()=> toSeed(true)}>Password</button> 
                    <button onClick={()=> toSeed(false)}>Seed Phrase</button>
                    <span onClick={()=> setModal(false)}>x</span>
                    {pass ? <div>
                    <label htmlFor='Service'>Service</label>
                    <input type="text" id="services" maxLength={50} onChange={(e)=> setVal(e.target.value)}/>
                    <label htmlFor='password'>Password</label>
                    <input type="text" id="password" maxLength={50}/>
                   
                </div> : <div>
                    <p>Seed Phrase</p>
                    <textarea placeholder="Seed Phrase" cols={25} rows={13}>
                    </textarea>
                    </div>}
                    <button >Push Val!</button>
                </div>
            </div>
        </>: <div>
            <p>Housing for twits!</p>
            </div>}
            <p>{JSON.stringify(value)}</p>
            <button className="plus_button" onClick={()=> setModal(!modal_state)}>
            <FaAward/>
            </button>
            <button onClick={()=> house()}>
                Check!
            </button>
        </div>
        </div>
        <div>
                <p>And now, the end is near.</p>
        </div>
        </>
    )
}