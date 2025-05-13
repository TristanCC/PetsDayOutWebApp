import { HStack, Box, Text } from "@chakra-ui/react";

const PetPills = ({ pets, maxVisible = 3 }) => {
  const catppuccinPastelRainbow = [
    "#89b4fa", "#74c7ec", "#94e2d5", "#a6e3a1", 
    "#f9e2af", "#fab387", "#eba0ac", "#f5c2e7", "#cba6f7"
  ];

  if (!pets || pets.length === 0) {
    return <Text fontStyle="italic" color="gray.500">N/A</Text>;
  }

  return (
    <HStack maxW="20rem" overflow="hidden" wrap="wrap" spacing={2}>
      {pets.slice(0, maxVisible).map((pet, idx) => (
        <Box
          key={pet.id}
          bg={`${catppuccinPastelRainbow[idx % catppuccinPastelRainbow.length]}77`}
          rounded="lg"
          px={2}
          py={1}
          whiteSpace="nowrap"
        >
          <Text fontSize="sm" lineHeight={1}>
            {pet.name}
          </Text>
        </Box>
      ))}
      {pets.length > maxVisible && (
        <Text fontSize="sm" lineHeight={1}>
          +{pets.length - maxVisible} more
        </Text>
      )}
    </HStack>
  );
};

export default PetPills;