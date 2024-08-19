import { useState } from "react"
import { useAppSelector } from "../redux/hooks"
import { userID } from "../redux/idState"
import supaClient from "../supabase/supaconfig"
import { v4 as uuidv4 } from 'uuid'


export default function FileRoute(){
let user_ID = useAppSelector(userID)
let [file_value, setFile] = useState<File[]>([])

function uploadHandle(e : any)
{
    let files : FileList = e.target.files
    let eklekto : File[] = Array.from(files)
    return eklekto
}

async function optimus(e : any){
    setFile(uploadHandle(e))
    let file = uploadHandle(e)[0]
    console.log(file)

    const {data, error} = await supaClient.storage.from('jailbucket').upload(user_ID + '/' + uuidv4(), file)
    if(data){
        console.log(data)
    }
    else{
        console.log(error) 
    }
}
    return(
        <>
        <div>
            <form>
                <label htmlFor="file_item">Upload A File</label>
        <input type='file' id="file_item" onChange={(e)=> {
            optimus(e)
        }
            }/>
            {file_value.map((file) => (
                <p key={file.lastModified}>{file.name}</p>
            ))}
        <button type='submit'>UPLOAD FILE</button>
            </form>
        </div>
        </>
    )
}