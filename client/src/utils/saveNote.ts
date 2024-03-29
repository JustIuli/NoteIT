import axios from "axios";
import {UPDATENOTE_ENDPOINT} from "../../Endpoints.ts";
import {Note} from "../Types.ts";
import {FieldValues} from "react-hook-form";
import {toast} from "react-toastify";
import {toastOptions} from "../constants.ts";
import {Dispatch} from "react";

/**
 *  @return {void}
 * @param note {Note}
 * @param fieldData {FieldValues}
 * @param token {string|undefined}
 * @param setNotes {Dispatch<Note[]>}
 * @description Makes an api call that will save the note fields that you provide data for , also updates the notes state
 */
export const saveNote = async (note:Note , fieldData:FieldValues , token:string|undefined , setNotes:Dispatch<Note[]>):Promise<void> => {
    try{
        if(token){
            const {data} = await axios.patch(`${UPDATENOTE_ENDPOINT}/${note._id}`, fieldData, {headers: {Authorization: `Bearer ${token}`}});
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setNotes((prevNotes: Note[]) => [
                data, ...prevNotes.filter(noteFromFilter => noteFromFilter._id !== note._id)
            ]);
        }else{
            throw 'Missing Authorization Token';
        }
    }catch (e){
        toast.error("We couldn't save the note!" , toastOptions)
    }
}