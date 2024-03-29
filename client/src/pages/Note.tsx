import NoteLayout from "../components/Layouts/NoteLayout.tsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import NoNoteSelected from "../components/Notes/NoNoteSelected.tsx";
import MainSection from "../components/Notes/MainSection.tsx";
import {Note} from "../Types.ts";
import MenuDrawer from "../components/Notes/MenuDrawer.tsx";
import {useDisclosure} from "@mantine/hooks";
import {useForm} from "react-hook-form";
import {startsWithTag} from "../utils/startsWithTag.ts";
import SelectedDeletedNote from "../components/Notes/SelectedDeletedNote.tsx";
import SideSection from "../components/Notes/SideSection.tsx";
import {useQuery} from "react-query";
import fetchNotes from "../utils/fetchNotes.ts";
import fetchUser from "../utils/fetchUser.ts";
import {createNote} from "../utils/createNote.ts";
const Notes = () => {
    const { section } = useParams()
    const [searchResults, setSearchResults] = useState<Note[]>([]);
    const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedNote, setSelectedNote] = useState<undefined|Note>(undefined);
    const { control, setValue , watch , handleSubmit,} = useForm({
        defaultValues: {
            searchKeyword:"",
        },
    })
    const searchKeyword = watch('searchKeyword')
    const { data:dataNotes, isLoading:isLoadingNotes } = useQuery('notes', fetchNotes)
    const { data:user, isLoading:isLoadingUser } = useQuery('user', fetchUser)

    useEffect(() => {
        if (!isLoadingNotes && dataNotes) {
            setNotes(dataNotes);
        }
    }, [isLoadingNotes, dataNotes]);

    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (searchKeyword.length > 0) {
            setShowSearchResults(true);
            const filteredNotesByContent = notes.filter(note => {
                return !note.deleted && (
                    note.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                    note.body.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                    note.tags.some(tag => tag.content.toLowerCase().includes(searchKeyword.replace('tag:', '').toLowerCase()))
                )
            });
            setSearchResults(filteredNotesByContent)
            if (startsWithTag(searchKeyword)) {
                const filteredNotesByTag = notes.filter(note => {
                    return !note.deleted && (note.tags.some(tag => tag.content.toLowerCase().includes(searchKeyword.replace('tag:','').toLowerCase())));
                });
                setSearchResults(filteredNotesByTag)
            }
        } else {
            setShowSearchResults(false);
        }
    }, [searchKeyword]);
    function handleNavigationMenu() {
        open()
    }
    async function handleCreateNote() {
        if(!isLoadingUser && user && user._id){
        await createNote(user , setNotes)
        }else{
            throw 'Invalid user or token!';
        }
    }
    const [opened, { open, close }] = useDisclosure(false);
    function handleSearch() {}
    const breakpoint = 1024;

    return (
        <>
            <NoteLayout>
                <>
                    <MenuDrawer opened={opened} close={close} setSelectedNote={setSelectedNote}/>

                    <div style={{backgroundColor: '#191919', height: '100vh', width: '100%', display: 'flex'}}>

                        {windowWidth < breakpoint ? (
                            // Phone
                            selectedNote === undefined ? (
                                <>
                                        <SideSection
                                            section={section}
                                            handleNavigationMenu={handleNavigationMenu}
                                            handleCreateNote={handleCreateNote}
                                            handleSubmit={handleSubmit}
                                            handleSearch={handleSearch}
                                            control={control}
                                            searchKeyword={searchKeyword}
                                            setValue={setValue}
                                            showSearchResults={showSearchResults}
                                            notes={notes}
                                            searchResults={searchResults}
                                            setSelectedNote={setSelectedNote}
                                            selectedNote={selectedNote}
                                        />
                                </>
                            ) : (
                                <>
                                    {section === 'notes' ? (
                                        <MainSection
                                            onMobile
                                            note={selectedNote}
                                            setSelectedNote={setSelectedNote}
                                            setNotes={setNotes}
                                        />
                                    ) : (
                                        <SelectedDeletedNote
                                            note={selectedNote}
                                            setSelectedNote={setSelectedNote}
                                            setNotes={setNotes}
                                            onMobile
                                        />
                                    )}
                                </>
                            )
                        ) : (
                            <SideSection
                                section={section}
                                handleNavigationMenu={handleNavigationMenu}
                                handleCreateNote={handleCreateNote}
                                handleSubmit={handleSubmit}
                                handleSearch={handleSearch}
                                control={control}
                                searchKeyword={searchKeyword}
                                setValue={setValue}
                                showSearchResults={showSearchResults}
                                notes={notes}
                                searchResults={searchResults}
                                setSelectedNote={setSelectedNote}
                                selectedNote={selectedNote}
                            />
                        )}

                        {windowWidth > breakpoint && (
                            <>

                                {section === 'notes' ?
                                    (
                                        selectedNote === undefined ? <NoNoteSelected variant='notes'/> :
                                            <MainSection note={selectedNote} setSelectedNote={setSelectedNote}
                                                         setNotes={setNotes} onMobile={false}/>
                                    ):(
                                    selectedNote === undefined ? <NoNoteSelected variant='trash' /> : <SelectedDeletedNote note={selectedNote} setSelectedNote={setSelectedNote} setNotes={setNotes}  onMobile={false}/>
                                )}
                            </>
                        )}
                    </div>
                </>
            </NoteLayout>
        </>
    )
        ;
};

export default Notes;