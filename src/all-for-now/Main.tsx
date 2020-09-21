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
        <Flex
            {...boxProps}
        >
            <Text
                // padding={2}
            >
                people
            </Text>

        </Flex>
    );
};

const Body: React.FC<BoxProps> = (boxProps) => {
    // some pseudo-data to work on the UI
    const byProject = new Array(9)
        .fill('X')
        .map((x, i) => ({
            projectName: `project ${i}`,
            byDay: new Array(71)
                .fill('?')
                .map((y, j) => `${'a' + j}`)
        }));


    // props for both left and right area
    const areaProps: GridProps = {
        autoRows: "2em", // row height
        rowGap: "1px",
    };

    // props for only the left area
    const projectAreaProps: GridProps = {
        ...areaProps,
        gridColumn: "1",
    };

    // props for only the right area
    const dataAreaProps: GridProps = {
        ...areaProps,
        gridColumn: "2",
        templateColumns: "5px", // first column
        autoColumns: "3em", // all following columns
        columnGap: "1px",
        overflowX: "scroll",
    };

    return (
        <Grid
            {...boxProps}
            templateColumns="minmax(15%, 7em) [data] 1fr"
            columnGap="1px"
        >

            {/*  projects' area  */}
            <Grid {...projectAreaProps}>
                {byProject.map((project, i) => (
                    <Box backgroundColor="green.500">
                        {project.projectName}
                    </Box>
                ))}
            </Grid>

            {/*  assignments' area  */}
            <Grid {...dataAreaProps}>
                {byProject.map((project, i) => (<>
                    <Box
                        gridRow={i}
                        bg="pink.400"
                    >
                    </Box>
                    {project.byDay.map((day, j) =>
                        <Box
                            gridRow={i}
                            backgroundColor="purple.100"
                        >
                            <Cell data={day} />
                        </Box>
                    )}
                </>))}
            </Grid>

        </Grid>
    );
};

const Cell: React.FC<{data:any}> = ({ data }) => {
    // data will contain a list of people with values between 0 and 1
    return <>{data}</>;
};
