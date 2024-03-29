import {Note} from '../Types.ts'
import axios from "axios";
import {GETUSERDATA_ENDPOINT, USERNOTES_ENDPOINT} from "../../Endpoints.ts";
import Cookies from "js-cookie";

/**
 *  @return {Promise<Note[]>}
 * @description Makes an api call that will fetch the user's notes using the jwt token
 */
export default async function fetchNotes():Promise<Note[]> {
    try{
        const token = Cookies.get('token')
        if(!token) throw new Error('No token found')

        const {data:userData} = await axios.post(GETUSERDATA_ENDPOINT , {
            access_token: token
        } , {headers:{
                Authorization: `Bearer ${token}`
            }})

        if(!userData._id)
        throw new Error('No valid user found')

        const { data } = await axios.get(`${USERNOTES_ENDPOINT}/${userData._id}`, { headers: { Authorization: `Bearer ${token}` } });

        return data
    }catch(e){
        console.log(e)
        return []
    }
}