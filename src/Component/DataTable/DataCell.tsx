import React from "react";
import { Box, BoxProps, Stack, Text } from "@chakra-ui/core";

import { Id, Person, Record } from "Model";
import { useAppStore } from "AppStore";


type DataCellProps = 
    {
        projectId: Id
        day: Date
    }
    & BoxProps


export const DataCell: React.FC<DataCellProps> = ({ projectId, day, ...boxProps }) => {
    const appStore = useAppStore();
    const personsIds = appStore.persons.map(p => p.iid);

    const recordFor = (personId: Id) => {
        const matchingRecords = appStore.records
            .filter(r =>
                r.projectId === projectId &&
                r.date === day &&
                r.personId === personId
            );

        if (matchingRecords.length > 1)
            throw new Error(`expected at most one matching record; found ${matchingRecords.length}`
                + ` (project id: '${projectId}'; person id: '${personId}'; day: '${day}')`);

        return matchingRecords[0]; // undefined, if no record found
    };

    const personFor = (personId: Id) => {
        const matchingPersons = appStore.persons
            .filter(p => p.iid === personId);

        if (matchingPersons.length !== 1)
            throw new Error(`expected single matching person; found ${matchingPersons.length}`
                + ` (person id: '${personId}')`);

        return matchingPersons[0];
    };

    return (
        <Stack {...boxProps}
            isInline
            height="100%"
            // a 'Box' overrides right margin to 0.5rem
            // so we compensate with other margins/paddings
            paddingLeft={4}
            paddingRight={2}
            fontSize="0.8em"
            fontWeight="bold"
        >
            {personsIds.map((personId, i) => (
                <SubCellForRecord
                    key={i}
                    record={recordFor(personId)}
                    person={personFor(personId)}
                />
            ))}
        </Stack>
    );
};

interface SubCellForRecord {
    record?: Record
    person: Person
}

const SubCellForRecord: React.FC<SubCellForRecord> = ({ record, person }) => {

    return (
        <Box
            width="1.1em"
            height="1.65em"
            textAlign="center"

            borderTop="solid 3px"
            borderBottom="solid 3px"
            borderColor={record && record.workAmount>0 && person.color || "lightgray"}
            borderRadius="20%"
            opacity={record && record.workAmount*0.9 + 0.1 || 0.1}
        >
            <Text>
                {person.initial}
            </Text>
        </Box>
    );
};
