import axios from "axios";
import {UPDATENOTE_ENDPOINT} from "../../Endpoints.ts";
import {Note, NoteTags} from "../Types.ts";
import {toast} from "react-toastify";
import {toastOptions} from "../constants.ts";
import {Dispatch} from "react";

/**
 *  @return {void}
 * @param note {Note}
 * @param allTags {NoteTags[]}
 * @param token {string|undefined}
 * @param setSelectedNote {Dispatch<Note|undefined>}
 * @param setNotes {Dispatch<Note[]>}
 * @description Makes an api call that will pin the note , also updates the notes state alongside selectedNote state
 */
const pinNote = async (note:Note , allTags:NoteTags[] , token:string|undefined , setSelectedNote:Dispatch<Note | undefined> , setNotes:Dispatch<Note[]>): Promise<void> => {
    try{
        if(token){
            const updatedNote:Note = {
                ...note,
                pinned: !note.pinned,
                tags: allTags
            };

            //@ts-expect-error: I really don't know how to fix this
            setNotes((prevNotes: Note[]) => {
                return [
                    { ...updatedNote },
                    ...prevNotes.filter(noteFromFilter => noteFromFilter._id !== note._id)
                ]
            });

            await axios.patch(
                `${UPDATENOTE_ENDPOINT}/${note._id}`,
                updatedNote,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setSelectedNote({ ...updatedNote });

            toast.success("Note pinned successfully!", toastOptions);
        }else{
            throw 'Missing Authorization Token';
        }
    }catch (e){
        toast.error("We couldn't pin the note. Try again later!", toastOptions);
    }
}

export default pinNote;