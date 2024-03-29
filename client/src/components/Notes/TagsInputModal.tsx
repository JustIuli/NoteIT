import { ColorPicker, Divider, Modal, Pill, PillsInput } from "@mantine/core";
import mainSection from "../../assets/note/MainSection.module.css";
import {
    Control,
    Controller,
    FieldValues,
    UseFormHandleSubmit,
} from "react-hook-form";
import { XIcon } from "lucide-react";
import { NoteTags } from "../../Types.ts";
import { FormEvent } from "react";

const TagsInputModal = ({
                            openedTagsMenu,
                            closeTagsMenu,
                            handleSubmitTags,
                            onSubmitTags,
                            controlTags,
                            allTags,
                            handleDeleteTag,
                        }: {
    openedTagsMenu: boolean;
    closeTagsMenu: () => void;
    handleSubmitTags: UseFormHandleSubmit<
        { tag: string; colorPicked: string },
        { tag: string; colorPicked: string }
    >;
    onSubmitTags: (data: FieldValues, e: FormEvent) => Promise<void>;
    controlTags: Control<
        { tag: string; colorPicked: string },
        { tag: string; colorPicked: string }
    >;
    allTags: NoteTags[];
    handleDeleteTag: (tag: NoteTags) => void;
}) => {
    return (
        <Modal
            classNames={{
                body: mainSection.tagsFormBody,
                header: mainSection.tagsFormHeader,
                content: mainSection.tagsFormContent,
            }}
            opened={openedTagsMenu}
            onClose={closeTagsMenu}
            title="Tags"
            centered
        >
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-expect-error */}
            <form onSubmit={handleSubmitTags(onSubmitTags)}>
                <Controller
                    name="colorPicked"
                    control={controlTags}
                    render={({ field }) => (
                        <ColorPicker
                            {...field}
                            fullWidth
                            format="hex"
                            swatches={[
                                "#2e2e2e",
                                "#868e96",
                                "#fa5252",
                                "#e64980",
                                "#be4bdb",
                                "#7950f2",
                                "#4c6ef5",
                                "#228be6",
                                "#15aabf",
                                "#12b886",
                                "#40c057",
                                "#82c91e",
                                "#fab005",
                                "#fd7e14",
                            ]}
                        />
                    )}
                />

                <Divider className={mainSection.divider} />
                <Controller
                    name="tag"
                    control={controlTags}
                    render={({ field }) => (
                        <PillsInput
                            {...field}
                            variant="unstyled"
                            classNames={{
                                input: mainSection.tagsInput,
                                wrapper: mainSection.tagsInputWrapper,
                            }}
                        >
                            <Pill.Group>
                                {allTags.map((tag, index) => (
                                    <Pill
                                        onClick={() => handleDeleteTag(tag)}
                                        key={index}
                                        style={{
                                            backgroundColor: tag.color,
                                            color: "white",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <div className={mainSection.tagContainer}>
                                            {tag.content}
                                            <XIcon size="20px" color="white" />
                                        </div>
                                    </Pill>
                                ))}
                                <PillsInput.Field placeholder="Add tags..." />
                            </Pill.Group>
                        </PillsInput>
                    )}
                />
            </form>
        </Modal>
    );
};

export default TagsInputModal;
