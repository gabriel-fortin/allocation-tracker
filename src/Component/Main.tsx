import React from "react";
import { CSSReset, ThemeProvider, Flex, Divider, BoxProps, Box, Modal, ModalOverlay, Spinner } from "@chakra-ui/core";

import { DataTable, PeopleArea } from "Component";
import { AppStoreProvider, useAppStore } from "AppStore";


export const Main: React.FC = () => {
    return (
        <ThemeProvider>
            <CSSReset />
            <AppStoreProvider>
                <LoadingIndicator />
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
            <PeopleArea />
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

const LoadingIndicator: React.FC = () => {
    const { isLoading } = useAppStore();

    return (
        <Modal isOpen={isLoading}>
            <Spinner size="xl" marginX="auto" display="block" />
            <ModalOverlay />
        </Modal>
    );
};
