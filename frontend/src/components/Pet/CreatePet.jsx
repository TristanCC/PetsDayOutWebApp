import { HStack, VStack, Button, Text, Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FaDog } from "react-icons/fa6";
import { Field } from "@/components/ui/field";

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
        padding: !isMobile ? "1rem" : ".5rem",
        flex: 1,
        display: "flex",
        alignItems: "end",
        justifyContent: "center"
    };

    const iconStyles = (heightPercentage) => ({
        height: heightPercentage,
        width: "100%",
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
                <FaDog style={iconStyles("40%")} />
            </Button>
            <Button
                variant={sizeButton === "medium" ? "solid" : "ghost"}
                onClick={() => setSizeButton("medium")}
                style={buttonStyles}
            >
                <FaDog style={iconStyles("60%")} />
            </Button>
            <Button
                size={"2xl"}
                variant={sizeButton === "large" ? "solid" : "ghost"}
                onClick={() => setSizeButton("large")}
                style={buttonStyles}
            >
                <FaDog style={iconStyles("80%")} />
            </Button>
        </HStack>
        <Button w={"100%"} variant={"solid"}>
            Submit
        </Button>
        </>
    );
};

export default CreatePetSize;