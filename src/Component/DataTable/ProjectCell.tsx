import React from "react";
import { BoxProps, Box } from "@chakra-ui/core";

import { Project } from "Model";


export const ProjectCell: React.FC<Project & BoxProps> = ({ name, ...boxProps }) => {
    return (
        <Box {...boxProps}
        >
            {name}
        </Box>
    );
};
