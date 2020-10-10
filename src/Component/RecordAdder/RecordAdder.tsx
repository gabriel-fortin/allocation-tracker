import React from "react";
import { Select } from "@chakra-ui/core";

import { ButtonWithLinkedModal, ModalButtonAction } from "Component";

import { useNewRecordFormData } from "./useNewRecordFormData";


export const RecordAdder: React.FC = () => {
    const userAcceptsNewRecord: ModalButtonAction =
        (closeModal) => {
            console.log(`Record Adding  --  accepted`);
            closeModal();
        };

    return (
        <ButtonWithLinkedModal
            variantColor="pink"
            triggerButtonContent="Add record"
            modalTitleContent="Add record"
            modalButtonContent="Add"
            modalButtonAction={userAcceptsNewRecord}
            propsForTriggerButton={{ leftIcon: "add" }}
        >
            <NewRecordForm />
        </ButtonWithLinkedModal>
    );
};

const NewRecordForm: React.FC = () => {
    const data = useNewRecordFormData();
    return (
        <>
            <Select placeholder="select person">
                {data.persons.map(person => (
                    <option key={person.iid} value={person.iid}>{person.firstName}</option>
                ))}
            </Select>
        </>
    );
};
