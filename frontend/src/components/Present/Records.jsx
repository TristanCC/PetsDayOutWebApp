import {useState, useEffect} from "react"
import { Tabs, VStack, Box, Text, IconButton, HStack, Table, Spinner, Separator, Button, Avatar, Checkbox, Icon } from "@chakra-ui/react";
const Records = ({ selectedPet }) => {



    return (
        <Text> {selectedPet.name} </Text>
    )
} 

export default Records