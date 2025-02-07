import { HStack, VStack, Button, Text, Input, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FaDog } from "react-icons/fa6";
import { Field } from "@/components/ui/field";
import { CloseButton } from "@/components/ui/close-button"
import { Image } from "@chakra-ui/react"
import {
    FileUploadList,
    FileUploadRoot,
    FileInput,
    FileUploadTrigger,
    FileUploadClearTrigger,
    FileUploadLabel,
  } from "@/components/ui/file-upload"
import { InputGroup } from "@/components/ui/input-group"
import DogAnimation from "../../assets/Dog.gif"
import DogResting from "../../assets/DogResting.png"
import { FaCamera } from "react-icons/fa6";

const CreatePetSize = ({ customer, onPetCreated }) => {
    const [sizeButton, setSizeButton] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [smallImageSrc, setSmallImageSrc] = useState(DogResting);
    const [mediumImageSrc, setMediumImageSrc] = useState(DogResting);
    const [largeImageSrc, setLargeImageSrc] = useState(DogResting);

    const [name, setName] = useState("")
    const [breed, setBreed] = useState("")
    const [image, setImage] = useState(null)

    const placeholders = [
        {name: "Damon", breed: "Dachshund"},
        {name: "Elena", breed: "Dachshund"},
        {name: "Maximus", breed: "Great Dane"},
        {name: "Hailey", breed: "Rat Terrier"},
        {name: "Davina", breed: "Rottweiler"},
        {name: "Toph", breed: "Cat"},
        {name: "Baby Kitty", breed: "Cat"},
        {name: "Shug", breed: "Bulldog"},
        {name: "Dixie", breed: "Lab"},
        {name: "Star", breed: "Lab"},
        {name: "Mason", breed: "Mutt"},
        {name: "Dayton", breed: "Mutt"},
    ]

    const [randomChoice, setRandomChoice] = useState(placeholders[Math.floor(Math.random() * placeholders.length)])
    

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
        padding: !isMobile ? "1rem" : ".25rem",
        flex: 1,
        display: "flex",
        alignItems: "end",
        justifyContent: "center"
    };

    const animationStyles = (heightPercentage) => ({
        height: heightPercentage,
        width: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
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
        e.preventDefault()
        try {
            const response = await fetch("/db/createPet", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    breed: breed,
                    size: sizeButton,
                    photoURL: image,
                    ownerID: customer.id
                })
            })
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            onPetCreated();
        } catch (error) {
            console.error("Error creating pet:", error);
        }
    }

    return (
        <>
        <Box bg={{ base: "primaryL", _dark: "primary" }} w="100%" borderRadius={"lg"}
         alignSelf={"center"} justifySelf={"center"} p={4} mb={6}
         >
            <Text fontSize="2xl" fontWeight="bold" color={{ base: "primary", _dark: "primaryL" }}>
                Track {customer.firstName}{customer.firstName[customer.firstName.length-1] !== "s" ? "'s" : "'"} Pet
            </Text>
        </Box>
        <form onSubmit={handleSubmit}>
            <VStack mb={"1rem"} gap={"1.5rem"} w={"90%"} justify={"center"} justifySelf={"center"}>
                <Field label="Name" required>
                    <Input variant={"outline"} bg={{ base: "primaryL", _dark: "primary" }} value={name} onChange={(e) => setName(e.target.value)} 
                    placeholder={randomChoice.name}/>
                </Field>
                <Field label="Breed" required>
                    <Input variant={"outline"} bg={{ base: "primaryL", _dark: "primary" }} value={breed} onChange={(e) => setBreed(e.target.value)} 
                    placeholder={randomChoice.breed}/>
                </Field>
               
                    <FileUploadRoot gap="1">
                        <FileUploadLabel>Upload picture (optional)</FileUploadLabel>
                        <InputGroup
                          _hover= {{backgroundColor: "primaryL", _dark: {backgroundColor: "primary"}, cursor: "pointer"}}
                          w="full"
                          startElement={<FaCamera />}
                          overflow="hidden"
                          color={{ base: "primary", _dark: "primaryDarkL" }}
                          endElement={
                            <FileUploadClearTrigger asChild>
                              <CloseButton
                                me="-1"
                                size="xs"
                                variant="plain"
                                focusVisibleRing="inside"
                                focusRingWidth="2px"
                                pointerEvents="auto"
                                color="white"
                                bg={{ base: "blue.600", _dark: "blue.600" }}
                              />
                            </FileUploadClearTrigger>
                          }>
                            <FileInput onChange={handleFileChange} />
                        </InputGroup>
                    </FileUploadRoot>
             
                <Field label="Size" required>
                    
                </Field>
            </VStack>
            <HStack gap={0} alignItems={"end"}
             justify={"center"} bg={{ base: "primaryDarkL", _dark: "primary" }} rounded={"lg"}
             mb={"1.5rem"} >
                <Button
                    size={"2xl"}
                    variant={sizeButton === "small" ? "solid" : "ghost"}
                    onClick={() => handleClick("small")}
                    style={buttonStyles}
                >
                    <Image src={smallImageSrc} style={animationStyles("50%")} />
                </Button>
                <Button
                    variant={sizeButton === "medium" ? "solid" : "ghost"}
                    onClick={() => handleClick("medium")}
                    style={buttonStyles}
                >
                    <Image src={mediumImageSrc} style={animationStyles("65%")} />
                </Button>
                <Button
                    size={"2xl"}
                    variant={sizeButton === "large" ? "solid" : "ghost"}
                    onClick={() => handleClick("large")}
                    style={buttonStyles}
                >
                    <Image src={largeImageSrc} style={animationStyles("80%")} />
                </Button>
            </HStack>
            <Button type="submit" w={"100%"} variant={"solid"}
            disabled={name === "" || breed === "" || sizeButton === null}>
                Submit
            </Button>
        </form>
        </>
    );
};

export default CreatePetSize;