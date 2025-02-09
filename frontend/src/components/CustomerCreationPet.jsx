import { Button, Input, IconButton, HStack, Box, Text, Textarea, useMediaQuery } from "@chakra-ui/react";

const CustomerCreationPet = () => {
    return (
        <Box 
            flex="1" 
            w="100%" 
            h="100%"
            display="flex" 
            flexDirection="column"
            justifyContent="center" 
            alignItems="stretch"
            p={4}
            bg={{ base: "primarySurfaceL", _dark: "primary" }}
            borderRadius="md"
            boxShadow="md"
        >
            <Text fontSize="lg" fontWeight="bold" mb={4} textAlign="center">
                Add Pet Details
            </Text>
            <Input placeholder="Pet Name" mb={3} />
            <Input placeholder="Breed" mb={3} />
            <Input placeholder="Size" mb={3} />
            <Textarea placeholder="Notes" mb={3} />
            <Button colorScheme="teal" mt={4}>Save Pet</Button>
        </Box>
    );
};

export default CustomerCreationPet;
