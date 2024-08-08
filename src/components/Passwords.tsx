import { FaAward } from "react-icons/fa6";
import { SideNav } from "./SideNav";
import { TopTitleBar } from "./TopTitle";
import { useEffect, useState } from "react";
import supaClient from "../supabase/supaconfig";
import { changePwds, userID, userPwds } from "../redux/idState";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

type PwdDetail = {
    service: string,
    password: string,
}

/*type Insert ={
    passwords?: Json| null
  }[] | any[]
*/

export default function Passwords(){
    const user_value = useAppSelector(userID)
    const user_passes = useAppSelector(userPwds)
    const sendOff = useAppDispatch()

    useEffect(()=> {
        async function loadVal(){
            if(user_value.length > 0){
            const {data} = await supaClient.from('data_bank').select("passwords").eq('id', user_value);
            let array = []
            if(data){
            for(let i = 0; i < data?.length ;i++){
                array.push(data[i].passwords)
                sendOff(changePwds(array))
            }
            }
        }
        else{
            console.log("Not Yet")
        }
    }
        loadVal()
    }, [user_value])

    async function house(service: string, password: string){
        let passObject = {
            service: service, 
            password: password,
        }
        let value : any[]= user_passes[0]
        value.push(passObject)
        let {data, error} = await supaClient.from('data_bank').update({
            id: user_value,
            passwords: value, 
        }).eq('id', user_value)
        console.log(data, error)
    }


    let [modal_state, setModal] = useState(false)
    let [pass, toSeed] = useState(true)
    let [value, setVal]= useState('')
    let [password, setPass]= useState('')

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
                    <input type="text" id="password" maxLength={50} onChange={(e)=> setPass(e.target.value)}/>
                    <button>Add Password</button>
                </div> : <div>
                    <p>Seed Phrase</p>
                    <textarea placeholder="Seed Phrase" cols={25} rows={13}>
                    </textarea>
                    </div>}
                </div>
            </div>
        </>: <div>
            <p>Housing for twits!</p>
            </div>}

            <div>
            {user_passes.map((item : any[]) => (
                item.map((pass_detail : PwdDetail) => (
                    <div key={item.indexOf(pass_detail)}>
                        <p>{pass_detail.service}</p>
                        <p>{pass_detail.password}</p>
                    </div>
                ))
            ))}
            </div>

            <button className="plus_button" onClick={()=> setModal(!modal_state)}>
            <FaAward/>
            </button>
            <button onClick={()=> house(value, password )}>
                Check!
            </button>
            <button onClick={()=> console.log(user_passes)}>Check State</button>
        </div>
        </div>
        </>
    )
}