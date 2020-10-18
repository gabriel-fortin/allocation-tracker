import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Input,Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from "@chakra-ui/core";

import { Person, WithId } from "Model";

import { usePeopleData } from "./usePeopleData";


export const PeopleArea: React.FC = () => {
    const { persons, upsertPerson, removePerson } = usePeopleData();
    const [editedPerson, setEditedPerson] = useState<Person | WithId<Person> | null>(null);

    const newPersonButtonClicked = () => {
        const newPerson: Person = new Person("", "");
        setEditedPerson(newPerson); // this edited person has no id
    };
    const personBadgeClicked = (person: WithId<Person>) => {
        setEditedPerson(person); // this edited person has an id
    };
    const personEditModalCloses = () => {
        setEditedPerson(null);
    };
    const personEditModalSaves = (person: Person | WithId<Person>) => {
        setEditedPerson(null);
        upsertPerson(person); // this person might have an id
        // it depends on whether the modal was opened for a new or existing person
    };

    return (
        <Stack
            isInline
            align="center"
        >
            <Text>
                people
            </Text>
            {persons.map(personWithId =>
                <PersonBadge
                    person={personWithId}
                    onClick={() => personBadgeClicked(personWithId)}
                />
            )}
            {/* TODO: extract below button as separate component? */}
            <Button
                onClick={newPersonButtonClicked}
                leftIcon="add"
                variant="link"
                variantColor="green"
                size="sm"
                marginLeft={4}
            >
                Add Person
            </Button>
            <PersonEditModal
                edit={editedPerson}
                onClose={personEditModalCloses}
                onSave={personEditModalSaves}
            />
        </Stack>
    );
};

interface BadgeProps {
    person: Person;
    onClick: () => void;
}

const PersonBadge: React.FC<BadgeProps> = ({ person, onClick }) => {
    // TODO: display person's avatar using the right color

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

interface EditProps{
    // if set to null, it will hide the modal
    edit: Person | WithId<Person> | null;
    onClose: () => void;
    // an existing person instance will have an id; a new one will not
    onSave: (person: Person | WithId<Person>) => void;
}
const PersonEditModal: React.FC<EditProps> =
    ({
        edit: editedPerson,
        onClose,
        onSave: savePerson,
    }) => {
        const [person, setPerson] = useState<Person | WithId<Person> | null>(null);

        // when caller sets a value, copy it into internal state
        useEffect(() => setPerson(editedPerson), [editedPerson]);

        // a null value for 'person' means the caller requested to hide the modal
        if (person == null) return null;

        const firstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
            const firstName: typeof person.firstName = e.currentTarget.value;
            setPerson({
                ...person,
                firstName,
                initial: firstName[0],
            });
        };

        return (
            <Modal
                // isOpen={editedPerson !== null}
                isOpen={true}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Person</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            value={person.firstName}
                            onChange={firstNameChange}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            onClick={() => savePerson(person)}
                            variant="outline"
                            variantColor="green"
                        >
                            Save
                    </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        );
    };
