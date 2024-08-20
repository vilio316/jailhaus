import { useEffect, useState } from "react"
import { useAppSelector } from "../redux/hooks"
import { userID } from "../redux/idState"
import supaClient from "../supabase/supaconfig"
import { v4 as uuidv4 } from 'uuid'
import { SideNav } from "./SideNav"
import { TopTitleBar } from "./TopTitle"
import { FaCopy } from "react-icons/fa"

/*function DocCard(props: any){
    let user_ID = useAppSelector(userID)
    let file_obj = props.doc
    console.log(file_obj.metadata.mimetype)
    let [typeState, setTypeState] = useState(false)
    if(file_obj.metadata.mimetype == 'application/pdf'){
        setTypeState(true)
    }

    return(
        <>
       
        </>
    )
}*/

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

async function optimus(e : any){
    let file = uploadHandle(e)[0]
    console.log(file)

    const {data, error} = await supaClient.storage.from('jailbucket').upload(user_ID + '/' + 'images' +'/' + uuidv4(), file)
    if(data){
        console.log(data)
        fetchFiles()
    }
    else{
        console.log(error) 
    }
}

async function optimus_document(e : any){
    let file = uploadHandle(e)[0]
    console.log(file)

    const {data, error} = await supaClient.storage.from('jailbucket').upload(user_ID + '/' + 'documents' +'/' + uuidv4(), file)
    if(data){
        fetchDocuments()
    }
    else{
        console.log(error) 
    }
}

async function fetchFiles() {
    const {data, error} = await supaClient.storage.from('jailbucket').list(user_ID + '/' +'images' + '/', {
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


        <label>Upload Document</label>
        <input type='file' accept=".docx, .pdf" onChange={(e)=> {
            optimus_document(e)
        }}/>
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
                src={`https://rojcbfneomlgqhvbkpul.supabase.co/storage/v1/object/public/jailbucket/${user_ID}/images/${file.name}`} 
                alt={file.name}
                style={{
                    maxWidth:'10rem',                    
                    borderRadius:'1.5rem'
                }} /> 
</div>
            )
        )
    }
        </div>
        </div>
        <p>Your Documents</p>
        <div className="grid" style={{
            gridTemplateColumns:"auto auto auto"
        }}>
    {received_docs_value.map((doc) =>(
        <>
         <div key={doc.id}>
            <div>
                <FaCopy fill='red'/>
                <p>{doc.metadata.mimetype}</p>
            </div>
             <a target="_blank" download href={`https://rojcbfneomlgqhvbkpul.supabase.co/storage/v1/object/public/jailbucket/${user_ID}/documents/${doc.name}`}>
            {doc.name}
        </a>
        <p>{Number(Number(doc.metadata.size) / 1048576).toFixed(2)} MB</p>
        
        </div>
        </>
    ) )}
    </div>
        </div>
        </>
    )
}

