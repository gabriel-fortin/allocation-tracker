import { Button } from "@chakra-ui/core";
import React from "react";


export const RecordAdder: React.FC = () => {
    return (
        <Button
            leftIcon="add"
            variantColor="pink"
            variant="solid"
        >
            Add record
        </Button>
    );
};
