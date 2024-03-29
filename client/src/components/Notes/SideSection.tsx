import sideSection from "../../assets/note/SideSection.module.css";
import {Burger, Button, Center, Container, Group, Input, Stack, Text, Title} from "@mantine/core";
import {NotebookPen, SearchIcon} from "lucide-react";
import {Control, Controller, UseFormHandleSubmit, UseFormSetValue} from "react-hook-form";
import {startsWithTag} from "../../utils/startsWithTag.ts";
import Trash from "../Sections/Trash.tsx";
import {Note} from '../../Types.ts'
import AllNotes from "../Sections/AllNotes.tsx";
import {Dispatch} from "react";

const SideSection = ({section,handleNavigationMenu,handleSearch,handleSubmit,handleCreateNote,
                        control,searchKeyword,setValue,showSearchResults,notes , searchResults , setSelectedNote,selectedNote}:{
    section:string | undefined,
    handleNavigationMenu:() => void,
    handleCreateNote:() => void,
    handleSubmit:UseFormHandleSubmit<{searchKeyword:string}>,
    handleSearch:() => void,
    control:Control<{searchKeyword: string; },{searchKeyword: string; }>,
    searchKeyword:string,
    setValue: UseFormSetValue<{ searchKeyword: string; }>,
    showSearchResults:boolean,
    notes:Note[],
    searchResults:Note[],
    setSelectedNote:Dispatch<Note | undefined>,
    selectedNote:Note|undefined
}) => {
    return (
        <section className={sideSection.navbar}
             style={{height: "100vh", minWidth: '360px'}}>
            <div className={sideSection.navbarMain}>
                <Stack>
                    <Group className={sideSection.header} justify="space-between">
                        <Burger classNames={{
                            burger: sideSection.burgerMenu
                        }} onClick={() => handleNavigationMenu()}
                                aria-label="Toggle navigation"/>
                        <Text className={sideSection.logo} fw={900}
                              >NoteIt</Text>
                        <Button onClick={() => handleCreateNote()} variant='transparent'
                                size="compact-md">
                            <NotebookPen className={sideSection.newNote}/>
                        </Button>
                    </Group>
                    {
                        section === 'notes' && (
                            <form autoComplete="one-time-code"
                                  onSubmit={handleSubmit(handleSearch)}>
                                <Controller
                                    name="searchKeyword"
                                    control={control}
                                    rules={{
                                        required: {value: true, message: 'This field is required!'},
                                        minLength: {
                                            value: 5,
                                            message: 'Email length must be bigger than 5 characters'
                                        },
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    }}
                                    render={({field}) => (
                                        <Input c={'white'} {...field} classNames={{
                                            input: sideSection.searchInput
                                        }} placeholder="Search Notes" leftSection={
                                            <SearchIcon/>
                                        }/>
                                    )}
                                />
                            </form>
                        )
                    }
                </Stack>
            </div>
            {
                section === 'notes' && (searchKeyword.length > 0 && !startsWithTag(searchKeyword)) && (
                    <Group justify='space-between' className={sideSection.searchResults}>
                        <Button
                            onClick={() => setValue('searchKeyword', `tag:${searchKeyword}`)}
                            variant='subtle'>Search by tag only</Button>
                        {!startsWithTag(searchKeyword) && (
                            <Text
                                className={sideSection.searchByTag}>tag:{searchKeyword}</Text>
                        )}
                    </Group>
                )
            }
            <Container className={sideSection.sectionTitle}>
                <Center>
                    <Title order={4}>{ section && (
                        section.charAt(0).toUpperCase() +
                        section.slice(1)
                    )}</Title>
                </Center>
            </Container>
            {section === 'notes' ?
                <>
                    <div style={{overflow: 'auto', height: '100vh'}}>
                        <AllNotes notes={showSearchResults ? searchResults : notes.filter(prev => !prev.deleted)}
                                  setSelectedNote={setSelectedNote}
                                  selectedNote={selectedNote}
                                  showSearchResults={showSearchResults}/>
                    </div>
                </> : <div style={{overflow: 'auto', height: '100%'}}>
                <Trash notes={notes.filter(prev => prev.deleted)} selectedNote={selectedNote}
                           setSelectedNote={setSelectedNote}/>
                </div>
            }
        </section>
    );
};

export default SideSection;