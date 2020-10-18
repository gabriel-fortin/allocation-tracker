import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Input,Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from "@chakra-ui/core";

import { usePeopleData } from "./usePeopleData";
import { Person } from "Model";


export const PeopleArea: React.FC = () => {
    const { persons, upsertPerson, removePerson } = usePeopleData();
    const [editedPerson, setEditedPerson] = useState<Omit<Person, "iid"> | null>(null);

    const newPersonButtonClicked = () => {
        const newPerson: Omit<Person, "iid"> = new Person(-1, "", "");
        delete (newPerson as any).iid;
        setEditedPerson(newPerson);
    };
    const personBadgeClicked = (person: Person) => {
        setEditedPerson(person);
    };
    const personEditModalCloses = () => {
        setEditedPerson(null);
    };
    const personEditModalSaves = (person: Omit<Person, "iid">) => {
        setEditedPerson(null);
        upsertPerson(person);
    };

    return (
        <Stack
            isInline
            align="center"
        >
            <Text>
                people
            </Text>
            {persons.map(person =>
                <PersonBadge
                    person={person}
                    onClick={() => personBadgeClicked(person)}
                />
            )}
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
            key={person.iid}
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
    edit: Omit<Person, "iid"> | null;
    onClose: () => void;
    onSave: (person: Omit<Person, "iid">) => void;
}
const PersonEditModal: React.FC<EditProps> =
    ({
        edit: editedPerson,
        onClose,
        onSave: savePerson,
    }) => {
        const [person, setPerson] = useState<Omit<Person, "iid"> | null>(null);
        useEffect(() => {
            setPerson(editedPerson);
        }, [editedPerson]);

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
                isOpen={editedPerson !== null}
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
                        >
                            Save
                    </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        );
    };
