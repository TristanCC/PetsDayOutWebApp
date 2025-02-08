import { IconButton } from "@chakra-ui/react";
import { LuCircleX } from "react-icons/lu";

const CloseButton = ({ onClick, posY, posX }) => (
    <IconButton
        position={"absolute"}
        top={posY || 4}
        right={posX || 4}
        aria-label="close"
        size={"lg"}
        variant={"ghost"}
        borderRadius={"1rem"}
        onClick={onClick}
        zIndex={100000}
    >
        <LuCircleX />
    </IconButton>
);

export default CloseButton;
