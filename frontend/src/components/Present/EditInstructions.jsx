import {useState, useEffect} from 'react'
import {Box, Text, Textarea, Button, HStack, VStack} from "@chakra-ui/react"
import { Toaster, toaster } from "@/components/ui/toaster"

const EditInstructions = ({selectedRecord, setEditInstructionsOpen, selectedColor}) => {

    const [prevText, setPrevText] = useState(selectedRecord.instructions ? selectedRecord.instructions : "")
    const [currText, setCurrText] = useState(prevText ? prevText : "")

    const handleSave = async () => {
        try {
            const response = await fetch(`/db/updateRecord/${selectedRecord.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    instructions: currText
                })
            });
    
            if (!response.ok) {
                throw new Error("Failed to update record");
            }
    
            toaster.create({
                title: "Record Updated!",
                type: "success"
            });
    
            setEditInstructionsOpen(false);
    
        } catch (error) {
            console.error("error saving instructions", error);
        }
    };
    


    return (
        <Box >
        <VStack p={"1rem"} gap={"1rem"} bg={{base: "primaryL", _dark: "primary"}}>
            <Text fontSize={"2xl"} fontWeight={"bold"}>
                {(() => {
                  const [year, month, day] = selectedRecord.date.split("-");
                  return `${month}/${day}/${year}`;
                })()}</Text>
            <Textarea  bg={{base: "primarySurfaceL", _dark: "primarySurface"}} rounded={"lg"} p={"1rem"}  placeholder='No information given.' value={currText} onChange={(e) => setCurrText(e.target.value)} maxH={"90vh"} minH={"20vh"}></Textarea>
            <HStack w={"100%"} justify={"space-between"}>
                <Button onClick={() => setEditInstructionsOpen(false)}>Back</Button>
                <Button disabled={prevText == currText} onClick={() => handleSave()}>Save</Button>
            </HStack>
        </VStack>
        </Box>
    )
}

export default EditInstructions