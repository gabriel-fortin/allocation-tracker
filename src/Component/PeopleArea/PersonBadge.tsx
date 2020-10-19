import React from "react";
import { Box, Stack } from "@chakra-ui/core";

import { Person } from "Model";


interface BadgeProps {
    person: Person;
    onClick: () => void;
}


export const PersonBadge: React.FC<BadgeProps> = ({ person, onClick }) => {
    return (
        <Stack
            isInline
            border="1px solid"
            borderColor="green.300"
            marginLeft={2}
            onClick={onClick}
        >
            <Box
                backgroundColor="green.300"
                color="white"
                fontWeight="bold"
                paddingX={1}
            >
                {`${person.initial}`}
            </Box>
            <Box
                marginRight={2}
            >
                {`${person.firstName}`}
            </Box>
        </Stack>
    );
};

