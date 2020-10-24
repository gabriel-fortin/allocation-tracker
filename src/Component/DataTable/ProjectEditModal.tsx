import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, FormHelperText, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/core";

import { Project, WithId } from "Model";


interface ProjectEditModalProps {
    // if null, modal will be hidden
    projectToEdit: Project | WithId<Project> | null;

    onSave: (p: Project) => void;
}


export const ProjectEditModal: React.FC<ProjectEditModalProps> = ({
    projectToEdit,
    onSave,
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
        setProject(null);
    };

    const closeModal = () => {
        setProject(null);
        setHasNameLostFocus(false);
    };

    return (
        <Modal
            isOpen={true}
            onClose={closeModal}
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
