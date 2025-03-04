import { useState } from "react";

const useFetchCustomers = () => {
  const [customers, setCustomers] = useState([]);

  const handleSearch = async (customer, phoneNumber) => {
    try {
      // Ensure phoneNumber is defined and formatted
      if (!phoneNumber) {
        alert("Please enter a phone number.");
        return;
      }
      const formattedPhoneNumber = phoneNumber.replaceAll(/[()\-\ ]/g, "");
      if (formattedPhoneNumber === customer.phoneNumber) {
        alert("Invalid phone number.");
        return;
      }
      const response = await fetch(
        `/db/findCustomer?firstName=&lastName=&phone=${formattedPhoneNumber}`
      );
      const data = await response.json();
      console.log(data);

      if (!data || (Array.isArray(data) && data.length === 0)) {
        alert("No customer found.");
        setSearchResults(null);
        return;
      }

      setSearchResults(data);
      const targetID = data[0].id;
      await handleLink(customer.id, targetID);
    } catch (error) {
      console.error(error, "There was a problem searching, please try again.");
    }
  };


  return { customers };
};

export default useLinkCustomers;
