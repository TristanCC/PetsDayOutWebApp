import { HStack, VStack, Button, Text, Input, Box, Textarea, IconButton } from "@chakra-ui/react";
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
import { Toaster, toaster } from "@/components/ui/toaster"

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const CreatePet2 = ({ customer, setCreatePetPressed, onPetCreated, petToEdit, setPetToEdit, 
  petList,setPetList, isCreatingCustomer }) => {
  const [sizeButton, setSizeButton] = useState(petToEdit && petToEdit.size ? petToEdit.size.toLowerCase().trim() : null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [imageSources, setImageSources] = useState({
    small: DogResting,
    medium: DogResting,
    large: DogResting,
  });

  const [name, setName] = useState(petToEdit ? petToEdit.name : "");
  const [breed, setBreed] = useState(petToEdit ? petToEdit.breed : "");
  const [image, setImage] = useState(petToEdit ? petToEdit.photoUrl : null);
  const [notes, setNotes] = useState(petToEdit ? petToEdit.notes : "");

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
    setSizeButton(size);
    setImageSources({
      small: size === "small" ? DogAnimation : DogResting,
      medium: size === "medium" ? DogAnimation : DogResting,
      large: size === "large" ? DogAnimation : DogResting,
    });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };


  const deletePetFromList = (key) => {
    return setPetList(petList.filter((pet) => {
      return pet.name !== key;
    }));
  };
  

  const clearPets = () => {
    setName("");
    setBreed("");
    setSizeButton(null);
    setImage(null);
    setNotes("");
    setImageSources({
      small: DogResting,
      medium: DogResting,
      large: DogResting,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    const petData = {
      id: petToEdit && petToEdit.id ? petToEdit.id : undefined,
      name: name,
      breed: breed,
      size: sizeButton,
      photoUrl: image,
      ownerID: customer.id,
      notes: notes,
    };
  
    console.log("Submitting pet data:", petData);
  
    // Update petList immutably
    if(petList) {
      setPetList([...petList, petData]);
    }

    if (!isCreatingCustomer) {
      // Handle non-customer creation logic
      try {
        const endpoint = petToEdit && petToEdit.id ? "/db/updatePet" : "/db/createPet";
        const method = petToEdit && petToEdit.id ? "PUT" : "POST";
  
        const response = await fetch(endpoint, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(petData),
        });
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        onPetCreated();
      } catch (error) {
        console.error("Error creating/updating pet:", error);
      }
    } else {
      // Handle customer creation logic

      toaster.create({
        title: `Pet added to ${customer.firstName}`,
        description: "Pet has been successfully added.",
      });
      clearPets();
      console.log("Updated petList:", petList);
    }
  };

  return (
    <>
      <MotionBox
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
          {petToEdit ? `Edit ${petToEdit.name}` : `Track a new pet`}
        </Text>

      </MotionBox>
      <MotionBox
        justifySelf={"center"}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <form>
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
              <Image src={imageSources.small} style={animationStyles("50%")} />
            </MotionButton>
            <MotionButton
              variant={sizeButton === "medium" ? "solid" : "ghost"}
              onClick={() => handleClick("medium")}
              style={buttonStyles}
              whileTap={{ scale: 0.9 }}
            >
              <Image src={imageSources.medium} style={animationStyles("65%")} />
            </MotionButton>
            <MotionButton
              size={"2xl"}
              variant={sizeButton === "large" ? "solid" : "ghost"}
              onClick={() => handleClick("large")}
              style={buttonStyles}
              whileTap={{ scale: 0.9 }}
            >
              <Image src={imageSources.large} style={animationStyles("80%")} />
            </MotionButton>
          </HStack>
          <Field label="Notes" mb={".5rem"}>
            <Box w={"100%"} bg={{ base: "primaryL", _dark: "primary" }} borderRadius={"sm"}>
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
          {(petList && petList.length > 0) &&(<HStack flexWrap={"wrap"}>
          {petList.map((pet,index) => {
            return (
              <HStack mb={2} key={index}>
                <Text>{pet.name}</Text>
                <IconButton variant={"ghost"} onClick={() => deletePetFromList(pet.name)} w={"1rem"} minW={"1.5rem"} h={"1.5rem"}>x</IconButton>
              </HStack>
            )
          })}
        </HStack>
        )}
          <Button
            onClick={(e) => handleSubmit(e)}
            w={"100%"}
            variant={"outline"}
            disabled={name === "" || breed === "" || sizeButton === null}
          >
            Save
          </Button>
          
          {!isCreatingCustomer && (
            <Button mt={4} w={"100%"} variant={"outline"} onClick={() => { setCreatePetPressed(false); setPetToEdit({}) }}>
              Back
            </Button>
          )}
        </form>
      </MotionBox>
    </>
  );
};

export default CreatePet2;