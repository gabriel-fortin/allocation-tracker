import React, { useState } from "react";
import { Box, Button, Input, InputGroup, InputRightElement, Stack, Text } from "@chakra-ui/core";

import { usePeopleData } from "./usePeopleData";


export const PeopleArea: React.FC = () => {
    const { persons, addPerson, removePerson } = usePeopleData();
    const [inputValue, setInputValue] = useState("");

    const buttonClicked = () => {
        console.log(`button click START`);
        setInputValue("");
        addPerson(inputValue);
        console.log(`button click END`);
        
    };
    const inputValueHasChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
    };

    return (
        <Stack
            isInline
            align="center"
        >
            <Text>
                people
            </Text>
            {persons.map(person => (

                // TODO: display person's avatar using the right color

                <Stack
                    isInline
                    border="1px solid"
                    borderColor="green.300"
                    marginLeft={2}
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
            ))}
            <InputGroup
                size="sm"
                marginLeft="1em"
            >
                <Input
                    variant="outline"
                    // variant="flushed"
                    // variant="filled"
                    // variant="unstyled"
                    borderColor="green.300"
                    focusBorderColor="green.500"
                    width="15em"
                    placeholder="person's name"
                    value={inputValue}
                    onChange={inputValueHasChanged}
                />
                <InputRightElement
                    width="5em" // effectively, the size of the button
                >
                    <Button
                        size="sm" // matches size of InputGroup
                        width="100%"
                        variant="solid"
                        // variant="outline"
                        // variant="ghost"
                        variantColor="green"
                        leftIcon="add"
                        onClick={buttonClicked}
                    >
                        Add
                    </Button>
                </InputRightElement>
            </InputGroup>
        </Stack>
    );
};