import React from "react";
import { FormControl, FormLabel, Input, Select, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "@chakra-ui/core";

import { ButtonWithLinkedModal, ModalButtonAction } from "Component";

import { useNewRecordFormData } from "./useNewRecordFormData";


export const RecordAdder: React.FC = () => {
    const data = useNewRecordFormData();
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
            propsForModal={{ closeOnOverlayClick: false }}
        >
            <NewRecordForm />
        </ButtonWithLinkedModal>
    );
};

const NewRecordForm: React.FC = () => {
    const data = useNewRecordFormData();
    return (
        <FormControl
        >
            <FormLabel htmlFor="personSelection">
                Person?
            </FormLabel>
            <Select
                id="personSelection"
                placeholder="select person"
            >
                {data.persons.map(person => (
                    <option key={person.iid} value={person.iid}>{person.firstName}</option>
                ))}
            </Select>
            <FormLabel
                htmlFor="dateSelection"
                marginTop={4}
            >
                When?
            </FormLabel>
            <Input
                id="dateSelection"
                type="date"
                defaultValue={new Date().toISOString().substring(0, 10)}
                // defaultValue="2020-10-11"
            />
            <FormLabel
                htmlFor="amountSelection"
                marginTop={4}
            >
                Full day?
            </FormLabel>
            <Slider
                id="amountSelection"
                min={0}
                max={1}
                step={0.01}
                defaultValue={1}
            >
                <SliderTrack />
                <SliderFilledTrack />
                <SliderThumb />
            </Slider>
        </FormControl>
    );
};
