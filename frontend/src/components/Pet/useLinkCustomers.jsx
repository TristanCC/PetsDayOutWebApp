import { useState } from "react";

const useLinkCustomers = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async (customer) => {
    try {
      // Only if current person has no group.
      const formattedPhoneNumber = phoneNumber.replaceAll(/[()\-\ ]/g, "");
      if (formattedPhoneNumber === customer.phoneNumber) {
        alert("Invalid phone number.");
        return;
      }
      const response = await fetch(`/db/findCustomer?firstName=&lastName=&phone=${formattedPhoneNumber}`);
      const data = await response.json();
      console.log(data);

      if (!data || (Array.isArray(data) && data.length === 0)) {
        alert("No customer found.");
        setSearchResults(null); // Or handle the empty case appropriately
        return;
      }

      setSearchResults(data);
      const targetID = data[0].id;
      await handleLink(customer.id, targetID);
    } catch (error) {
      console.error(error, "There was a problem searching, please try again.");
    }
  };

  const handleLink = async (currentID, targetID) => {
    try {
      const response = await fetch(`/db/linkCustomers`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentOwnerID: currentID, // Ensure names match backend expectations
          targetOwnerID: targetID,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to link customers.");
      }
      alert(data.message);
    } catch (error) {
      console.error("Error linking customers:", error);
    }
  };

  return { phoneNumber, setPhoneNumber, searchResults, handleSearch, handleLink };
};

export default useLinkCustomers;
