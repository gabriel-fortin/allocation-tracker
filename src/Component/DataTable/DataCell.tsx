import React from "react";
import { Box, BoxProps, Stack, Text } from "@chakra-ui/core";

import { Value } from "Model";

import { Persons } from "./useDataTableData";


export const DataCell: React.FC<Persons<Value> & BoxProps> = ({ persons, ...boxProps }) => {
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
