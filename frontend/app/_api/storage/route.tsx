import { 
    listCreateFolders,
    retrieveUpdateDestroyFolders,
    listCreateFiles,
    retrieveUpdateDestroyFiles
 } from "@/_lib/endpoints";

interface FolderModel {
    name: String,
};

interface FileModel {
    name: String,
    file: File,
    folder: String,

};

export const getFolders = async () => {
    const response = await fetch(listCreateFolders, {
        cache: "no-store"
    });
    if(!response.ok) {
        throw new Error("Error fetching the data");
    }
    return response.json();
}

export const createFolders = async (data: FolderModel) => {
    try {
        const response = await fetch(listCreateFolders, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        return response;
    }
    catch(error) {
        throw new Error("Error creating the folder");
    }
}


export const getUpdateDeleteFolders = async (folderId: String, method: String, data={}) => {
    let response: any = {};

    switch(method) {
        case "GET":
            response = await fetch(retrieveUpdateDestroyFolders + `${folderId}/`, {
                cache: "no-cache" 
            });
            
            break;
        
            case "PUT":
            response = await fetch(retrieveUpdateDestroyFolders + `${folderId}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            break;

        case "DELETE":
            response = await fetch(retrieveUpdateDestroyFolders + `${folderId}/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
    }

    return response;
}


export const createFiles = async (data: FormData) => {
    try {
        const response = await fetch(listCreateFiles, {
            method: "POST",
            body: data
        });
        return response;
    }
    catch(error) {
        throw new Error("Error while creating file");
    }
};

export const getUpdateDeleteFiles = async (fileId: String, method: String, data={}) => {
    let response: any = {};

    switch(method) {
        case "GET":
            response = await fetch(retrieveUpdateDestroyFiles + `${fileId}/`, {
                cache: "no-cache" 
            });

            break;

        case "PUT":
            response = await fetch(retrieveUpdateDestroyFiles + `${fileId}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            break;

        case "DELETE":
            response = await fetch(retrieveUpdateDestroyFiles + `${fileId}/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            break;
    }

    return response;
}
