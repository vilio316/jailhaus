import { useEffect, useState } from "react"
import { useAppSelector } from "../redux/hooks"
import { userID } from "../redux/idState"
import supaClient from "../supabase/supaconfig"
import { v4 as uuidv4 } from 'uuid'
import { SideNav } from "./SideNav"

// Image URL Template : https://rojcbfneomlgqhvbkpul.supabase.co/storage/v1/object/public/jailbucket/4c1825ca-68fb-427d-8d44-1c8568aa94fb/6056a6a2-e30f-4423-9b7b-42432231bbda
export default function FileRoute(){
let user_ID = useAppSelector(userID)
let [file_value, setFile] = useState<File[]>([])
let [received_file_value, receiveFile] = useState<any[]>([])

function uploadHandle(e : any)
{
    let files : FileList = e.target.files
    let eklekto : File[] = Array.from(files)
    return eklekto
}

async function optimus(e : any){
    setFile(uploadHandle(e))
    let file = file_value[0]
    console.log(file)

    const {data, error} = await supaClient.storage.from('jailbucket').upload(user_ID + '/' + uuidv4(), file)
    if(data){
        console.log(data)
        fetchFiles()
    }
    else{
        console.log(error) 
    }
}

async function fetchFiles() {
    const {data, error} = await supaClient.storage.from('jailbucket').list(user_ID + '/', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: "asc"}
    })
    if(data){
        let johann =  Array.from(data)
        receiveFile(johann)
    }
    else(
        console.log(error)
    )
} 

useEffect(()=> {
    fetchFiles();
}, [])

    return(
        <>
        <div className="body">
            <SideNav/>
            <div>
            <form>
                <label htmlFor="file_item">Upload an Image</label>
        <input type='file' id="file_item" onChange={(e)=> {
            optimus(e)
        }
            } accept="image/jpg, image/png, image/jpeg, image/jfif, .pdf, .docx"/>
        <button type='submit'>Upload</button>
            </form>
            <div style={{
                display: "grid", gridTemplateColumns:"auto auto auto", margin:"1rem 0"
            }}>
            {received_file_value.map((file) => (
                <div key={file.id}>
                <img 
                src={`https://rojcbfneomlgqhvbkpul.supabase.co/storage/v1/object/public/jailbucket/${user_ID}/${file.name}`} 
                alt={file.name}
                style={{
                    maxHeight:'10rem',                    
                    borderRadius:'1.5rem'
                }} />
                </div>
            )
        )
    }
        </div>
        </div>
        </div>
        </>
    )
}