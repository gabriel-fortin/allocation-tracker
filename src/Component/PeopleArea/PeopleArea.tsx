import React, { useState } from "react";
import { Button, Stack, Text } from "@chakra-ui/core";

import { Person, WithId } from "Model";

import { usePeopleData } from "./usePeopleData";
import { PersonEditModal } from "./PersonEditModal";
import { PersonBadge } from "./PersonBadge";


// TODO: add color to model and modal
// TODO: display person's avatar using the right color

// TODO: implement removing persons

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
            <AddPersonButton
                onClick={newPersonButtonClicked}
            />
            <PersonEditModal
                edit={editedPerson}
                onClose={personEditModalCloses}
                onSave={personEditModalSaves}
            />
        </Stack>
    );
};

const AddPersonButton: React.FC<{
    onClick: () => void,
}> = ({ onClick }) => {
    return (
        <Button
            onClick={onClick}
            leftIcon="add"
            variant="link"
            variantColor="green"
            size="sm"
            marginLeft={4}
        >
            Add Person
        </Button>
    );
};
