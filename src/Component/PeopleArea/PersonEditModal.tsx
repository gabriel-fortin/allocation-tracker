import React, { useState, useEffect, ChangeEvent } from "react";
import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/core";

import { Person, WithId } from "Model";


interface EditProps {
    // if set to null, it will hide the modal
    edit: Person | WithId<Person> | null;

    onClose: () => void;

    // an existing person instance will have an id; a new one will not
    onSave: (person: Person | WithId<Person>) => void;
}


export const PersonEditModal: React.FC<EditProps> = ({
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
