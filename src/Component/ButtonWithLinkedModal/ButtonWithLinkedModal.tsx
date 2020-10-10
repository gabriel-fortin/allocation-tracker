import React from "react";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/core";

import { ButtonWithLinkedModalProps } from "./ButtonWithLinkedModalProps";


export const ButtonWithLinkedModal: React.FC<ButtonWithLinkedModalProps> = ({
    variantColor,
    triggerButtonContent,
    modalButtonContent,
    modalTitleContent,
    modalButtonAction,
    propsForTriggerButton: userPropsForTriggerButton,
    children
}) => {
    const { isOpen, onOpen: openModal, onClose: closeModal } = useDisclosure();

    const defaultPropsForTriggerButton: typeof userPropsForTriggerButton = {
        variantColor: variantColor,
        variant: "solid",
    };

    return (
        <>
            <Button
                {...defaultPropsForTriggerButton}
                {...userPropsForTriggerButton}
                onClick={openModal}
            >
                {triggerButtonContent}
            </Button>

            <Modal
                onClose={closeModal}
                isOpen={isOpen}
            // initialFocusRef=the first field of the form, probably
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {modalTitleContent}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {children}
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            variantColor={variantColor}
                            variant="outline"
                            onClick={() => modalButtonAction(closeModal) }
                        >
                            {modalButtonContent}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
