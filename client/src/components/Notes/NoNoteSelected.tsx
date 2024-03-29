import noNoteSelected from '../../assets/note/NoNoteSelected.module.css'
import {Container} from "@mantine/core";

const NoNoteSelected = ({variant}:{variant:string}) => {
    return (
        <Container fluid className={noNoteSelected.container}>
            {variant === 'notes' ?
                (
                    <>
                        <h1 className={noNoteSelected.title}>No note selected</h1>
                        <p className={noNoteSelected.description}>Select a note to start writing</p>
                    </>
                ) :
                (
                    <>
                        <h1 className={noNoteSelected.title}>No deleted note selected</h1>
                        <p className={noNoteSelected.description}>Select a note and edit it</p>
                    </>
                )
            }
        </Container>
    );
};

export default NoNoteSelected;
