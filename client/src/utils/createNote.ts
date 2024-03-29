import {Note, User} from "../Types.ts";
import {toast} from "react-toastify";
import {toastOptions} from "../constants.ts";
import {Dispatch} from "react";
import axios from "axios";
import {CREATENOTE_ENDPOINT} from "../../Endpoints.ts";
import Cookies from "js-cookie";

/**
 *  @return {void}
 * @param user {User}
 * @param setNotes {Dispatch<Note[]>}
 * @description Makes an api call that will save the note fields that you provide data for , also updates the notes state
 */
export const createNote = async (user:User , setNotes:Dispatch<Note[]>):Promise<void> => {
    try{
        const token = Cookies.get('token')
            const {data} = await axios.post(CREATENOTE_ENDPOINT, {userId:user._id} ,{headers: {Authorization: `Bearer ${token}`}});
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setNotes((prevNotes) => [data,...prevNotes])
    }catch (e){
        toast.error("We couldn't create a new note!" , toastOptions)
    }
}