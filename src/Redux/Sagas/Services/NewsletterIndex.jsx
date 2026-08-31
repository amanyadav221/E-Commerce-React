import api from "../../../Utils/ApiInstance";
import adminAPI from "../../../Utils/AdminAPI";

export async function createNewsletterIndex(collection, payload) {
    try {
        let res = await api.post(collection, payload);
        return res.data;
    } catch (error) {
        console.log("createNewsletter error:", error);
    }
}

export async function getAllNewsletterIndex(collection) {
    try {
        let res = await adminAPI.get(collection);
        return res.data;
    } catch (error) {
        console.log("getAllNewsletter error:", error);
        return [];
    }
}

export async function createContactUsIndex(collection, payload) {
    try {
        let res = await api.post(collection, payload);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function updateNewsletterIndex(collection, payload) {
    try {
        let res = await adminAPI.patch(`${collection}/${payload}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteNewsletterIndex(collection, payload) {
    try {
        let res = await adminAPI.delete(`${collection}/${payload}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getAllContactUsIndex(collection) {
    try {
        let res = await adminAPI.get(collection);
        return res.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function updateContactUsIndex(collection, payload) {
    try {
        let res = await adminAPI.patch(`${collection}/${payload}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteContactUsIndex(collection, payload) {
    try {
        let res = await adminAPI.delete(`${collection}/${payload}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}