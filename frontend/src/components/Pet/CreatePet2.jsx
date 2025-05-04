import { HStack, VStack, Button, Text, Input, Box, Textarea, IconButton } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
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
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";

import { v4 as uuidv4 } from 'uuid';

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
  const [sex, setSex] = useState(petToEdit ? petToEdit.sex : "")
  const [breed, setBreed] = useState(petToEdit ? petToEdit.breed : "");
  const [image, setImage] = useState(petToEdit ? petToEdit.photoUrl : null);
  const [imageFile, setImageFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null);

  const [notes, setNotes] = useState(petToEdit ? petToEdit.notes : "");

  const [tempImageId, setTempImageId] = useState("")

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

  const fileInputRef = useRef(null);

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
  
  const handleClickSex = (sex) => {
    setSex(sex)
  }

  function handleFileChange(e) {
    const file = e.target.files[0]; 
    console.log(file);
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  const deletePetFromList = (key) => {
    return setPetList(petList.filter((pet) => {
      return pet.name !== key;
    }));
  };
  

  const clearPets = () => {
    setName("");
    setSex("")
    setBreed("");
    setSizeButton(null);
    setImage(null);
    setNotes("");
    setImageSources({
      small: DogResting,
      medium: DogResting,
      large: DogResting,
    });
    setImage("")
    setImageFile(null)
  };

  
  async function uploadToS3(file) {
    try {
      const tempImageid = uuidv4()
      setTempImageId(tempImageid)

      var filename = undefined
      if(petToEdit) {
        filename = `${petToEdit.id}/profile.jpg`
      }
      else {
        filename = `temp-uploads/${customer.id}/${tempImageid}.jpg`;
      }

      // 1. Get presigned URL from your backend
      const response = await fetch(`/s3/s3-url?filename=${encodeURIComponent(filename)}&contentType=${encodeURIComponent(file.type)}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to get S3 URL: ${response.status} ${errorText}`);
      }
  
      const { url } = await response.json();
  
      // 2. Upload the file directly to S3 using the presigned URL
      const uploadResponse = await fetch(url, {
        method: 'PUT', // MUST match the signed method
        headers: {
          'Content-Type': file.type,
          // Remove 'x-amz-acl' header as it's already in the signed URL
        },
        body: file
      });
  
      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        throw new Error(`S3 upload failed with status ${uploadResponse.status}: ${errorText}`);
      }

      else {
        toaster.create({
          title: "Image upload successful!",
          type: "success"
        })
      }
  
      return url.split('?')[0];
    } catch (error) {
      console.error('S3 upload error:', error);
      throw error;
    }
  }
  
  async function handleSubmit(e) {
    e.preventDefault();
  
    // 1) If the user selected a new file, upload it and get back the S3 URL
    let photoUrl = image;  // start with existing URL (if editing)
    if (imageFile) {
      try {
        photoUrl = await uploadToS3(imageFile);
      } catch (err) {
        console.error("Image upload failed:", err);
        toaster.create({
          title: `Image upload failed`,
          description: err.message || "Could not upload image",
          type: "error",
        });
        return;  // stop submission on failure
      }
    }
    console.log({ imageFile, image, petToEdit });

  
    // 2) Build your petData payload, using the new photoUrl
    const petData = {
      id: petToEdit?.id,
      name,
      sex,
      breed,
      size: sizeButton,
      photoUrl,
      ownerID: customer.id,
      notes,
      tempImageId: imageFile ? tempImageId : undefined
    };

  
    console.log("Submitting pet data:", petData);
  
    // 3) Optimistically update UI
    if (petList) setPetList([...petList, petData]);
  
    // 4) Send to your DB endpoint
    if (!isCreatingCustomer) {
      try {
        const endpoint = petToEdit?.id ? "/db/updatePet" : "/db/createPet";
        const method = petToEdit?.id ? "PUT" : "POST";
        const res = await fetch(endpoint, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(petData),
        });
        if (!res.ok) throw new Error("Network response was not ok");
        onPetCreated();
      } catch (error) {
        console.error("Error creating/updating pet:", error);
        // Optionally show error to user
        toaster.create({
          title: "Error saving pet",
          description: error.message,
          type: "error"
        });
      }
    } else {
      toaster.create({
        title: `Pet added to ${customer.firstName}`,
        description: "Pet has been successfully added.",
      });
      clearPets();
    }
  }
  

  return (
    <>
      <MotionBox
        borderRadius={"lg"}
        alignSelf={"center"}
        justifySelf={"center"}
        p={0}
        mb={2}
        w={"100%"}
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        
      >

      </MotionBox>
      <MotionBox
      w={"90%"}

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
            w={"100%"}
            justify={"center"}
            justifySelf={"center"}
            
          >
            <HStack flex={1}>

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
            </HStack>
            <HStack w={"100%"}>
              <Field label="Picture">
              <Box w={"100%"}>
                <Box display={"flex"} justifyContent={"space-between"} w={"100%"} bg={{_dark: "primary", base: "primaryL"}} rounded={"md"}>
                  <InputGroup
                  w={"100%"}
                    startElement={<FaCamera />}
                    endElement={
                      previewSrc && (
                        <CloseButton
                          zIndex={99999}
              
                          me="-1"
                          size="xs"
                          variant="solid"
                          focusVisibleRing="inside"
                          focusRingWidth="2px"
                          pointerEvents="auto"
                          onClick={(e) => {
                            e.stopPropagation();
                            setImageFile(null);
                            setPreviewSrc(null);
                          }}
                        />
                      )
                    }
                  >
                    <Text flex ml={"2rem"} px={2} py={3} noOfLines={1} overflow={"clip"} textOverflow={"ellipsis"} textWrap={"nowrap"} w={"60%"}>
                      {imageFile ? imageFile.name : "Select an image"}
                    </Text>
                  </InputGroup>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/jpeg"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '80%',
                      height: '100%',
                      opacity: 0,
                      cursor: 'pointer',
                      overflow: 'hidden',
                      textWrap: "nowrap"
                    }}
                  />
                </Box>
              </Box>
            </Field>
            <Field label="Sex" required flex={1}>
                <HStack>
                  <IconButton onClick={() => handleClickSex("female")} variant={sex == "female" ? "solid" : "outline"}><BsGenderFemale/></IconButton>
                  <IconButton onClick={() => handleClickSex("male")} variant={sex == "male" ? "solid" : "outline"}><BsGenderMale/></IconButton>
                </HStack>
              </Field>
            </HStack>
            <Field label="Size" required></Field>
          </VStack>
          <HStack
            gap={0}
            alignItems={"end"}
            justify={"center"}
            bg={{ base: "primaryDarkL", _dark: "primary" }}
            rounded={"lg"}
            w={"100%"}
            justifySelf={"center"}
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
            disabled={name === "" || breed === "" || sizeButton === null || sex === ""}
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