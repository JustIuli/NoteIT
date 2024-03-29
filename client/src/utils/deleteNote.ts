import {toast} from "react-toastify";
import {toastOptions} from "../constants.ts";
import axios from "axios";
import {UPDATENOTE_ENDPOINT} from "../../Endpoints.ts";
import {Note} from "../Types.ts";
import {Dispatch} from "react";

/**
 * @return {void}
 * @param note {Note}
 * @param token {string|undefined}
 * @param setNotes {Dispatch<Note[]>}
 * @description Makes an api call that will move the note to the trash can , updates the notes state
 */
export const deleteNote = async (note:Note , token:string|undefined , setNotes:Dispatch<Note[]>): Promise<void> => {
    try{
        if(token){
            const updatedNote = { ...note, deleted: true };
            await axios.patch(`${UPDATENOTE_ENDPOINT}/${note._id}`, updatedNote, {headers: {Authorization: `Bearer ${token}`}});
            toast.success('Note moved to trash!', toastOptions)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setNotes((prevNotes: Note[]) => {
                return prevNotes.map((prevNote: Note) => {
                    if (prevNote._id === updatedNote._id) {
                        return updatedNote;
                    } else {
                        return prevNote;
                    }
                });
            });
        }else{
            throw 'Missing Authorization Token';
        }
    }catch (e){
        toast.error("We couldn't move the note to trash.Try again later!" , toastOptions)
    }
}