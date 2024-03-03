"use client";

import {FormEvent, useState} from "react";
import {createFolders} from "@/app/_api/storage/route";

import { ObjectType } from "@/_lib/types";
import {
    slugify,
    createObjectFromServerResponseData,
    formIsValid
} from "@/_lib/funcitons";

import Heading from "@/app/_components/Heading";
import Breadcumb from "@/app/_components/Breadcrumb";
import {redirectToPath} from '@/_lib/actions';


function CreateFolder() {
    const [submitting, setSubmitting] = useState(false);
    const [name, setName] = useState("");
    const [errors, setErrors] = useState<ObjectType>({});

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const postData = {name: name};

        const {valid, errors} = formIsValid(event);
        setErrors(errors);

        if(valid) {

            setSubmitting(true);
            let errors: ObjectType = {};

            const response = await createFolders(postData);
            const statusOk = response.ok;
            const data = await response.json();
            
            if(statusOk) {
                redirectToPath("/folders/create", "/", false);
                setName("");
                setSubmitting(false);
            }
            else {
                errors = createObjectFromServerResponseData(data);
                setErrors(errors);
            }
        }

        
    }
    
    return (
        <div className="content">
            <Breadcumb items={
                    [
                        {title: "Home", link: "/", active: false},
                        {title: `Create Folder`, link: "#", active: false}
                    ]
                } />
            <Heading title="Create Folder" />
            <form className="form-nxt" onSubmit={onSubmit} action="">
                <label className="block mb-2" htmlFor="name">Name*</label>
                <input className="block form-nxt__input mb-6" value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Folder name"/>
                {errors.name ? <small className="block my-4 text-red-700 text-base" >{errors.name}</small>: ""}
                <button className="btn btn-primary my-4" >Create</button>
            </form>
        </div>
    )
}

export default CreateFolder;