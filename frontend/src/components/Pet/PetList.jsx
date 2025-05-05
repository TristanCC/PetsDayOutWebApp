import { useState, useEffect } from "react";
import { Box, HStack } from "@chakra-ui/react";
import LoadingState from "./LoadingState";
import EmptyStateComponent from "./EmptyStateComponent";
import PetListDisplay from "./PetListDisplay";
import { useCustomers } from "../context/CustomerContext";
import { Spinner } from "@chakra-ui/react";

const PetList = ({ customer, preferredColors, handleEditPet, closePetsPanel }) => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createPetPressed, setCreatePetPressed] = useState(false);
  const [showEmptyState, setShowEmptyState] = useState(true);
  const [didLinkCustomer, setDidLinkCustomer] = useState(false);

  //const { fetchGroupID, groupID } = useCustomers(); // Use fetchGroupID from context
//
  //useEffect(() => {
  //  if (customer?.id && !customer.groupID) {
  //    fetchGroupID(customer.id);
  //  }
  //}, [customer, fetchGroupID]);
  

  const reloadPets = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/db/getPets/${customer.id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPets(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching pets:', error);
      setPets([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/db/getPets/${customer.id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPets(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pets:', error);
        setPets([]);
        setLoading(false);
      }
    };

    if (customer.id) {
      fetchPets();
    }
  }, [customer]);

  const handleBack = () => {
    setCreatePetPressed(false);
    setShowEmptyState(pets.length === 0);
  };

  return (
    <Box className="emptyState">
      <Box
        className="transparentBackground"
        pos={"fixed"}
        w={"100svw"}
        h={"100svh"}
        top={"0px"}
        bottom={"0px"}
        backgroundColor={"rgba(18, 18, 18, 0.5)"}
        backdropFilter="blur(1px)"
        zIndex={-2}
        pointerEvents={"none"}
        overflowY={"scroll"}
      ></Box>
      {loading ? (
        <HStack justifyContent={"center"} justifyItems={"center"} p={"1rem"} bg={{ base: "primarySurfaceL", _dark: "primaryMidpoint" }} rounded={"md"}>
            <Spinner/>
            <LoadingState loadingText={"Fetching pets..."} />
        </HStack>
       
      ) : pets.length === 0 && showEmptyState ? (
        <EmptyStateComponent
          createPetPressed={createPetPressed}
          setCreatePetPressed={setCreatePetPressed}
          setShowEmptyState={setShowEmptyState}
          closePetsPanel={closePetsPanel}
          customer={customer}
          handleBack={handleBack}
          reloadPets={reloadPets}
          preferredColors={preferredColors}
          didLinkCustomer={didLinkCustomer}
          setDidLinkCustomer={setDidLinkCustomer}
        />
      ) : (
        <PetListDisplay
          pets={pets}
          setPets={setPets}
          createPetPressed={createPetPressed}
          setCreatePetPressed={setCreatePetPressed}
          closePetsPanel={closePetsPanel}
          customer={customer}
          handleBack={handleBack}
          reloadPets={reloadPets}
          preferredColors={preferredColors}
          didLinkCustomer={didLinkCustomer}
          setDidLinkCustomer={setDidLinkCustomer}
        />
      )}
    </Box>
  );
};

export default PetList;