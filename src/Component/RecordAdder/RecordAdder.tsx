import React, { useState } from "react";
import { FormControl, FormLabel, Input, Select, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Stack } from "@chakra-ui/core";

import { ButtonWithLinkedModal, ModalButtonAction } from "Component";
import { Id, Record } from "Model";

import { useNewRecordFormData } from "./useNewRecordFormData";


// our dates should not have time in them
const defaultDate = () => new Date(new Date().toISOString().substring(0, 10));

export const RecordAdder: React.FC = () => {
    const { addRecord } = useNewRecordFormData();
    const [record, setRecord] = useState(new Record(-1, -1, defaultDate(), 1));
    
    const userAcceptsNewRecord: ModalButtonAction =
        (closeModal) => {
            addRecord(record);
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
            <NewRecordForm
                record={record}
                updateRecord={setRecord}
            />
        </ButtonWithLinkedModal>
    );
};

interface ModalProps {
    record: Record;
    updateRecord: (record: Record) => void;
}

const NewRecordForm: React.FC<ModalProps> = ({ record, updateRecord }) => {
    const { persons, projects } = useNewRecordFormData();
    
    const personChange: (e: React.ChangeEvent<HTMLSelectElement>) => void = (e) => {
        const personId: Id = parseInt(e.currentTarget.value);
        const newRecord = {...record, personId};
        updateRecord(newRecord);
    };

    const projectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void = (e) => {
        const projectId: Id = parseInt(e.currentTarget.value);
        updateRecord({...record, projectId});
    };

    const dateChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
        const date: Date = new Date(e.currentTarget.value);
        updateRecord({...record, date});
    };

    const workAmountChange: (amount: number) => void = (workAmount) => {
        updateRecord({...record, workAmount});
    };

    return (
        <FormControl>
            <Stack spacing={3}>

                <FormLabel>
                    Person?
                    <Select
                        value={record.personId}
                        onChange={personChange}
                        placeholder="select person"
                        borderColor="pink.100"
                    >
                        {persons.map(person => (
                            <option key={person.iid} value={person.iid}>{person.firstName}</option>
                        ))}
                    </Select>
                </FormLabel>

                <FormLabel>
                    Project?
                    <Select
                        value={record.projectId}
                        onChange={projectChange}
                        placeholder="select project"
                        borderColor="pink.100"
                    >
                        {projects.map(project => (
                            <option key={project.iid} value={project.iid}>{project.name}</option>
                        ))}
                    </Select>
                </FormLabel>

                <FormLabel>
                    When?
                    <Input
                        value={record.date.toISOString().substring(0, 10)}
                        onChange={dateChange}
                        type="date"
                        borderColor="pink.100"
                    />
                </FormLabel>

                <FormLabel>
                    Full day?
                    <Slider
                        value={record.workAmount}
                        onChange={workAmountChange}
                        defaultValue={1}
                        min={0}
                        max={1}
                        step={0.01}
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
