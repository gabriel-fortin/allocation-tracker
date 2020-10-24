import React, { ChangeEvent, useEffect, useState } from "react";
import { Text, BoxProps, Grid, Box, GridProps, Stack, Input, FormLabel, FormHelperText, Button, ModalOverlay, ModalCloseButton, ModalHeader, ModalContent, ModalFooter, Modal, ModalBody } from "@chakra-ui/core";

import { Day, Person, Project, Value, WithId } from "Model";

import { useDataTableData, Days, Persons, Projects } from "./useDataTableData";
import { useAddProjectData } from "./useAddProjectData";


export const DataTable: React.FC = () => {
    const { projects } = useDataTableData();

    // props for both left and right area
    const areaProps: GridProps = {
        autoRows: "1.8em", // fixed row height
        rowGap: "7px",
        alignItems: "center",
    };

    // props for only the left area
    const projectAreaProps: GridProps = {
        ...areaProps,
    };

    // props for only the right area
    const dataAreaProps: GridProps = {
        ...areaProps,
        columnGap: "1px",
        overflowX: "scroll",
    };

    const borders: BoxProps = {
        borderRightWidth: 1,
        borderRightStyle: "solid",
        borderRightColor: "gray.300",
    };

    return (
        <Grid  // TODO: replace this usage of Grid with Flex
            templateColumns="minmax(15%, 7em) 1fr"
        >

            {/*  projects' area  */}
            <Grid {...projectAreaProps}>
                {projects.map(project =>
                    <ProjectCell {...project} key={project.iid} {...borders} borderRightWidth={2} />
                )}
                <AddProjectButton />
            </Grid>

            {/*  assignments' area  */}
            <Grid {...dataAreaProps}>
                {projects.map((project, i) => (
                    project.days.map((day, j) =>
                        <DataCell {...day} gridRow={i+1} key={`${i}_${j}`} {...borders}/>
                    )
                ))}
            </Grid>

        </Grid>
    );
};

const ProjectCell: React.FC<Project & BoxProps> = ({ name, ...boxProps }) => {
    return (
        <Box {...boxProps}
        >
            {name}
        </Box>
    );
};

const AddProjectButton: React.FC = () => {
    const { addProject: addProjectToStore } = useAddProjectData();
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
        <>
            <Button
                onClick={buttonClick}
                variant="link"
                variantColor="cyan"
                size="sm"
                leftIcon="add"
            >
                Add Project
            </Button>
            <ProjectEditModal
                projectToEdit={projectToEdit}
                onSave={onProjectSave}
            />
        </>
    );
};

const ProjectEditModal: React.FC<{
    // if null, modal will be hidden
    projectToEdit: Project | WithId<Project> | null,
    onSave: (p: Project) => void
}> = ({ projectToEdit, onSave }) => {
    const [project, setProject] = useState<Project | WithId<Project> | null>(null);

    // const [name, setName] = useState<typeof Project.name>("");
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

const DataCell: React.FC<Persons<Value> & BoxProps> = ({ persons, ...boxProps }) => {
    // data will contain a list of people with values between 0 and 1

    const bgColorFor: (i: number) => string = (i) => [
        "teal.600", "yellow.400", "blue.300", "red.700", "purple.300",
        "pink.700", "gray.600"
    ][i];

    return (
        <Stack {...boxProps}
            isInline
            height="100%"
            // a 'Box' overrides right margin to 0.5rem
            // so we compensate with other margins/paddings
            paddingLeft={4}
            paddingRight={2}
            fontSize="0.8em"
            fontWeight="bold"
        >
            {persons.map((person, i) => {
                const border = (person.value===1)
                    && `solid 3px ${bgColorFor(i)}`
                    || `0`;
                return (
                    <Box
                        key={i}
                        width="1.1em"
                        height="1.65em"
                        textAlign="center"
                        // a 'Box' overrides right margin to 0.5rem
                        // so we compensate with other margins/paddings
                        marginLeft={-2}
                        // borderTop={border}
                        // borderBottom={border}

                        borderTop="solid 3px"
                        borderBottom="solid 3px"
                        borderColor={person.value && bgColorFor(i) || "lightgray"}
                        borderRadius="20%"
                        opacity={person.value*0.9 + 0.1}
                    >
                        <Text>
                            {person.initial}
                        </Text>
                    </Box>
                    // <Box
                    //     alignSelf={i%2==0 && "flex-end" || "flex-start"}
                    //     width="1.3em"
                    //     height="1.3em"
                    //     textAlign="center"
                    //     // margin="0 -3px"
                    //     // a 'Box' overrides right margin to 0.5rem
                    //     // so we compensate with other margins/paddings
                    //     marginLeft={-4}
                    //     border="1px solid"
                    //     borderColor={person.value && "teal.600" || "lightgrey"}
                    //     borderRadius="50%"
                    //     opacity={person.value*0.9 + 0.1}
                    // >
                    //     <Text>{person.initial}</Text>
                    // </Box>
                );
            })}
        </Stack>
    );
};