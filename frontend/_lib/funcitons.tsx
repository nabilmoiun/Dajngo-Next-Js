import { FormEvent } from "react";
import { ObjectType } from "./types"


export const slugify = (value: String) => {
    return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

};


export const formIsValid = (event: FormEvent<HTMLFormElement>) => {
    let errors : ObjectType = {};
    const formData = new FormData(event.currentTarget);
    formData.forEach((value, key) => {
        // const type = value.type;
        console.log(key, value);
        if(!value) {
            errors[key] = "The field can't be blank";
        };
    });
    return { valid: Object.keys(errors).length === 0, errors: errors}
};


export const createObjectFromServerResponseData = (response: ObjectType) => {
    let data:ObjectType = {};
    Object.keys(response).forEach(key => {
        data[key] = response[key].join('');
    });
    return data;
};

