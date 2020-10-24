import React, { useState } from "react";
import { Button } from "@chakra-ui/core";

import { Project } from "Model";

import { useAddProjectButtonData } from "./useAddProjectButtonData";
import { ProjectEditModal } from "./ProjectEditModal";


export const AddProjectButton: React.FC = () => {
    const { addProject: addProjectToStore } = useAddProjectButtonData();
    const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

    const buttonClick = () => {
        // TODO: creating a new Project object is business logic; where should it be moved to?
        setProjectToEdit(new Project(""));
    };

    const onProjectSave = (project: Project) => {
        setProjectToEdit(null); // hide the modal
        addProjectToStore(project);
    };

    return (
        <Button
            onClick={buttonClick}
            variant="link"
            variantColor="cyan"
            size="sm"
            leftIcon="add"
        >
            Add Project

            <ProjectEditModal
                projectToEdit={projectToEdit}
                onSave={onProjectSave}
            />
        </Button>
    );
};
