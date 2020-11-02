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
    // data will contain a list of people with values between 0 and 1

    const appStore = useAppStore();
    const personsIds = appStore.persons.map(p => p.iid);

    const recordFor = (personId: Id) => {
        const matchingRecords = appStore.records
            .filter(r =>
                r.projectId === projectId &&
                r.date === day &&
                r.personId === personId
            );

        if (matchingRecords.length !== 1)
            throw new Error(`expected single matching record`);

        return matchingRecords[0];
    };

    const personFor = (personId: Id) => {
        const matchingPersons = appStore.persons
            .filter(p => p.iid === personId);

        if (matchingPersons.length !== 1)
            throw new Error(`expected single matching person`);

        return matchingPersons[0];
    };

    const bgColorFor: (i: number) => string = (i) => [
        "teal.600", "yellow.400", "blue.300", "red.700", "purple.300",
        "pink.700", "gray.600"
    ][i];

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
    record: Record
    person: Person
}

const SubCellForRecord: React.FC<SubCellForRecord> = ({ record, person }) => {
    const border = (record.workAmount > 0)
        && `solid 3px ${person.color}`
        || `0`;

    return (
        <Box
            width="1.1em"
            height="1.65em"
            textAlign="center"
            // a 'Box' overrides right margin to 0.5rem
            // so we compensate with other margins/paddings
            marginLeft={-2}
            // borderTop={border}
            // borderBottom={border}

            borderTop="solid 3px"
            borderBottom="solid 3px"
            borderColor={record.workAmount>0 && person.color || "lightgray"}
            borderRadius="20%"
            opacity={record.workAmount*0.9 + 0.1}
        >
            <Text>
                {person.initial}
            </Text>
        </Box>
    );
};
