import { HStack, VStack, Button, Text, Input, Box, Textarea } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Field } from "@/components/ui/field";
import { CloseButton } from "@/components/ui/close-button";
import { Image } from "@chakra-ui/react";
import {
  FileUploadList,
  FileUploadRoot,
  FileInput,
  FileUploadTrigger,
  FileUploadClearTrigger,
  FileUploadLabel,
} from "@/components/ui/file-upload";
import { InputGroup } from "@/components/ui/input-group";
import DogAnimation from "../../assets/Dog.gif";
import DogResting from "../../assets/DogResting.png";
import { FaCamera } from "react-icons/fa6";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const CreatePet2 = ({ customer, setCreatePetPressed, onPetCreated }) => {
  const [sizeButton, setSizeButton] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [smallImageSrc, setSmallImageSrc] = useState(DogResting);
  const [mediumImageSrc, setMediumImageSrc] = useState(DogResting);
  const [largeImageSrc, setLargeImageSrc] = useState(DogResting);

  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [image, setImage] = useState(null);
  const [notes, setNotes] = useState("");

  const placeholders = [
    { name: "Damon", breed: "Dachshund" },
    { name: "Elena", breed: "Dachshund" },
    { name: "Maximus", breed: "Great Dane" },
    { name: "Hailey", breed: "Rat Terrier" },
    { name: "Davina", breed: "Rottweiler" },
    { name: "Toph", breed: "Cat" },
    { name: "Baby Kitty", breed: "Cat" },
    { name: "Shug", breed: "Bulldog" },
    { name: "Dixie", breed: "Lab" },
    { name: "Star", breed: "Lab" },
    { name: "Mason", breed: "Mutt" },
    { name: "Dayton", breed: "Mutt" },
  ];

  const [randomChoice, setRandomChoice] = useState(
    placeholders[Math.floor(Math.random() * placeholders.length)]
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    console.log(sizeButton);
  }, [sizeButton]);

  const buttonStyles = {
    height: !isMobile ? "100px" : "80px",
    width: !isMobile ? "100px" : "70px",
    minWidth: 0,
    minHeight: 0,
    padding: !isMobile ? ".5rem" : ".25rem",
    flex: 1,
    display: "flex",
    alignItems: "end",
    justifyContent: "center",
  };

  const animationStyles = (heightPercentage) => ({
    height: heightPercentage,
    width: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  const handleClick = (size) => {
    if (sizeButton !== size) {
      if (sizeButton === "small") setSmallImageSrc(DogResting);
      if (sizeButton === "medium") setMediumImageSrc(DogResting);
      if (sizeButton === "large") setLargeImageSrc(DogResting);
    }
    setSizeButton(size);
    if (size === "small") setSmallImageSrc(DogAnimation);
    if (size === "medium") setMediumImageSrc(DogAnimation);
    if (size === "large") setLargeImageSrc(DogAnimation);
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/db/createPet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          breed: breed,
          size: sizeButton,
          photoURL: image,
          ownerID: customer.id,
          notes: notes
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      onPetCreated();
    } catch (error) {
      console.error("Error creating pet:", error);
    }
  };

  return (
    <>
      <MotionBox

        w="100%"
        borderRadius={"lg"}
        alignSelf={"center"}
        justifySelf={"center"}
        p={0}
        mb={2}
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Text fontSize="xl" fontWeight="medium">
          Track a new pet
        </Text>
      </MotionBox>
      <MotionBox
      w={"100%"}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <form onSubmit={handleSubmit}>
          <VStack
            mb={".5rem"}
            gap={".5rem"}
            w={"90%"}
            justify={"center"}
            justifySelf={"center"}
          >
            <Field label="Name" required>
              <Input
                variant={"outline"}
                bg={{ base: "primaryL", _dark: "primary" }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={randomChoice.name}
              />
            </Field>
            <Field label="Breed" required>
              <Input
                variant={"outline"}
                bg={{ base: "primaryL", _dark: "primary" }}
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                placeholder={randomChoice.breed}
              />
            </Field>
            <FileUploadRoot gap="1">
              <FileUploadLabel>Upload picture (optional)</FileUploadLabel>
              <InputGroup
                _hover={{
                  backgroundColor: "primaryL",
                  _dark: { backgroundColor: "primary" },
                  cursor: "pointer",
                }}
                w="full"
                startElement={<FaCamera />}
                overflow="hidden"
                endElement={
                  <FileUploadClearTrigger asChild>
                    <CloseButton
                      me="-1"
                      size="xs"
                      variant="plain"
                      focusVisibleRing="inside"
                      focusRingWidth="2px"
                      pointerEvents="auto"
                      color={{ base: "primary", _dark: "primaryL" }}
                      bg={{ base: "blue.600", _dark: "blue.600" }}
                    />
                  </FileUploadClearTrigger>
                }
              >
                <FileInput onChange={handleFileChange} />
              </InputGroup>
            </FileUploadRoot>
            <Field label="Size" required></Field>
          </VStack>
          <HStack
            gap={0}
            alignItems={"end"}
            justify={"center"}
            bg={{ base: "primaryDarkL", _dark: "primary" }}
            rounded={"lg"}
            mb={".5rem"}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <MotionButton
              size={"2xl"}
              variant={sizeButton === "small" ? "solid" : "ghost"}
              onClick={() => handleClick("small")}
              style={buttonStyles}
              whileTap={{ scale: 0.9 }}
            >
              <Image src={smallImageSrc} style={animationStyles("50%")} />
            </MotionButton>
            <MotionButton
              variant={sizeButton === "medium" ? "solid" : "ghost"}
              onClick={() => handleClick("medium")}
              style={buttonStyles}
              whileTap={{ scale: 0.9 }}
            >
              <Image src={mediumImageSrc} style={animationStyles("65%")} />
            </MotionButton>
            <MotionButton
              size={"2xl"}
              variant={sizeButton === "large" ? "solid" : "ghost"}
              onClick={() => handleClick("large")}
              style={buttonStyles}
              whileTap={{ scale: 0.9 }}
            >
              <Image src={largeImageSrc} style={animationStyles("80%")} />
            </MotionButton>
          </HStack>
          <Field label="Notes" mb={".5rem"}>
              <Box w={"100%"}  bg={{ base: "primaryL", _dark: "primary"}} borderRadius={"sm"}>
                  <Textarea
                    variant={"flushed"}
                    placeholder="Preferred services and cut:&#10;&#10;Behavioral notes, special handling instructions:"
                    minH="5lh" maxW={"100%"} wordWrap={"break-word"}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    p={2}
                  />
              </Box>
          </Field>
          <Button
            type="submit"
            w={"100%"}
            variant={"outline"}
            disabled={name === "" || breed === "" || sizeButton === null}
          >
            Save
          </Button>
        </form>
      </MotionBox>
    </>
  );
};

export default CreatePet2;