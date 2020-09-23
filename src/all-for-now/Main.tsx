import React from "react";
import { CSSReset, ThemeProvider, Flex, Divider, Text, BoxProps, Grid, Box, GridProps } from "@chakra-ui/core";

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
    const byProject = new Array(9)
        .fill('X')
        .map((x, i) => ({
            projectName: `project ${i}`,
            byDay: new Array(71)
                .fill('?')
                .map((y, j) => `${j*67}`)
        }));


    // props for both left and right area
    const areaProps: GridProps = {
        autoRows: "2em", // fixed row height
        rowGap: "1px",
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
        // alignItems: "stretch",
        // justifyItems: "stretch",
    };

    return (
        <Grid  // TODO: replace this usage of Grid with Flex
            templateColumns="minmax(15%, 7em) 1fr"
        >

            {/*  projects' area  */}
            <Grid {...projectAreaProps}>
                {byProject.map(projectData =>
                    <ProjectCell data={projectData} />
                )}
            </Grid>

            {/*  assignments' area  */}
            <Grid {...dataAreaProps}>
                {byProject.map((project, i) => (
                    <React.Fragment key={i}>
                        {/* decoration */}
                        <Box
                            gridRow={i}
                            width="4px"
                            backgroundColor="pink.400"
                        />
                        {project.byDay.map((day, j) =>
                            <DataCell data={day} gridRow={i} key={j} />
                        )}
                    </React.Fragment>
                ))}
            </Grid>

        </Grid>
    );
};

const ProjectCell: React.FC<{data:any} & BoxProps> = ({data, ...boxProps}) => {
    return (
        <Box {...boxProps}
            backgroundColor="green.500"
        >
            {data.projectName}
        </Box>
    );
};

const DataCell: React.FC<{data:any} & BoxProps> = ({ data, ...boxProps }) => {
    // data will contain a list of people with values between 0 and 1
    return (
        <Box {...boxProps}
            backgroundColor="purple.100"
        >
            {data}
        </Box>
    );
};
