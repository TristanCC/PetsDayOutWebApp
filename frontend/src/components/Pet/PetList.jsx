import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import LoadingState from "./LoadingState";
import EmptyStateComponent from "./EmptyStateComponent";
import PetListDisplay from "./PetListDisplay";
import { useCustomers } from "../context/CustomerContext";

const PetList = ({ customer, preferredColors, handleEditPet, closePetsPanel }) => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createPetPressed, setCreatePetPressed] = useState(false);
  const [showEmptyState, setShowEmptyState] = useState(true);
  const [didLinkCustomer, setDidLinkCustomer] = useState(false);

  const { fetchGroupID, groupID } = useCustomers(); // Use fetchGroupID from context

  // Fetch the updated groupID when the component mounts or the customer changes
  useEffect(() => {
    if (customer?.id) {
        fetchGroupID(customer.id); // Fetch the latest groupID
        customer.groupID = groupID
    }
  }, [customer, fetchGroupID]);

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
        w={"100vw"}
        h={"100vh"}
        top={"0px"}
        bottom={"0px"}
        backgroundColor={"rgba(18, 18, 18, 0.5)"}
        backdropFilter="blur(1px)"
        opacity={"100%"}
        zIndex={-1}
        pointerEvents={"none"}
        overflowY={"scroll"}
      ></Box>
      {loading ? (
        <LoadingState loadingText={"Fetching pets..."} />
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