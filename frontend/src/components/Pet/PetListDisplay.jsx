import { useState } from "react";
import { Box, Button, IconButton, Text, HStack, Textarea, VStack, Card, Image } from "@chakra-ui/react";
import { LuCircleX } from "react-icons/lu";
import CreatePet from "./CreatePet2";
import { Separator } from "@chakra-ui/react";

const PetListDisplay = ({ pets, createPetPressed, setCreatePetPressed, closePetsPanel, customer, handleBack, reloadPets }) => {
  return (
    <Box
      bg={{ base: "primarySurfaceL", _dark: "primaryMidpoint" }}
      borderRadius={"1rem"}
      p={"2rem"}
      w={"70vw"}
      minW={"350px"}
      maxW={"1200px"}
      maxH={"90vh"}
      overflowY={"auto"}
      cursor={"radio"}
      display={"flex"}
      flexDir={"column"}
      justifyItems={"center"}
      alignItems={"start"}
    >
      <IconButton
        position={"absolute"}
        top={0}
        right={0}
        aria-label="close update customer"
        size={"lg"}
        variant={"ghost"}
        borderRadius={"1rem"}
        onClick={() => closePetsPanel()}
        zIndex={100000}
      >
        <LuCircleX />
      </IconButton>
      <Box className="customerInfoHeader" flex={1} w="100%">
        <Box display={"flex"} flexDir={"column"} gap={"1rem"}
          justifyItems={"start"} alignItems={"start"}
          w={"100%"}
          data-state="open"
          _open={{
            animationName: "fade-in, scale-in",
            animationDuration: "300ms",
          }}
          _closed={{
            animationName: "fade-out, scale-out",
            animationDuration: "120ms",
          }}
        >
          <Text
            fontSize={"2xl"}
            fontWeight={"medium"}
            position={"relative"}
          >
            {customer.firstName} {customer.lastName}
            {customer.lastName.charAt(customer.lastName.length - 1) === "s"
              ? "'"
              : "'s"}{" "}
            Pets
          </Text>
          <Separator />
          {!createPetPressed ? (
            <>
              <Box w={"100%"} p={2} bg={{ base: "primarySurfaceL", _dark: "transparent" }} rounded={"lg"}>
                <VStack spacing={4} w="100%" flexDir={"row"} flexWrap={"wrap"} justify={"center"}>
                  {pets.map((item, index) => (
                    <Card.Root key={index} w="350px" variant="outline">
                      <Card.Body>
                        <VStack>
                            <Text fontSize="lg" fontWeight="bold">{item.name} ({item.breed})</Text>
                            <Text>Size: {item.size}</Text>
                            <Textarea
                              readOnly
                              autoresize
                              placeholder="Preferred services and cut:&#10;Behavioral notes, special handling instructions:&#10;Payment history:"
                              minH={"8lh"}
                              maxH={"15lh"}
                              value={item.notes}
                            />
                            <Button w={"100%"} variant={"outline"} mt={2}>Edit Pet</Button>
                        </VStack>
                      </Card.Body>
                    </Card.Root>
                  ))}
                </VStack>
              </Box>
              <HStack justify={"space-between"} w="100%">
                <Button variant={"surface"}>Link Customers</Button>
                <Button onClick={() => setCreatePetPressed(true)} variant={"surface"}>Add Pet</Button>
              </HStack>
            </>
          ) : (
            <CreatePet customer={customer} setCreatePetPressed={handleBack} onPetCreated={() => { setCreatePetPressed(false); reloadPets(); }} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PetListDisplay;
