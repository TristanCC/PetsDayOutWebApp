import { useState, useEffect, useCallback, useMemo } from 'react';
import { PopoverRoot, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, PopoverTitle } from '@/components/ui/popover';
import { IconButton, HStack, Box } from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';
import { Input, Button, Text } from '@chakra-ui/react';
import { withMask } from 'use-mask-input';

const SearchPopup = ({
  preferredColors,
  setSearchResults,
  firstNameSearch,
  setFirstNameSearch,
  lastNameSearch,
  setLastNameSearch,
  phoneSearch,
  setPhoneSearch,
}) => {
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  const handleSearch = useCallback(async () => {
    // If no search criteria provided, clear search results.
    if (!firstNameSearch && !lastNameSearch && !phoneSearch) {
      setSearchResults(null); // indicate no search active
      return;
    }

    // If searching by name, clear phone search, and vice versa.
    if (firstNameSearch || lastNameSearch) {
      setPhoneSearch("");
    }
    if (phoneSearch) {
      setFirstNameSearch("");
      setLastNameSearch("");
    }

    try {
      const formattedPhoneNumber = phoneSearch.replaceAll(/[()\-\ ]/g, "");
      const response = await fetch(
        `/db/findCustomer?firstName=${firstNameSearch}&lastName=${lastNameSearch}&phone=${formattedPhoneNumber}`
      );
      const data = await response.json();
      // Always set as an array, even if empty.
      setSearchResults(data);
    } catch (error) {
      console.error("Search failed:", error);
    }
  }, [firstNameSearch, lastNameSearch, phoneSearch, setSearchResults, setFirstNameSearch, setLastNameSearch, setPhoneSearch]);

  const debouncedSearch = useMemo(() => debounce(handleSearch, 1000), [handleSearch]);

  useEffect(() => {
    debouncedSearch();
  }, [firstNameSearch, lastNameSearch, phoneSearch, debouncedSearch]);

  const clearSearch = () => {
    setFirstNameSearch("");
    setLastNameSearch("");
    setPhoneSearch("");
    setSearchResults(null); // reset search mode
  };

  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <IconButton aria-label="Search database" rounded="xl">
          <LuSearch />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody colorPalette={preferredColors}>
          <PopoverTitle fontSize={"xl"} pb={"1rem"} color={{ base: "primary", _dark: "primaryL" }}>
            Find a customer
          </PopoverTitle>
          <Box className="flexCol">
            <Input
              name="firstName"
              id="firstName"
              variant="subtle"
              value={firstNameSearch}
              onChange={(e) => setFirstNameSearch(e.target.value)}
              placeholder="First name"
              size="md"
              disabled={phoneSearch}
            />
            <Input
              name="lastName"
              id="lastName"
              variant="subtle"
              value={lastNameSearch}
              onChange={(e) => setLastNameSearch(e.target.value)}
              placeholder="Last name"
              disabled={phoneSearch}
              size="md"
            />
            <Input
              name="phoneSearch"
              id="phoneSearch"
              variant="subtle"
              value={phoneSearch}
              onChange={(e) => setPhoneSearch(e.target.value)}
              size="md"
              disabled={firstNameSearch || lastNameSearch}
              placeholder="(999) 999-9999"
              ref={withMask("(999) 999-9999")}
            />
            <HStack>
              <Button type="button" variant={"outline"} onClick={clearSearch} disabled={!firstNameSearch && !lastNameSearch && !phoneSearch}>
                Clear
              </Button>
            </HStack>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default SearchPopup;
