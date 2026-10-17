import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DynamicIcon from "./DynamicIcon.jsx";



export default function AppSideBar({todoLists, activeListId, handleListOnClick, AllMuiIcons}){
    
    return (
        <>
            <Box>
                <List>
                {todoLists.map((list) => (
                    <ListItem
                    key={list.listId}
                    disablePadding
                    sx={{
                        ...(list.listId ===
                        activeListId && {
                        backgroundColor: "lightgray",
                        boxShadow: "0px 3px 10px darkgray",
                        }),
                    }}
                    >
                    <ListItemButton
                        onClick={() => handleListOnClick(list.listId)}
                        sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        }}
                    >
                        <ListItemIcon>
                        <DynamicIcon
                            value={list.listIconName}
                            AllMuiIcons={AllMuiIcons}
                            iconFontSize={24}
                            iconColor={grey[700]}
                        />
                        </ListItemIcon>

                        <ListItemText
                        primary={list.listName}
                        sx={{ display: { xs: "none", md: "inline" } }}
                        />
                    </ListItemButton>
                    </ListItem>
                ))}
                </List>
            </Box>
        </>
    );
}