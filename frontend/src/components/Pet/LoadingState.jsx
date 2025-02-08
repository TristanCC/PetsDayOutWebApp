import { Box, Text } from "@chakra-ui/react";

const LoadingState = ({ loadingText }) => (
    <Box
        data-state="open"
        _open={{
            animationName: "fade-in, scale-in",
            animationDuration: "300ms",
        }}
        _closed={{
            animationName: "fade-out, scale-out",
            animationDuration: "120ms",
        }}
        bg={{ base: "primarySurfaceL", _dark: "primarySurface" }}
        textAlign={"center"}
        borderRadius={"1rem"}
        p={"1rem"}
        w={"100%"}
        h={"auto"}
        cursor={"radio"}
    >
        <Text>{loadingText}</Text>
    </Box>
);

export default LoadingState;
