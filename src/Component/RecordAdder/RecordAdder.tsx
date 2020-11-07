import React from "react";
import { FormControl, FormLabel, Input, Select, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Stack } from "@chakra-ui/core";

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
        <FormControl>
            <Stack spacing={3}>

                <FormLabel>
                    Person?
                    <Select placeholder="select person" borderColor="pink.100" >
                        {data.persons.map(person => (
                            <option key={person.iid} value={person.iid}>{person.firstName}</option>
                        ))}
                    </Select>
                </FormLabel>

                <FormLabel>
                    Project?
                    <Select placeholder="select project" borderColor="pink.100">
                        {data.projects.map(project => (
                            <option key={project.iid} value={project.iid}>{project.name}</option>
                        ))}
                    </Select>
                </FormLabel>

                <FormLabel>
                    When?
                    <Input
                        borderColor="pink.100"
                        type="date"
                        defaultValue={new Date().toISOString().substring(0, 10)}
                    />
                </FormLabel>

                <FormLabel>
                    Full day?
                    <Slider
                        min={0}
                        max={1}
                        step={0.01}
                        defaultValue={1}
                    >
                        <SliderTrack />
                        <SliderFilledTrack backgroundColor="pink.400" />
                        <SliderThumb backgroundColor="pink.800" />
                    </Slider>
                </FormLabel>

            </Stack>
        </FormControl>
    );
};
