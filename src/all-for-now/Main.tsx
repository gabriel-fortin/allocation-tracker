import React from "react";
import { CSSReset, ThemeProvider, Flex, Divider, Text, BoxProps, Grid, Box, GridProps, Avatar, Stack, AvatarGroup, AspectRatioBox, Badge } from "@chakra-ui/core";

import { useData, Days, Persons, Projects } from "./hooks";
import { Day, Person, Project } from "../Model";



export const Main: React.FC = () => {
    return (
        <ThemeProvider>
            <CSSReset />
            <Content />
        </ThemeProvider>
    );
};

const Content: React.FC = () => (
    <Flex
        flexDirection="column"
    >
        <Header
            padding={6}
        />
        <Divider
            margin={0}
        />
        <Body
            padding={6}
        />
    </Flex>
);

const Header: React.FC<BoxProps> = (boxProps) => {

    return (
        <Flex {...boxProps}>
            <Text>
                people
            </Text>
        </Flex>
    );
};

const Body: React.FC<BoxProps> = (boxProps) => {
    return (
        <Box {...boxProps}>
            <DataTable />
        </Box>
    );
};

const DataTable: React.FC<BoxProps> = () => {
    // some pseudo-data to work on the UI
    const { projects } = useData();

    // props for both left and right area
    const areaProps: GridProps = {
        autoRows: "2.3em", // fixed row height
        rowGap: "1px",
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
                    <ProjectCell {...project} {...borders} borderRightWidth={2} />
                )}
            </Grid>

            {/*  assignments' area  */}
            <Grid {...dataAreaProps}>
                {projects.map((project, i) => (
                    project.days.map((day, j) =>
                        <DataCell {...day} gridRow={i} key={`${i}_${j}`} {...borders}/>
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

const DataCell: React.FC<Persons & BoxProps> = ({ persons, ...boxProps }) => {
    // data will contain a list of people with values between 0 and 1
    return (
        <Stack {...boxProps}
            fontSize="0.8em"
            isInline
            paddingX={2}
            /**/borderColor="blue.100"  // so it can be inherited by <div>
        >
            {persons.map(person => (
                <div style={{
                    width: "1.5em",
                    height: "1.6em",
                    margin: "0 1px",
                    border: "1px solid",
                    borderColor: "inherit",
                    textAlign: "center",
                    borderRadius: "50%",
                }}>
                    {person.initial}
                </div>
            ))}
        </Stack>
    );
};
