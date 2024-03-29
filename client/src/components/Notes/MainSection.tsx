import mainSection from '../../assets/note/MainSection.module.css';
import {
    Button,
    Group,
    Text,
    Pill,
    Tooltip,
    Menu,
    UnstyledButton
} from '@mantine/core';
import {InfoIcon, MoreVertical, SaveIcon, Star} from "lucide-react";
import {useDisclosure} from "@mantine/hooks";
import {Note, NoteTags} from "../../Types.ts";
import {Dispatch, FormEvent, useEffect, useState} from "react";
import {Controller, FieldValues, useForm} from "react-hook-form";
import Cookies from "js-cookie";
import {v4 as uuidv4} from 'uuid';
import {IconArrowLeft, IconTrash} from "@tabler/icons-react";
import 'react-toastify/dist/ReactToastify.css';
import {saveNote} from "../../utils/saveNote.ts";
import {deleteNote} from "../../utils/deleteNote.ts";
import pinNote from "../../utils/PinNote.ts";
import {toast} from "react-toastify";
import {toastOptions} from "../../constants.ts";
import NoteInfoModal from "./NoteInfoModal.tsx";
import TagsInputModal from "./TagsInputModal.tsx";
const MainSection = ({note , setSelectedNote , setNotes , onMobile}:{note:Note , setSelectedNote:Dispatch<Note | undefined> , setNotes:Dispatch<Note[]> , onMobile:boolean}) => {

    const [allTags, setAllTags] = useState<NoteTags[]>([]);
    const [opened, { open , close}] = useDisclosure(false);
    const [openedTagsMenu, { toggle, close:closeTagsMenu }] = useDisclosure(false);
    const token = Cookies.get('token');
    const {control, watch , handleSubmit} = useForm({
        values: {
            title: note.title,
            body: note.body,
            tags:allTags
        }
    });
    const {control:controlTags  , handleSubmit:handleSubmitTags} = useForm({
        values:{
            tag: '',
            colorPicked:'#4C6EF5'
        }
    });
    const myuuid = uuidv4();
    useEffect(() => {
        setAllTags(note.tags)
    },[note])

    const bodyText = watch('body')
    const titleText = watch('title')
    const handleDelete = async () => {
        await deleteNote(note , token , setNotes)
        setSelectedNote(undefined)
    }
    const onSubmit = async (fieldData: FieldValues) => {
            await saveNote(note , fieldData , token , setNotes)
            toast.success('Note saved!', toastOptions)
    };
    const onSubmitTags = async (data:FieldValues , e:FormEvent) => {
        (e.target as HTMLFormElement).reset();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setAllTags((prev:NoteTags) => [...prev , {id:myuuid , color:data.colorPicked,content:data.tag}])
        setSelectedNote({
            ...note,
            title:titleText,
            body:bodyText,
            pinned: note.pinned,
            tags: [...allTags , {id:myuuid , color:data.colorPicked,content:data.tag}]
        })
    }
    async function handleDeleteTag(tag:NoteTags) {
        setAllTags(allTags.filter(filterTag => filterTag.id !== tag.id))
        setSelectedNote({
            ...note,
            title:titleText,
            body:bodyText,
            pinned: note.pinned,
            tags: allTags.filter(filterTag => filterTag.id !== tag.id)
        })
    }
    async function handlePin() {
        await pinNote(note , allTags , token , setSelectedNote , setNotes)
    }
    async function handleOpenTagsMenu(){
        await saveNote(note , {body:bodyText,title:titleText} , token , setNotes)
        toggle()
    }

    return (
        <div className={mainSection.container}>
            <div className={mainSection.header}>
                <div>
                    {onMobile && (
                        <Tooltip label="Go back">
                            <Button onClick={() => {setSelectedNote(undefined)}} size='compact-md' variant='transparent'>
                                <IconArrowLeft className={mainSection.goBackIcon}/>
                            </Button>
                        </Tooltip>
                    )}
                    <Tooltip label="Save note">
                        <Button form='noteContentForm' type='submit' size='compact-md' variant='transparent'>
                            <SaveIcon className={mainSection.saveIcon}/>
                        </Button>
                    </Tooltip>
                </div>
                <div>
                        <Menu radius='md' withArrow arrowOffset={32} arrowSize={12} position="bottom-end" offset={37}>
                            <Menu.Target>
                                <Tooltip label="Actions">
                                    <Button size='compact-md' variant='transparent'>
                                        <MoreVertical className={mainSection.actionsIcon}/>
                                    </Button>
                                </Tooltip>
                            </Menu.Target>
                            <Menu.Dropdown classNames={{dropdown:mainSection.Actions}}>
                                {note.pinned ? (
                                    <Menu.Item
                                        leftSection={<Star fill='yellow' stroke='yellow' size={24} />}
                                        component="button"
                                        onClick={() => handlePin()}
                                        style={{backgroundColor:'#212121' , color:'white'}}
                                    >
                                        <Text>Unpin Note</Text>
                                    </Menu.Item>
                                ):(
                                    <Menu.Item
                                        leftSection={<Star size={24} />}
                                        component="button"
                                        onClick={() => handlePin()}
                                        style={{backgroundColor:'#212121' , color:'white'}}
                                    >
                                        <Text>Pin Note</Text>
                                    </Menu.Item>
                                )}
                                <Menu.Item
                                    color="red"
                                    component="button"
                                    onClick={() => handleDelete()}
                                    style={{backgroundColor:'#212121'}}
                                    leftSection={<IconTrash size={24} />}
                                >
                                    <Text>Delete Note</Text>
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    <Tooltip label="Info">
                        <Button onClick={open} size='compact-sm' variant='transparent'>
                            <InfoIcon className={mainSection.infoIcon}/>
                        </Button>
                    </Tooltip>
                </div>
                <NoteInfoModal opened={opened} note={note} bodyText={bodyText} titleText={titleText}  close={close}/>
            </div>
            <Group className={mainSection.tagsPreview} display='flex' justify='space-between'>
                <Pill.Group>
                    {allTags.map((tag, index) => (
                        <Pill size='sm' key={index}
                              style={{backgroundColor: tag.color, color: 'white'}}>{tag.content}</Pill>
                    ))}
                </Pill.Group>
                <UnstyledButton onClick={handleOpenTagsMenu} className={mainSection.addTagsButton}>Add tags..</UnstyledButton>
            </Group>
            <div className={mainSection.formContainer}>
                <TagsInputModal openedTagsMenu={openedTagsMenu} closeTagsMenu={closeTagsMenu}
                                handleSubmitTags={handleSubmitTags} onSubmitTags={onSubmitTags}
                                controlTags={controlTags} allTags={allTags}
                                handleDeleteTag={handleDeleteTag} />
                <form id='noteContentForm' onSubmit={handleSubmit(onSubmit)} className={mainSection.form}>
                    <Controller
                        name="title"
                        control={control}
                        render={({field}) => (
                            <textarea
                                spellCheck='false'
                                placeholder='Title...'
                                className={mainSection.textAreaTitle}
                                {...field}
                            />)}
                    />
                    <Controller
                        name="body"
                        control={control}
                        render={({field}) => (
                            <textarea
                                spellCheck='false'
                                placeholder='Start writing an awesome note!'
                                className={mainSection.textArea}
                                {...field}
                            />)}
                    />
                </form>
            </div>
        </div>
    );
};

export default MainSection;