import {useState, useEffect} from 'react'
import {Box, Text, Textarea, Button, HStack, VStack} from "@chakra-ui/react"
import { Toaster, toaster } from "@/components/ui/toaster"

const EditInstructions = ({selectedRecord, setEditInstructionsOpen, selectedColor}) => {
    
    const [prevText, setPrevText] = useState(selectedRecord.instructions ? selectedRecord.instructions : "")
    const [currText, setCurrText] = useState(prevText ? prevText : "")
    const [isSaving, setIsSaving] = useState(false);
  
    const handleSave = async () => {
      setIsSaving(true);
      try {
        const response = await fetch(`/db/updateRecord/${selectedRecord.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ instructions: currText }),
        });
  
        if (!response.ok) {
          throw new Error("Failed to update record");
        }
  
        toaster.create({
          title: "Record updated.",
          type: "success",
        });
  
        setEditInstructionsOpen(false);
      } catch (error) {
        console.error("Error saving instructions:", error);
        toaster.create({
          title: "Error",
          description: "Failed to save instructions. Please try again.",
          type: "error",
        });
      } finally {
        setIsSaving(false);
      }
    };
  
    const formattedDate = (() => {
      const [year, month, day] = selectedRecord.date.split("-");
      return `${month}/${day}/${year}`;
    })();
  
    return (
      <Box p={0}>
        <VStack
          
          gap={"1rem"}
          bg={{ base: "primaryMidpointL", _dark: "primaryMidpoint" }}
          borderRadius="lg"
          boxShadow="md"

          p={4}
        >
          <Text fontSize="2xl" fontWeight="bold">
            {formattedDate}
          </Text>
  
          <Textarea
                              wordBreak="break-word"  // Ensures long words break
                              whiteSpace="normal"  // Allows text to wrap
                              overflowWrap="break-word"  // Alternative to wordBreak
            bg={{ base: "primarySurfaceL", _dark: "primarySurface" }}
            rounded="lg"
            p={4}
            placeholder="No information given. Record services requested, price paid, etc."
            value={currText}
            onChange={(e) => setCurrText(e.target.value)}
            maxH="90vh"
            minH="20vh"
          />
  
          <HStack w="full" spacing={3}>
            <Button flex={1} variant="ghost" onClick={() => setEditInstructionsOpen(false)}>
              Back
            </Button>
            <Button
              colorScheme="blue"
              flex={1}
              onClick={handleSave}
              isDisabled={currText === prevText}
              isLoading={isSaving}
              loadingText="Saving"
            >
              Save
            </Button>
          </HStack>
        </VStack>
      </Box>
    );
  };
  
  export default EditInstructions;