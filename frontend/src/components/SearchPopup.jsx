import { useState, useEffect } from 'react';
import { PopoverRoot, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, PopoverTitle } from '@/components/ui/popover';
import { IconButton, HStack, Box } from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';
import { Input, Button, Text } from '@chakra-ui/react';

const SearchPopup = ({ preferredColors }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Debounced search handler
  useEffect(() => {
    const handleDebouncedSearch = async () => {
      if (!firstName && !lastName && !phone) {
        setSearchResults([]);
        return;
      }

      if (firstName || lastName) {
        setPhone("")
      }

      if (phone) {
        setFirstName("")
        setLastName("")
      }

      try {
        const response = await fetch(`/db/findCustomer?firstName=${firstName}&lastName=${lastName}&phoneNumber=${phone}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Search failed:', error);
      }
    };

    const debounceTimer = setTimeout(handleDebouncedSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [firstName, lastName, phone]);

  const clearSearch = () => {
    setFirstName("");
    setLastName("");
    setPhone("");
  };

  const rows = searchResults.map((customer) => (
    <Box
      key={customer.id}
      bg={{ base: "white", _dark: "primary" }}
      w={"100%"}
    >
      <h1>{customer.firstName}</h1>
    </Box>
  ));

  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <IconButton
          aria-label="Search database"
          rounded="xl"
          onClick={clearSearch}
        >
          <LuSearch />
        </IconButton>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverArrow />
        <PopoverBody colorPalette={preferredColors} color="blue.600">
          <PopoverTitle fontSize={"xl"} pb={"1rem"}>Find a customer</PopoverTitle>

          <div className="flexCol">
            <Input
              name="xyz123"
              id="xyz123"
              autocomplete="xyz123"
              variant="subtle"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              size="md"
            />
            <Input
              name="xyz123"
              id="xyz123"
              autocomplete="xyz123"
              variant="subtle"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              size="md"
            />
            <Input
              name="xyz123"
              id="xyz123"
              autocomplete="xyz123"
              variant="subtle"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
              size="md"
              disabled={firstName || lastName}
            />

            <HStack>
              <Button type="button" variant={"outline"} onClick={clearSearch} disabled={!firstName && !lastName && !phone}>Clear</Button>
            </HStack>
          </div>
          {rows}
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default SearchPopup;
