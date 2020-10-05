import React from "react";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/core";


export const RecordAdder: React.FC = () => {
    const { isOpen, onOpen: openModal, onClose: closeModal } = useDisclosure();

    const userAcceptsNewRecord = () => {};

    return (
        <>
            <Button
                leftIcon="add"
                variantColor="pink"
                variant="solid"
                onClick={openModal}
            >
                Add record
            </Button>

            <Modal
                onClose={closeModal}
                isOpen={isOpen}
                // initialFocusRef=the first field of the form, probably
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Add record
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <NewRecordForm />
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            variantColor="pink"
                            variant="outline"
                            onClick={userAcceptsNewRecord}
                        >
                            Add
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

const NewRecordForm: React.FC = () => {
    return <>The form will go in here</>;
};
