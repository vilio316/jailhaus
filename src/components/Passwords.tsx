import { FaAward } from "react-icons/fa6";
import { SideNav } from "./SideNav";
import { TopTitleBar } from "./TopTitle";
import { useEffect, useState } from "react";
import supaClient from "../supabase/supaconfig";
import { changePwds, userID, userPwds, userSeeds, setSeedValues} from "../redux/idState";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Seeds from "./SeedPhrases";

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
        let value : any[]= [...user_passes[0], passObject]
        if(service.length > 0 && password.length > 0){
        let {data, error} = await supaClient.from('data_bank').update({
            id: user_value,
            passwords: value, 
        }).eq('id', user_value)
        console.log(data, error)
    }
    }

    async function postSeedPhrase<T extends string>(service: T, phrase: T ){
        let seedObject = {
            service: service,
            phrase: phrase,
        }
        let holder_array : any[] = [...user_seed_values[0], seedObject]
        if(service.length > 0 && phrase.length > 0){
        let {data, error} = await supaClient.from('data_bank').update({
            seed_phrases: holder_array
        }).eq('id', user_value)
        console.group(data, error)
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
        <TopTitleBar text={'Passwords'} />
        <div className="body grid">
        <SideNav/>
        <div className="details">
            <h3>Details for Your Passwords</h3>
        {modal_state ? <>
            <div className="modal_wrapper grid">
                <div className="grid">
                    <p>Add New: </p>
                    <button onClick={()=> toSeed(true)}>Password</button> 
                    <button onClick={()=> toSeed(false)}>Seed Phrase</button>
                    <span onClick={()=> setModal(false)}>x</span>
                    {pass ? <div>
                    <label htmlFor='services'>Service</label>
                    <input type="text" id="services" required maxLength={50} onChange={(e)=> setVal(e.target.value)}/>
                    <label htmlFor='password'>Password</label>
                    <input type="password" id="password" required maxLength={50} onChange={(e)=> setPass(e.target.value)}/>
                    <button onClick={()=> {house(value, password)}}>Add Password</button>
                </div> : 
                
                <div>
                    <p>Seed Phrase</p>
                    <label htmlFor="seed_service">Service / Wallet</label>
                    <input type="text" name="Seed Service" id="seed_service" onChange={(e) => changeSeedService(e.target.value)}/>

                    <label htmlFor="seed_value">Seed Phrase</label>
                    <textarea onChange={(e)=> {setSeed(e.target.value); console.log(seed)}} id='seed_value' placeholder="Seed Phrase" cols={25} rows={13} maxLength={250} />

                    <button onClick={()=> postSeedPhrase(seed_service, seed)}>Upload Seed Phrase</button>
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
                    className="grid"
                    style={{gridTemplateColumns:"auto auto auto auto"}}>
                    {item.map((pass_detail : PwdDetail) => (
                        <div key={item.indexOf(pass_detail)}>
                            <p>{pass_detail.service}</p>
                            <p>{pass_detail.password}</p>
                        </div>
                    ))}
                    </div>
                    </div>
                    )
                    
                )}
            </div>
            <Seeds array={user_seed_values}/>
            <button className="plus_button" onClick={()=> setModal(!modal_state)}>
            <FaAward/>
            </button>
            <button onClick={()=> console.log(user_passes)}>Check State</button>
        </div>
        </div>
        </>
    )
}