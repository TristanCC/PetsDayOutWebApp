import { createContext, useContext, useState, useEffect } from 'react';

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState(() => {
    const cachedData = localStorage.getItem('customers');
    return cachedData ? JSON.parse(cachedData) : [];
  });

  const [groupID, setGroupID] = useState(null); // Add groupID state
  const [offset, setOffset] = useState(0);

  const limit = 15

  const fetchCustomers = async () => {
    try {
      const response = await fetch(`/db/getCustomers?limit=${limit}&offset=${offset}`);
      const data = await response.json();
      console.log(data)
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };
  

  const fetchGroupID = async (customerId) => {
    try {
      const response = await fetch(`/db/getCustomer/${customerId}`);
      const data = await response.json();
      setGroupID(data.groupID); // Update groupID in state
    } catch (error) {
      console.error('Error fetching groupID:', error);
    }
  };


const updateCustomerInState = (updatedCustomer) => {
  setCustomers(prevCustomers =>
    prevCustomers.map(customer =>
      customer.id === updatedCustomer.id ? updatedCustomer : customer
    )
  );
};
  const deleteCustomerInState = (deletedCustomer) => {
    setCustomers((prevCustomers) =>
      prevCustomers.filter((customer) => customer.id !== deletedCustomer.id)
    );
  };

  const updatePetsForCustomer = (customerId, groupID, updatedPets) => {
  setCustomers(prevCustomers => 
    prevCustomers.map(customer => 
      customer.id === customerId || groupID == customer.groupID
        ? { ...customer, pets: updatedPets }
        : customer
    )
  );
};

  

  useEffect(() => {
    fetchCustomers();
  }, [limit, offset]);

  return (
    <CustomerContext.Provider
      value={{
        customers,
        setCustomers,
        limit,
        offset,
        setOffset,
        fetchCustomers,
        updateCustomerInState,
        deleteCustomerInState,
        updatePetsForCustomer,
        groupID,
        fetchGroupID
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomers = () => useContext(CustomerContext);