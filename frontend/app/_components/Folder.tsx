import Link from "next/link";

import EditFolderModal from "@/app/_components/Modals/EditFolder";
import DeleteFolder from "@/app/_components/Modals/DeleteFolder";


interface Props {
    folders: {
        id: number,
        name: String,
        folder_id: String
    }[]
}

export default function Folder({folders}: Props) {
    return (
        <ul className="folders flex flex-col justify-center align-middle">
            {
                folders.map(folder => (
                    <li key={folder.id} className="folders__item p-4 border-gray-300 shadow-md hover:shadow-lg cursor-pointer" >
                        <Link className="font-bold text-gray-800" href={`/folders/${folder.folder_id}`}>{folder.name}</Link>
                        <div className="actions flex float-right">
                            <EditFolderModal folder={folder} />
                            <DeleteFolder folder={folder} />
                        </div>
                    </li>
                ))
            }
            
        </ul>
    )
}