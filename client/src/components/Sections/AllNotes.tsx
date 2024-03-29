import allNotes from '../../assets/note/AllNotes.module.css'
import {Container, Stack, Text} from "@mantine/core";
import {Star} from "lucide-react";
import {Note} from "../../Types.ts";
import {Dispatch} from "react";
const AllNotes = ({notes , setSelectedNote , selectedNote , showSearchResults} : {notes:Note[] , setSelectedNote:Dispatch<Note|undefined> , selectedNote:undefined|Note , showSearchResults:boolean}) => {
    return (
        <>
            {notes && notes.length > 0 ? (
                <>
                    {notes.filter(note => note.pinned).map(pinnedNote => (
                        !pinnedNote.deleted && (
                            <Container key={pinnedNote._id} onClick={() => setSelectedNote(pinnedNote)}
                                       className={`${allNotes.noteContainer} ${selectedNote?._id === pinnedNote._id ? allNotes.noteActive : ''}`}>
                                <Star size='22px' fill={selectedNote?._id !== pinnedNote._id ? 'yellow' : 'white'} color={selectedNote?._id !== pinnedNote._id ? 'yellow' : 'white'}/>
                                <div className={allNotes.noteText}>
                                    {pinnedNote.title.length < 1 || pinnedNote.body.length < 1 ?
                                        <Text className={allNotes.newNote}>
                                            New Note
                                        </Text> :
                                        <>
                                            <Text className={allNotes.noteTitle}>
                                                {pinnedNote.title}
                                            </Text>
                                            <Text className={allNotes.noteExcerpt} size={'lg'}>
                                                {pinnedNote.body}
                                            </Text>
                                        </>
                                    }
                                </div>
                            </Container>
                        )
                    ))}

                    {notes.filter(note => !note.pinned).map(note => (
                        !note.deleted && (
                            <Container key={note._id} onClick={() => setSelectedNote(note)}
                                       className={`${allNotes.noteContainer} ${selectedNote?._id === note._id ? allNotes.noteActive : ''}`}>
                                <div className={allNotes.noteText}>
                                    {note.title.length < 1 ?
                                        <Text className={allNotes.newNote}>
                                            New Note
                                        </Text> :
                                        <>
                                            <Text className={allNotes.noteTitle}>
                                                {note.title}
                                            </Text>
                                            <Text className={allNotes.noteExcerpt} size={'lg'}>
                                                {note.body}
                                            </Text>
                                        </>
                                    }
                                </div>
                            </Container>
                        )
                    ))}
                </>
            ) : (
                <div style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Stack align='center'>
                            <svg width="120" height="120" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"
                                 aria-hidden="true" style={{stroke: '#303030', fill: '#303030'}}
                                 className="iconify iconify--emojione-monotone">
                                <path
                                    d="M32 2C15.428 2 2 15.428 2 32s13.428 30 30 30 30-13.428 30-30S48.572 2 32 2m0 57.5C16.836 59.5 4.5 47.164 4.5 32S16.836 4.5 32 4.5 59.5 16.836 59.5 32c0 1.357-.103 2.69-.294 3.996-.838-5.66-5.69-10.766-5.69-10.766s-5.828 6.113-5.828 12.375c0 6.353 6.393 7.996 9.708 4.937C53.251 52.488 43.431 59.5 32 59.5"/>
                                <circle style={{stroke: '#303030', fill: '#303030'}} cx="38.498" cy="35" r="3"/>
                                <circle style={{stroke: '#303030', fill: '#303030'}} cx="15.498" cy="35" r="3"/>
                                <path style={{stroke: '#303030', fill: '#303030'}}
                                      d="M21.992 21.58c.541-.469-.971-2.061-1.414-1.674a14.23 14.23 0 0 1-11.693 3.133c-.578-.113-1.088 2.021-.385 2.156a16.42 16.42 0 0 0 13.492-3.615m23.121 1.307c-4.168.748-8.455-.4-11.691-3.133-.443-.389-1.955 1.205-1.412 1.674a16.42 16.42 0 0 0 13.492 3.615c.703-.135.191-2.27-.389-2.156M38.074 47.33c-5.766-1.549-12.049-.428-16.93 3.014-1.205.869 1.053 4.027 2.252 3.152 3.223-2.268 8.352-3.834 13.66-2.432 1.423.377 2.536-3.308 1.018-3.734"/>
                            </svg>
                        <Text c={'gray'} size='xl'>
                            {showSearchResults ? 'No search results found!' : 'No notes created'}
                        </Text>
                        {showSearchResults && (
                            <Text c={'gray'} size='lg'>
                                Try searching for something else
                            </Text>
                        )}
                    </Stack>
                </div>
            )}
        </>
    );
};

export default AllNotes;
