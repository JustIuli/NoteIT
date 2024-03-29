import {User} from '../Types.ts'
import axios from "axios";
import {GETUSERDATA_ENDPOINT} from "../../Endpoints.ts";
import Cookies from "js-cookie";

/**
 *  @return {Promise<User | null>}
 * @description Makes an api call that will fetch the user's data or will return null if the token is invalid
 */
export default async function fetchUser():Promise<User | null> {
    try{
        const token = Cookies.get('token')
        if(!token) throw new Error('No token found')

        const {data} = await axios.post(GETUSERDATA_ENDPOINT , {
            access_token: token
        } , {headers:{
                Authorization: `Bearer ${token}`
            }})
        return data
    }catch(e){
        console.log(e)
        return null
    }
}