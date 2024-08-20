import { useEffect, useState } from "react"
import { useAppSelector } from "../redux/hooks"
import { userID } from "../redux/idState"
import supaClient from "../supabase/supaconfig"
import { v4 as uuidv4 } from 'uuid'
import { SideNav } from "./SideNav"
import { TopTitleBar } from "./TopTitle"

// Image URL Template : https://rojcbfneomlgqhvbkpul.supabase.co/storage/v1/object/public/jailbucket/4c1825ca-68fb-427d-8d44-1c8568aa94fb/6056a6a2-e30f-4423-9b7b-42432231bbda
export default function FileRoute(){
let user_ID = useAppSelector(userID)
let [received_file_value, receiveFile] = useState<any[]>([])
let [received_docs_value, receiveDocs] = useState<any[]>([])

function uploadHandle(e : any)
{
    let files : FileList = e.target.files
    let eklekto : File[] = Array.from(files)
    return eklekto
}

async function optimus(e : any){async function fetchFiles() {
    const {data, error} = await supaClient.storage.from('jailbucket').list(user_ID + '/', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: "asc"}
    })
    if(data){
        let johann =  Array.from(data)
        let new_array = johann.filter((file) => file.name !== '.emptyFolderPlaceholder')
        receiveFile(new_array)
        
    }
    else(
        console.log(error)
    )
} 
    let file = uploadHandle(e)[0]
    console.log(file)

    const {data, error} = await supaClient.storage.from('jailbucket').upload(user_ID + '/' + 'documents' +'/' + uuidv4(), file)
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
        let new_array = johann.filter((file) => file.name !== '.emptyFolderPlaceholder')
        receiveFile(new_array)
        
    }
    else(
        console.log(error)
    )
} 
async function fetchDocuments() {
    const {data, error} = await supaClient.storage.from('jailbucket').list(user_ID + '/' +"documents" + "/", {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: "asc"}
    })
    if(data){
        let johann =  Array.from(data)
        let new_array = johann.filter((file) => file.name !== '.emptyFolderPlaceholder')
        receiveDocs(new_array)
        
    }
    else(
        console.log(error)
    )
} 


useEffect(()=> {
    fetchFiles();
    fetchDocuments();
}, [])

    return(
        <>
        <TopTitleBar text="Secure Files"/>
        <div className="body">
            <SideNav/>
            <div>
            <form>
                <label htmlFor="file_item">Upload an Image</label>
        <input type='file' id="image_files" onChange={(e)=> {
            optimus(e)
        }
            } accept="image/jpg, image/png, image/jpeg, image/jfif"/>
        <input type='file' accept=".docx, .pdf" onChange={(e)=> {
            optimus(e)
        }}/>
        <button type='submit'>Upload Image</button>
            </form>
            <p>Your Images</p>
            <div style={{
                display: "grid", gridTemplateColumns:"auto auto auto auto", margin:"1rem 0", gap:'0.5rem '
            }}>
            {received_file_value.map((file) => (
                <div key={file.id} className="grid" style={{
                    justifyContent:"center"
                }}>
                <img 
                src={`https://rojcbfneomlgqhvbkpul.supabase.co/storage/v1/object/public/jailbucket/${user_ID}/${file.name}`} 
                alt={file.name}
                style={{
                    maxWidth:'10rem',                    
                    borderRadius:'1.5rem'
                }} /> 
</div>
            )
        )
    }
    <p>Your Documents</p>
    {received_docs_value.map((doc) =>(
        <a download href={`https://rojcbfneomlgqhvbkpul.supabase.co/storage/v1/object/public/jailbucket/${user_ID}/documents/${doc.name}`}>
            {doc.name}
        </a>
    ) )}
        </div>
        </div>
        </div>
        </>
    )
}