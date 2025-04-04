import { useState, useEffect, useCallback, useMemo } from "react";
import { Tabs, VStack, Box, Text, IconButton, HStack, Table, Spinner, Separator, Button, Avatar, Checkbox } from "@chakra-ui/react";
import { motion } from "framer-motion";

const Present = ({ value }) => {
    const [present, setPresent] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPresent = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/db/getPresent`);
                if (!response.ok) throw new Error("Network error");
                const data = await response.json();

                // Assuming the response contains an object with 'presentCustomers' property
                setPresent(data.presentCustomers || []); 
                console.log(present)
            } catch (error) {
                console.error("Error fetching present customers:", error);
                setPresent([]);
            } finally {
                setLoading(false);
            }
        };

        
        fetchPresent();
    
    }, [value]);

    return (
        <Box>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Box>
                    <h1>Present Customers</h1>
                    {present.length > 0 ? (
                        <ul>
                            {present.map((customer) => (
                                <li key={customer.id}>{customer.petID}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No present customers found</p>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default Present;
