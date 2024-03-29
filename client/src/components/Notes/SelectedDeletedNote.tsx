import selectedNote from "../../assets/note/MainSection.module.css";
import {Button, Group, Pill, Stack, Text, Tooltip} from "@mantine/core";
import {TrashIcon, Undo2} from "lucide-react";
import {Note} from "../../Types.ts";
import {Dispatch} from "react";
import {toast,ToastOptions} from "react-toastify";
import axios from "axios";
import {DELETENOTE_ENDPOINT, UPDATENOTE_ENDPOINT} from "../../../Endpoints.ts";
import Cookies from "js-cookie";
import {IconArrowLeft} from "@tabler/icons-react";
const SelectedDeletedNote = ({note , setSelectedNote , setNotes , onMobile}:{note:Note , setSelectedNote:Dispatch<Note | undefined> , setNotes:Dispatch<Note[]> , onMobile:boolean}) => {
    const token = Cookies.get('token')
    const toastOptions:ToastOptions = {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    };
    const handlePermaDelete = async (note:Note) => {
        try{
            await axios.delete(`${DELETENOTE_ENDPOINT}/${note._id}` , {headers: {Authorization: `Bearer ${token}`}})
            toast.success("Deleted the note permanently!" , toastOptions)
            // @ts-expect-error : can't be fixed
            setNotes((prev:Note[]) => {
                return prev.filter(filterNote => filterNote._id !== note._id)
            })
        }catch (e){
            toast.error("We couldn't delete the note.Try again later!" , toastOptions)
        }
        setSelectedNote(undefined)
    }

    const handleRecoverNote = async (note: Note) => {
        const updatedNote = { ...note, deleted: false };
        try{
            await axios.patch(`${UPDATENOTE_ENDPOINT}/${note._id}`, updatedNote, {headers: {Authorization: `Bearer ${token}`}});
            // @ts-expect-error : can't be fixed
            setNotes((prevNotes: Note[]) => {
                return prevNotes.map((prevNote: Note) => {
                    if (prevNote._id === updatedNote._id) {
                        return updatedNote;
                    } else {
                        return prevNote;
                    }
                });
            });
            toast.success("Note recovered successfully!" , toastOptions)
        }catch (e){
            toast.error("We couldn't recover the note.Try again later!" , toastOptions)
        }
        setSelectedNote(undefined);
    }

    return (
        <div className={selectedNote.container}>
            <div className={selectedNote.header}>
                <Group justify={onMobile ? "space-between" : "flex-end"} style={{width:'100%'}}>
                    <Group gap='xs'>
                        {onMobile ? (
                            <>
                            <Tooltip label="Focus view">
                                <Button onClick={() => handlePermaDelete(note)} size='compact-md' variant='transparent'>
                                        <TrashIcon color='#FA5252'/>
                                </Button>
                            </Tooltip>
                            <Tooltip label="Save note">
                                <Button onClick={() => handleRecoverNote(note)} size='compact-md' variant='transparent'>
                                    <Undo2 color={'white'}/>
                                </Button>
                            </Tooltip>
                                <Tooltip label="Focus view">
                                    <Button onClick={() => {setSelectedNote(undefined)}} size='compact-md' variant='transparent'>
                                        <IconArrowLeft className={selectedNote.infoIcon}/>
                                    </Button>
                                </Tooltip>
                            </>
                        ):(
                            <>
                                <Tooltip label="Focus view">
                                    <Button onClick={() => handlePermaDelete(note)} size='compact-md' leftSection={<TrashIcon/>} color='red' variant='subtle'>
                                        Delete forever
                                    </Button>
                                </Tooltip>
                                <Tooltip label="Save note">
                                    <Button onClick={() => handleRecoverNote(note)} size='compact-md' leftSection={<Undo2/>} color='blue' variant='subtle'>
                                        Recover note
                                    </Button>
                                </Tooltip>
                            </>
                        )}
                    </Group>
                </Group>
            </div>
            <div className={selectedNote.form}>
                <div className={selectedNote.formContainer}>
                    <Group style={{marginBottom: '2rem'}}>
                        {
                            note.tags.length > 0 ? (
                                <Pill.Group>
                                    {note.tags.map((tag, index) => (
                                        <Pill size='lg' key={index}
                                              style={{backgroundColor: tag.color, color: 'white'}}>{tag.content}</Pill>
                                    ))}
                                </Pill.Group> ): (
                                <Text size='lg' style={{color:'gray'}}>No tags</Text>
                            )
                        }
                    </Group>
                    <Stack>
                        <Text className={selectedNote.textAreaTitle}>{note.title}</Text>
                        <Text className={selectedNote.textArea}>{note.body}</Text>
                    </Stack>
                </div>
            </div>
        </div>
    );
};

export default SelectedDeletedNote;