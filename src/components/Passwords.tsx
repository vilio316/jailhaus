import { SideNav } from "./SideNav";
import { TopTitleBar } from "./TopTitle";
import { useEffect, useState } from "react";
import supaClient from "../supabase/supaconfig";
import { changePwds, userID, userPwds, userSeeds, setSeedValues} from "../redux/idState";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Seeds from "./SeedPhrases";
import { FaPlusCircle } from "react-icons/fa";

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
    const user_seed_values = useAppSelector(userSeeds)
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

        async function loadSeeds(){
            if(user_value.length > 0){
            const {data} = await supaClient.from('data_bank').select("seed_phrases").eq('id', user_value);
            console.log(data)
            let array = []
            if(data){
            for(let i = 0; i < data?.length ;i++){
                array.push(data[i].seed_phrases)
                sendOff(setSeedValues(array))
            }
            }
        }
        else{
            console.log("Not ready yet!")
        }
    }
        loadVal();
        loadSeeds();

    }, [user_value])

    async function house(service: string, password: string){
        let passObject = {
            service: service, 
            password: password,
        }
        let array_of_array: any[] = [];
        let value : any[]= [...user_passes[0], passObject]
        array_of_array.push(value)
        console.log(array_of_array)
        if(service.length > 0 && password.length > 0){
        let {data, error} = await supaClient.from('data_bank').update({
            id: user_value,
            passwords: value, 
        }).eq('id', user_value)
        console.log(data, error)
        sendOff(changePwds(array_of_array))
        setModal(false)
    }
    }

    async function postSeedPhrase<T extends string>(service: T, phrase: T ){
        let seedObject = {
            service: service,
            phrase: phrase,
        }
        let holder_array : any[] = [...user_seed_values[0], seedObject]
        let aoa : any[] = []
        aoa.push(holder_array)
        if(service.length > 0 && phrase.length > 0){
        let {data, error} = await supaClient.from('data_bank').update({
            seed_phrases: holder_array
        }).eq('id', user_value)
        console.group(data, error)
        sendOff(setSeedValues(aoa))
        setModal(false)
    }
    }

    let [modal_state, setModal] = useState(false)
    let [pass, toSeed] = useState(true)
    let [value, setVal]= useState('')
    let [password, setPass]= useState('')
    let [seed, setSeed] = useState('')
    let [seed_service, changeSeedService] = useState('')


    return(
        <>
        <div>
        <TopTitleBar text={'Passwords'} />
        </div>
        <div className="body grid">
        <SideNav/>
        <div className="details">
            <h3>Details for Your Passwords</h3>
        {modal_state ? <>
            <div className="modal_wrapper grid">
                <div className="grid" style={{
                    position: "relative",
                    borderRadius: "1.25rem",
                    backgroundColor: "beige",
                    padding: "1rem",
                }}>
                    <span style={{
                        fontWeight: 'bold',
                        fontSize: "2rem",
                        margin: "0.5rem 0",
                        padding: "0.5rem",
                    }}>Add New: </span>
                    <div className="grid button_hold" style={{gridTemplateColumns:" auto auto"}}>
                    <button onClick={()=> toSeed(true)}>Password</button> 
                    <button onClick={()=> toSeed(false)}>Seed Phrase</button>
                    </div>
                    <span onClick={()=> setModal(false)} className="close_button">x</span>
                    {pass ? <div>
                    <label htmlFor='services'>Service</label>
                    <input type="text" id="services" required maxLength={50} onChange={(e)=> setVal(e.target.value)}/>
                    <label htmlFor='password'>Password</label>
                    <input type="password" id="password" required maxLength={50} onChange={(e)=> setPass(e.target.value)}/>
                    <button onClick={()=> {house(value, password)}} className="add_button">Add Password</button>
                </div> : 
                
                <div>
                    <label htmlFor="seed_service">Service / Wallet</label>
                    <input type="text" name="Seed Service" id="seed_service" onChange={(e) => changeSeedService(e.target.value)}/>

                    <label htmlFor="seed_value">Seed Phrase</label>
                    <textarea onChange={(e)=> {setSeed(e.target.value); console.log(seed)}} id='seed_value' placeholder="Seed Phrase" cols={25} rows={13} maxLength={250} />

                    <button onClick={()=> {postSeedPhrase(seed_service, seed) }} className="add_button">Upload Seed Phrase</button>
                    </div>
                    }
                </div>
            </div>
        </>: <div>
            </div>}

            <div>
                {user_passes.map((item : any[] ) => (
                    <div key={234}>
                    <h2>{item.length} Passwords Haus-ed</h2>
                    <div  
                    className="grid pass_container">
                    {item.map((pass_detail : PwdDetail) => (
                        <div key={item.indexOf(pass_detail)} className="pass_data">
                            <p className= "pass_head">{pass_detail.service}</p>
                            <p className ="pass_string">{pass_detail.password}</p>
                        </div>
                    ))}
                    </div>
                    </div>
                    )
                    
                )}
            </div>
            <Seeds array={user_seed_values}/>
            <button className="plus_button" onClick={()=> setModal(!modal_state)}>
                <span>
            <FaPlusCircle/>
                </span>
            <span>Add New Item</span>
            </button>
        </div>
        </div>
        </>
    )
}