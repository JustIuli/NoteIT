import {
    Box,
    Button,
    Collapse,
    Drawer,
    ScrollArea,
    Stack,
    Text,
    Title,
    useMantineColorScheme
} from '@mantine/core';
import {useNavigate, useParams} from "react-router-dom";
import Cookies from "js-cookie";
import {toast} from "react-toastify";
import {Dispatch} from "react";
import {Note} from "../../Types.ts";
import {useDisclosure} from "@mantine/hooks";
import menuDrawer from '../../assets/note/MenuDrawer.module.css'
import {ChevronDown, ChevronUp, Library, MoonIcon, Sun, TrashIcon} from "lucide-react";
import FontsModal from "./FontsModal.tsx";
import {toastOptions} from "../../constants.ts";
export default function MenuDrawer({ setSelectedNote,opened,close}:{opened:boolean , close:() => void , setSelectedNote:Dispatch<Note|undefined>}) {
    const navigate = useNavigate();
    const {section} = useParams()
    const { setColorScheme, colorScheme} = useMantineColorScheme();
    const [openedSettings, { toggle:toggleSettings }] = useDisclosure(false);
    const [openedFonts, { open:openFonts, close:closeFonts }] = useDisclosure(false);
    function handleLogout() {
        Cookies.remove('token')
        toast.info('Logged out! Redirecting..' , toastOptions)
        setTimeout(() => {
            window.location.href = '/'
        },5000)
    }
    function handleNavigate(where:string) {
        const redirectLink = `/app/${where}`
        setSelectedNote(undefined)
        close()
        navigate(redirectLink)
    }
    function toggleTheme() {
            colorScheme === 'dark' ? setColorScheme('light') : setColorScheme('dark')
    }

    return (
        <Drawer classNames={{
            content:menuDrawer.shell,
            header:menuDrawer.header,
            title:menuDrawer.title,
            close:menuDrawer.closeButton,
            body:menuDrawer.menuBody
        }} opened={opened} onClose={close} title="Main Menu"
                overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
                transitionProps={{ transition: 'slide-right', duration: 300, timingFunction: 'linear' }}
                closeButtonProps={{ 'aria-label': 'Close Settings' }}
                scrollAreaComponent={ScrollArea.Autosize}
        >
            <Stack gap='xs'>
                <Button variant={section === 'notes' ? 'subtle' : 'filled'} leftSection={<Library />} color="blue"
                        onClick={() => handleNavigate('notes')} fullWidth>
                    Notes
                </Button>

                <Button variant={section === 'trash' ? 'subtle' : 'filled'} leftSection={<TrashIcon />} color="blue"
                        onClick={() => handleNavigate('trash')} fullWidth>
                    Trash
                </Button>

                <Button fullWidth variant= {openedSettings ? 'subtle' : 'filled'} onClick={toggleSettings}>
                    {openedSettings ? <ChevronUp /> : <ChevronDown />}
                    Settings
                </Button>
            </Stack>
            <Box mt={10} maw={400} mx="auto">
                <Collapse in={openedSettings} transitionDuration={400} transitionTimingFunction="linear">
                    <Stack gap='xs'>
                        <Box className={menuDrawer.settingBox} p={"sm"}>
                            <Title order={3}>Account Settings</Title>
                            <Text my={8}>
                                Manage your account preferences effortlessly, ensuring seamless access
                                and personalized configurations tailored to your needs.
                            </Text>
                            <Stack gap='xs'>
                            <Button onClick={handleLogout} fullWidth variant='white'>Sign out</Button>
                            <Button fullWidth variant='filled' onClick={() => navigate('/auth/change-password')}>Change Password</Button>
                            </Stack>
                        </Box>
                        <Box className={menuDrawer.settingBox} p={"sm"}>
                            <Title order={3}>Appearance</Title>
                            <Text my={8}>
                                Customize your visual experience with our versatile themes and personalized
                                settings, ensuring a tailored interface that reflects your unique style
                                and preferences.
                            </Text>
                            <Stack gap='xs'>
                                <Button fullWidth variant='filled' onClick={toggleTheme}>
                                    {
                                        colorScheme === 'dark' ?
                                            <Sun style={{width: '70%', height: '70%'}}/>
                                            :
                                            <MoonIcon style={{width: '70%', height: '70%'}}/>
                                    }
                                    Toggle Theme
                                </Button>
                                <Button fullWidth variant='filled' onClick={openFonts}>
                                    Fonts
                                </Button>
                                <FontsModal opened={openedFonts} close={closeFonts} />
                            </Stack>
                        </Box>
                    </Stack>
                </Collapse>
            </Box>
        </Drawer>
    );

}