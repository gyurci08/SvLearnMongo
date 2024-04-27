import {documents} from "$db/documents";
import type {PageServerLoad} from "./$types";

export const load: PageServerLoad = async function() {
    const data = await documents.find({}, {limit: 50, projection: {'_id': 0,'name': 1}}).toArray();
    console.log("Data: ", data);
    return { documents: data }
}