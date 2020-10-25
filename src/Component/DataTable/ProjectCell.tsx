import React, { useState } from "react";
import { BoxProps, Box } from "@chakra-ui/core";

import { Project, WithId } from "Model";

import { ProjectEditModal } from "./ProjectEditModal";
import { useProjectCellData } from "./useProjectCellData";


type ProjectCellProps =
    {
        project: WithId<Project>
    }
    & BoxProps


export const ProjectCell: React.FC<ProjectCellProps> = ({ project, ...boxProps }) => {
    const { updateProject } = useProjectCellData();
    const [projectToEdit, setProjectToEdit] = useState<WithId<Project> | null>(null);

    const onProjectCellClick = () => {
        setProjectToEdit(project);
        console.log(`XX: project to edit`, project);
        
    };

    const onModalSave = (projectToSave: Project) => {
        updateProject(project.iid, projectToSave);
    };

    const onModalClose = () => {
        setProjectToEdit(null);
    };

    return (
        <Box {...boxProps}
            onClick={onProjectCellClick}
        >
            {project.name}

            <ProjectEditModal
                projectToEdit={projectToEdit}
                onSave={onModalSave}
                onClose={onModalClose}
            />
        </Box>
    );
};
