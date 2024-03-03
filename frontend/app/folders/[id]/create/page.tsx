"use client";

import {FormEvent, useState, useEffect} from "react";
import {getUpdateDeleteFolders, createFiles} from "@/app/_api/storage/route";

import { ObjectType } from "@/_lib/types";
import {redirectToPath} from "@/_lib/actions";
import { 
    slugify,
    createObjectFromServerResponseData,
    formIsValid
 } from "@/_lib/funcitons";

import Heading from "@/app/_components/Heading";
import Breadcumb from "@/app/_components/Breadcrumb";
import Loading from "@/app/loading";

function CreateFile({params}: {params: {id: String}}) {

    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<ObjectType>({});
    
    const [name, setName] = useState("");
    const [file, setFile] = useState("");
    const [filekey, setFilekey] = useState(Math.random().toString(36));

    const[folder, setFolder] = useState({id: "", folder_id: "", files: []});

    const handleFile = (event: any) => {
        const fileAttached = event.target.files;
        if(fileAttached) {
            setFile(event.target.files[0]);
        };
    };


    useEffect( () => {

        setLoading(true);

        try{
            getUpdateDeleteFolders(`${params.id}`, "GET").then(response => {return response.json()}).then(data => {setFolder(data); setLoading(false)});
        }
        catch(error) {
            alert(`${error}`);
        }

    }, []);


    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        
        const formData = new FormData(event.currentTarget);
        formData.append("folder", `${parseInt(folder.id)}`);
        
        const {valid, errors} = formIsValid(event) 
        setErrors(errors);
        
        if(valid) {

            setSubmitting(true);

            const response = await createFiles(formData);
            const statusOk = response.ok;
            const data = await response.json();
            
            if(statusOk) {
                setName("");
                setFile("");
                setFilekey(Math.random().toString(36));
                setSubmitting(false);
                redirectToPath(`/folders/${params.id}/create`, `/folders/${params.id}`, false);
                setSubmitting(false);
            }
            else {
                let errors = createObjectFromServerResponseData(data);
                console.log(errors);
                setErrors(errors);
                setSubmitting(false);
            }
        }
    }
    
    return (
        loading
        ? 
        <Loading />
        :
        <div className="content">
            <Breadcumb items={
                    [
                        {title: "Home", link: "/", active: false},
                        {title: `Create File`, link: "#", active: false}
                    ]
                } />
            <Heading title="Create File" />
            <form className="form-nxt" onSubmit={onSubmit} encType="multipart/form-data">
                <label className="block mb-2" htmlFor="name">File Name*</label>
                <input className="block form-nxt__input mb-6" name="name" value={name} onChange={e => setName(e.target.value)} type="text" placeholder="File name"/>
                {errors.name ? <small className="block my-4 text-red-700 text-base" >{errors.name}</small>: ""}
                <label className="block mb-2" htmlFor="file">File*</label>
                <input className="block form-nxt__file mb-6" name="file" onChange={e => handleFile(e)} type="file"/>
                {errors.file ? <small className="block my-4 text-red-700 text-base" >{errors.file}</small>: ""}
                <button className="btn btn-primary" >{submitting? "Creating": "Create"}</button>
            </form>
        </div>
    )
}

export default CreateFile;