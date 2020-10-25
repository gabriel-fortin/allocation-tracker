import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, FormHelperText, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/core";

import { Project, WithId } from "Model";


interface ProjectEditModalProps {
    // if null, modal will be hidden
    projectToEdit: Project | WithId<Project> | null;

    onSave: (p: Project) => void;

    // caller can be notified when the dialog closes
    onClose?: () => void;
}


export const ProjectEditModal: React.FC<ProjectEditModalProps> = ({
    projectToEdit,
    onSave,
    onClose: sendCloseEventToCaller = () => {},
}) => {
    const [project, setProject] = useState<Project | WithId<Project> | null>(null);
    const [hasNameLostFocus, setHasNameLostFocus] = useState(false);

    // refresh internal value when value from caller changes
    useEffect(() => setProject(projectToEdit), [projectToEdit]);

    // caller asking to hide modal
    if (project === null) return null;

    const isNameValid = project.name !== "";
    const showNameError = !isNameValid && hasNameLostFocus;

    const nameChanges = (e:ChangeEvent<HTMLInputElement>) => {
        setHasNameLostFocus(false);
        setProject({
            ...project,
            name: e.currentTarget.value,
        });
    }

    const trySaveProject = () => {
        if (!isNameValid) return;

        onSave(project);
        sendCloseEventToCaller();
    };

    const closingModal = () => {
        setProject(null);
        setHasNameLostFocus(false);
        sendCloseEventToCaller();
    };

    return (
        <Modal
            isOpen={true}  // if modal should be closed, we'll return much earlier
            onClose={closingModal}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>Add/Edit Project</ModalHeader>
                <ModalBody>
                    <FormLabel htmlFor="projectName">
                        Project name
                    </FormLabel>
                    <Input
                        id="projectName"
                        isInvalid={showNameError}
                        value={project.name}
                        onChange={nameChanges}
                        onBlur={() => setHasNameLostFocus(true)}
                        onFocus={() => setHasNameLostFocus(false)}
                    />
                    {showNameError &&
                        <FormHelperText>
                            You want to tell me THAT is your project name?
                        </FormHelperText>
                    }
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="outline"
                        variantColor="cyan"
                        onClick={trySaveProject}
                        >
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
