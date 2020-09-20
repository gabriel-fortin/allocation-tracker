import React from "react";
import { CSSReset, ThemeProvider, Flex, Divider, Text, BoxProps, Grid } from "@chakra-ui/core";

export const Main: React.FC = () => {
    return (
        <ThemeProvider>
            <CSSReset />
            <Content />
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
        <Flex
            {...boxProps}
        >
            <Text
                // padding={2}
            >
                people
            </Text>

        </Flex>
    );
};

const Body: React.FC<BoxProps> = (boxProps) => {

    return (
        <Grid
            {...boxProps}
        >
            body
        </Grid>
    );
};
