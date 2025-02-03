import { useState, useEffect } from 'react';
import { PopoverRoot, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, PopoverTitle } from '@/components/ui/popover';
import { IconButton, HStack } from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';
import { Input, Button, Text } from '@chakra-ui/react';

const SearchPopup = ({ onSearch, preferredColors }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Debounced search handler
  useEffect(() => {
    const handleDebouncedSearch = async () => {
      if (!isSearchActive) return;
      
      try {
        const response = await fetch(`/db/findCustomer?firstName=${firstName}&lastName=${lastName}&phoneNumber=${phone}`);
        // Handle response here
      } catch (error) {
        console.error('Search failed:', error);
      }
    };

    const debounceTimer = setTimeout(handleDebouncedSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [firstName, lastName, phone, isSearchActive]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSearchActive(true);
  };

  const clearSearch = () => {
    setFirstName("");
    setLastName("");
    setPhone("");
    setIsSearchActive(false);
  };

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
          
          <form onSubmit={handleSubmit}>
            <div className="flexCol">
              <Input
                variant="subtle"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                size="md"
              />
              <Input
                variant="subtle"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                size="md"
              />
              <Input
                variant="subtle"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
                size="md"
                disabled={firstName || lastName}
              />

              <HStack>
              <Button type="button" variant={"outline"} onClick={clearSearch} disabled={!firstName && !lastName && !phone}>Clear</Button>
              <Button w={"73%"} variant={"subtle"} type="submit" disabled={!firstName && !lastName && !phone}>Search</Button>
              </HStack>
            </div>
          </form>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default SearchPopup;