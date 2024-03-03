"use client";

import { ObjectType } from "@/_lib/types";
import { formIsValid, createObjectFromServerResponseData } from "@/_lib/funcitons";

import {FormEvent , useState } from "react";
import { FcEditImage } from "react-icons/fc";
import { redirectToPath } from "@/_lib/actions";

import { getUpdateDeleteFiles } from "@/app/_api/storage/route";


export default function Modal({folder, file}: {folder: ObjectType, file: ObjectType}) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(file.name);
    const [errors, setErrors] = useState<ObjectType>({});

    const handleSumbit = async (event: FormEvent<HTMLFormElement>) => {
        
        event.preventDefault();

        const {valid, errors} = formIsValid(event);
        setErrors(errors);

        if(valid) {
            const postData = {"name": name};

            const response = await getUpdateDeleteFiles(file.file_id, "PUT", postData);
            const statusOk = response.ok;
            const data = await response.json();

            if(statusOk) {
                setName(data.name);
                setOpen(false);
                redirectToPath(`/folders/${folder.folder_id}`, `/folders/${folder.folder_id}`, true);
            }
            else {
                const errors = createObjectFromServerResponseData(data);
                setErrors(errors);
            }

        }
    }

    return (
    <>
        <FcEditImage onClick={e => setOpen(!open)} className="me-4 inline cursor-pointer" />
        <div aria-hidden="true" className={`${!open ? 'hidden': ''} flex align-middle bg-[#00000070] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
        <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Edit {file.name}
                    </h3>
                    <button onClick={e => setOpen(!open)} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>
                <div className="p-4 md:p-5">
                    <form onSubmit={e => handleSumbit(e)} className="space-y-4" action="#">
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                            {errors.name ? <small className="block my-4 text-red-700 text-base" >{errors.name}</small>: ""}
                        </div>
                        <button type="submit" className="w-full text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary dark:focus:bg-primary">Update</button>
                    </form>
                </div>
            </div>
        </div>
        </div>
    </>
    )
}