import React from "react";
import { BoxProps, Grid, GridProps } from "@chakra-ui/core";

import { useDataTableData } from "./useDataTableData";
import { AddProjectButton } from "./AddProjectButton";
import { DataCell } from "./DataCell";
import { ProjectCell } from "./ProjectCell";


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
