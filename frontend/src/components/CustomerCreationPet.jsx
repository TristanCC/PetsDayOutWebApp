import { Button, Input, HStack, Box, Text, Textarea } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";

const createEditableField = (label, value, setValue, required) => (
  <Field label={label} required={required} mb={".5rem"}>
    <HStack>
      <Input
        variant={"outline"}
        size={"lg"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={label}
        backgroundColor={{ base: "primaryL", _dark: "primary" }}
      />
    </HStack>
  </Field>
);


const CustomerCreationPet = ({ petName, setPetName, petBreed, setPetBreed, petSize, setPetSize, petNotes, setPetNotes, petList }) => {
  return (
    <Box>
        {}
        <Box
          flex="1"
          w="100%"
          h="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="stretch"
          bg={{ base: "transparent", _dark: "transparent" }}
          borderRadius="lg"
        >
          <Text fontSize="lg" fontWeight="medium" mb={4} textAlign="center">
            Add Pet Details
          </Text>
          {createEditableField("Pet Name", petName, setPetName, true)}
          {createEditableField("Breed", petBreed, setPetBreed, true)}
          <Field label={"Size"} required={true}>
            <HStack mb={".5rem"} w={"full"}>
              <Button variant={petSize === "small" ? "solid" : "outline"} value={"small"} onClick={() => setPetSize("small")} flex={1}>sm</Button>
              <Button variant={petSize === "medium" ? "solid" : "outline"} value={"medium"} onClick={() => setPetSize("medium")} flex={1}>md</Button>
              <Button variant={petSize === "large" ? "solid" : "outline"} value={"large"} onClick={() => setPetSize("large")} flex={1}>lg</Button>
            </HStack>
          </Field>
          <Field label="Notes">
              <Box w={"100%"}  bg={{ base: "primaryL", _dark: "primary"}} borderRadius={"sm"}>
                  <Textarea
                    variant={"flushed"}
                    placeholder="Preferred services and cut: &#10;&#10;Behavioral notes, special handling instructions:"
                    minH="5lh" maxW={"100%"} wordWrap={"break-word"}
                    value={petNotes}
                    onChange={(e) => setPetNotes(e.target.value)}
                    p={2}
                  />
              </Box>
          </Field>
          <Button variant={"outline"} mt={4} disabled={!petName || !petBreed || !petSize}>Save Pet</Button>
        </Box>
    </Box>
  );
};

export default CustomerCreationPet;
