import { HStack, VStack, Button, Text, Input } from "@chakra-ui/react";
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

const CreatePetSize = () => {
    const [sizeButton, setSizeButton] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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
        height: !isMobile ? "100px" : "50px",
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

    return (
        <>
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
            Create Pet
        </Text>
        <VStack mb={"1.5rem"} gap={"1.5rem"} w={"90%"} justify={"center"} justifySelf={"center"}>
            <Field label="Name" required>
                <Input variant={"outline"} placeholder="Name"/>
            </Field>
            <Field label="Breed" required>
                <Input variant={"outline"} placeholder="Breed"/>
            </Field>
            <FileUploadRoot gap="1" maxWidth="300px">
                <FileUploadLabel>Upload picture (optional)</FileUploadLabel>
                <InputGroup
                  w="full"
                  startElement={<FaDog />}
                  endElement={
                    <FileUploadClearTrigger asChild>
                      <CloseButton
                        me="-1"
                        size="xs"
                        variant="plain"
                        focusVisibleRing="inside"
                        focusRingWidth="2px"
                        pointerEvents="auto"
                        color="fg.subtle"
                      />
                    </FileUploadClearTrigger>
                  }>
                    <FileInput />
                </InputGroup>
            </FileUploadRoot>
        </VStack>
        <HStack gap={0} alignItems={"end"}
         justify={"center"} bg={{ base: "primaryL", _dark: "primary" }} rounded={"lg"}
         mb={"1.5rem"} >
            <Button
                size={"2xl"}
                variant={sizeButton === "small" ? "solid" : "ghost"}
                onClick={() => setSizeButton("small")}
                style={buttonStyles}
               
            >
                <Image src={DogAnimation} style={animationStyles("50%")} />
            </Button>
            <Button
                variant={sizeButton === "medium" ? "solid" : "ghost"}
                onClick={() => setSizeButton("medium")}
                style={buttonStyles}
            >
                <Image src={DogAnimation} style={animationStyles("65%")} />
            </Button>
            <Button
                size={"2xl"}
                variant={sizeButton === "large" ? "solid" : "ghost"}
                onClick={() => setSizeButton("large")}
                style={buttonStyles}
            >
                <Image src={DogAnimation} style={animationStyles("80%")} />
            </Button>
        </HStack>
        <Button w={"100%"} variant={"solid"}>
            Submit
        </Button>
        </>
    );
};

export default CreatePetSize;