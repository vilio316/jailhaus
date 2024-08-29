import { useEffect, useState } from "react"
import { useAppSelector } from "../redux/hooks"
import { userID } from "../redux/idState"
import supaClient from "../supabase/supaconfig"
import { SideNav } from "./SideNav"
import { TopTitleBar } from "./TopTitle"
import word_pic from '../assets/word_img.jfif'
import pdf_pic from '../assets/pdf_pic.jfif'


export default function FileRoute(){
let user_ID = useAppSelector(userID)
let [received_file_value, receiveFile] = useState<any[]>([])
let [received_docs_value, receiveDocs] = useState<any[]>([])
let [image_count, newImgLength] = useState(0)
let [docs_count, newDocsLength] = useState(0)
let [image_load_state, loadImages] = useState(false)

function uploadHandle(e : any)
{
    let files : FileList = e.target.files
    let eklekto : File[] = Array.from(files)
    return eklekto
}

async function optimus(e : any){
    let file = uploadHandle(e)[0]
    console.log(file)

    const {data, error} = await supaClient.storage.from('jailbucket').upload(user_ID + '/' + 'images' +'/' + file.name, file)
    if(data){
        console.log(data)
        loadImages(false);
        fetchFiles();
    }
    else{
        console.log(error) 
    }
}

async function optimus_document(e : any){
    let file = uploadHandle(e)[0]
    console.log(file)

    const {data, error} = await supaClient.storage.from('jailbucket').upload(user_ID + '/' + 'documents' +'/' + file.name , file)
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
        newImgLength(new_array.length)
        loadImages(true)
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
        newDocsLength(new_array.length)
        
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

            <h2>Your Images({image_count})</h2>
            <div id="image_cont" className="grid" style={{ margin:"1rem 0", gap:'0.5rem', alignItems:"center"
            }}>
            {image_load_state ? <>{received_file_value.map((file) => (
                <div key={file.id} className="grid" style={{
                    margin:"0.5rem 0", 
                    alignContent:"center"
                }}>
                <img 
                src={`https://rojcbfneomlgqhvbkpul.supabase.co/storage/v1/object/public/jailbucket/${user_ID}/images/${file.name}`} 
                
                alt={file.name}
                style={{
                    maxHeight:'12.5rem',     maxWidth:"80%"               
                }} /> 
                <figcaption>{file.name}</figcaption>
                </div>
            )
        )}</> : <>
            <p>Loading...</p>
        </>
    }
        </div>
        </div>
        <h2><u>Your Documents({docs_count})</u></h2>
        <div className="grid file_container">
    {received_docs_value.map((doc) =>(
        <>
         <div  className="file_card" key={doc.id} style={{
            padding: '0.5rem 0', display:"grid",
         }}>
            <div className="grid" style={{
                alignContent:"center"
            }}>
                <img src={ doc.metadata.mimetype == 'application/pdf' ? pdf_pic : word_pic } style={{
                    borderRadius:"1rem",
                    opacity: 0.5
                }} className="file_image"/> 
                </div>
                <div>
             <a className="file_link" target="_blank" download href={`https://rojcbfneomlgqhvbkpul.supabase.co/storage/v1/object/public/jailbucket/${user_ID}/documents/${doc.name}`}>
            {doc.name}
        </a>
        <p>{Number(Number(doc.metadata.size) / 1048576).toFixed(2)} MB</p>
        </div>
        </div>
        </>
    ) )}
    </div>
        </div>
        </>
    )
}

