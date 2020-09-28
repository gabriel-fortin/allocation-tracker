import React from "react";
import { CSSReset, ThemeProvider, Flex, Divider, Text, BoxProps, Box } from "@chakra-ui/core";

import { DataTable } from "Component";
import { AppStoreProvider } from "AppStore";


export const Main: React.FC = () => {
    return (
        <ThemeProvider>
            <CSSReset />
            <AppStoreProvider>
                <Content />
            </AppStoreProvider>
        </ThemeProvider>
    );
};

const Content: React.FC = () => (
    <Flex
        flexDirection="column"
    >
        <Header
            padding={6}
        />
        <Divider
            margin={0}
        />
        <Body
            padding={6}
        />
    </Flex>
);

const Header: React.FC<BoxProps> = (boxProps) => {

    return (
        <Flex {...boxProps}>
            <Text>
                people
            </Text>
        </Flex>
    );
};

const Body: React.FC<BoxProps> = (boxProps) => {
    return (
        <Box {...boxProps}>
            <DataTable />
        </Box>
    );
};

