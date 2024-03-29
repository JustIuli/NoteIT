import mainSection from "../../assets/note/MainSection.module.css";
import {Button, Center, Modal, Stack, Text} from "@mantine/core";
import {useLocalStorage} from "@mantine/hooks";

const FontsModal = ({opened , close}:{opened:boolean , close:()=>void}) => {

    const [selectedFont, setSelectedFont] = useLocalStorage<
        'Inter' | 'Roboto' | 'Open Sans' | 'Whisper'
    >({
        key: 'selectedFont',
        defaultValue: 'Inter',
    });

    function changeFont(font: 'Inter' | 'Roboto' | 'Open Sans' | 'Whisper') {
        setSelectedFont(font)
    }

    return (
        <Modal opened={opened} onClose={close} title="Note info" centered classNames={{
            body: mainSection.tagsFormBody,
            header: mainSection.tagsFormHeader,
            content: mainSection.tagsFormContent
        }}>
            <Stack>
                <Center>
                    <Text>Current font: {selectedFont}</Text>
                </Center>
                <Center>
                    <Text>Font changing takes effect only after reloading the page!</Text>
                </Center>
                <Button variant="filled" onClick={() => changeFont('Inter')}>Inter</Button>
                <Button variant="filled" onClick={() => changeFont('Roboto')}>Roboto</Button>
                <Button variant="filled" onClick={() => changeFont('Open Sans')}>Open Sans</Button>
                <Button variant="filled" onClick={() => changeFont('Whisper')}>Whisper</Button>
            </Stack>
        </Modal>
    );
};

export default FontsModal;