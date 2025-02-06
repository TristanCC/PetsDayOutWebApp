import { useState, useEffect } from 'react';
import { PopoverRoot, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, PopoverTitle } from '@/components/ui/popover';
import { IconButton, HStack, Box } from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';
import { Input, Button, Text } from '@chakra-ui/react';

const SearchPopup = ({ preferredColors, setSearchResults, 
  firstNameSearch, setFirstNameSearch, lastNameSearch, setLastNameSearch, phoneSearch, setPhoneSearch }) => {

  // Debounced search handler
  useEffect(() => {
    const handleDebouncedSearch = async () => {
      if (!firstNameSearch && !lastNameSearch && !phoneSearch) {
        setSearchResults([]);
        return;
      }

      if (firstNameSearch || lastNameSearch) {
        setPhoneSearch("")
      }

      if (phoneSearch) {
        setFirstNameSearch("")
        setLastNameSearch("")
      }

      try {
        const response = await fetch(`/db/findCustomer?firstName=${firstNameSearch}&lastName=${lastNameSearch}&phoneNumber=${phoneSearch}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Search failed:', error);
      }
    };

    const debounceTimer = setTimeout(handleDebouncedSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [firstNameSearch, lastNameSearch, phoneSearch]);

  const clearSearch = () => {
    setFirstNameSearch("");
    setLastNameSearch("");
    setPhoneSearch("");
  };



  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <IconButton
          aria-label="Search database"
          rounded="xl"
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
              value={firstNameSearch}
              onChange={(e) => setFirstNameSearch(e.target.value)}
              placeholder="First name"
              size="md"
            />
            <Input
              name="xyz123"
              id="xyz123"
              autocomplete="xyz123"
              variant="subtle"
              value={lastNameSearch}
              onChange={(e) => setLastNameSearch(e.target.value)}
              placeholder="Last name"
              size="md"
            />
            <Input
              name="xyz123"
              id="xyz123"
              autocomplete="xyz123"
              variant="subtle"
              value={phoneSearch}
              onChange={(e) => setPhoneSearch(e.target.value)}
              placeholder="Phone number"
              size="md"
              disabled={firstNameSearch || lastNameSearch}
            />

            <HStack>
              <Button type="button" variant={"outline"} onClick={clearSearch} disabled={!firstNameSearch && !lastNameSearch && !phoneSearch}>Clear</Button>
            </HStack>
          </div>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default SearchPopup;
