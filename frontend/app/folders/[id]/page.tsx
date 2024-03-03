import Link from "next/link";
import {Suspense} from "react";

import { getUpdateDeleteFolders } from "@/app/_api/storage/route";

import Loading from "@/app/loading";

import Heading from "@/app/_components/Heading";
import Breadcumb from "@/app/_components/Breadcrumb";
import EditFile from "@/app/_components/Modals/EditFile";
import DeleteFile from "@/app/_components/Modals/DeleteFile";


export default async function File({params}: {params: {id: String}}) {

    const host = process.env.NEXT_PUBLIC_HOST;

    interface FileModel {
        id: number,
        name: String,
        slug: String,
        file: String,
        created_at: String,
        updated_at: String
    }
    
    const response = await getUpdateDeleteFolders(params.id, "GET");
    const folder = await response.json();

    return (
        <>
            <div className="content">
                <Breadcumb items={
                    [
                        {title: "Home", link: "/", active: false},
                        {title: `${folder.name}`, link: "#", active: false}
                    ]
                } />
                <div className="content__top flex flex-row justify-between">
                    <Heading title="My Files" />
                    <Link className="btn btn-primary mt-4 mb-8" href={`/folders/${folder.folder_id}/create`} >Create new file</Link>
                </div>
                <table className="table" >
                    <thead className="thead" >
                        <tr className="" >
                            <th>Filename</th>
                            <th>File</th>
                            <th>Created On</th>
                            <th>Updated On</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                        <tbody className="tbody" >
                        <Suspense fallback={<Loading />} >
                            {
                                folder.files.map((file: FileModel) => (
                                    <tr key={file.id} className="tbody" >
                                        <td>{file.name}</td>
                                        <td>
                                        <a target="_blank" href={`${host}${file.file}`}>
                                            View File
                                        </a>
                                        </td>
                                        <td>{`${new Date(file.created_at.toString()).toDateString()}, ${new Date(file.created_at.toString()).toLocaleTimeString()}`}</td>
                                        <td>{`${new Date(file.updated_at.toString()).toDateString()}, ${new Date(file.updated_at.toString()).toLocaleTimeString()}`}</td>
                                        <td className="" >
                                            <EditFile folder={folder} file={file} />
                                            <DeleteFile folder={folder} file={file} />
                                        </td>
                                    </tr>
                                ))
                            }
                        </Suspense>
                        </tbody>
                </table>
            </div>
        </>
        
    )
}
