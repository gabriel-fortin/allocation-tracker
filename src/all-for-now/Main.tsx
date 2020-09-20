import React from "react";
import { CSSReset, Button, ThemeProvider, theme } from "@chakra-ui/core";

export const Main: React.FC = () => {
    return (
        <ThemeProvider>
            <CSSReset />
            Hello!

            <Button variantColor="green">
                test button for verifying css reset
            </Button>
        </ThemeProvider>
    );
};
