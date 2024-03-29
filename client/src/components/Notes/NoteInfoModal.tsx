import {Group, Modal} from "@mantine/core";
import mainSection from "../../assets/note/MainSection.module.css";
import {DateTime} from "luxon";
import wordCounter from "../../utils/wordCounter.ts";
import {Note} from '../../Types.ts'
const NoteInfoModal = ({opened , note , bodyText , titleText , close}:{opened:boolean , note:Note , bodyText:string , titleText:string , close:() => void}) => {
    return (
        <Modal opened={opened} onClose={close} title="Note info" centered classNames={{
            body: mainSection.tagsFormBody,
            header: mainSection.tagsFormHeader,
            content: mainSection.tagsFormContent
        }}>
            <Group justify='space-between'>
                <p>Modified:</p>
                <span>{DateTime.fromISO(note.updatedAt).toLocaleString(DateTime.DATETIME_MED)}</span>
            </Group>
            <Group justify='space-between'>
                <p>Last synced:</p>
                <span>{DateTime.fromISO(note.updatedAt).toLocaleString(DateTime.DATETIME_MED)}</span>
            </Group>

            <Group justify='space-between'>
                <p>Created:</p>
                <span>{DateTime.fromISO(note.createdAt).toLocaleString(DateTime.DATETIME_MED)}</span>
            </Group>

            <Group justify='space-between'>
                <p>Words in title and body:</p>
                <span>{wordCounter(bodyText + " " +titleText)}</span>
            </Group>
            <Group justify='space-between'>
                <p>Characters:</p>
                <span>{(bodyText + " " + titleText).length}</span>
            </Group>
        </Modal>
    );
};

export default NoteInfoModal;