import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// import SvgIcon from '@mui/material/SvgIcon';
import DynamicIcon from "./DynamicIcon.jsx";

import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

import CustomizedTooltip from "./CustomizedTooltip.jsx";

export default function ListTitle({ listId, listName, listIconName, deleteList, AllMuiIcons }) {

  // Turn ListIconElement into CurrentListIcon function component 
  // in order we will be able to use <.../> syntax in return() part and pass sx prop

  // Wrap ListIconElement with SvgIcon for inheriting the sx prop

  // const CurrentListIcon = (props) => (<SvgIcon {...props}>{ListIconElement}</SvgIcon>);
 
  // console.log(`listIconName from ListTitle is ${listIconName}`);
 

  return (
    <ListItem
      secondaryAction={
        <CustomizedTooltip title="Delete List" placement="right" arrow>
          <IconButton edge="end" aria-label="delete" onClick={() => deleteList(listId, listName)}>
            <DeleteSweepIcon color="primary" fontSize="large" />
          </IconButton>
        </CustomizedTooltip>
      }
    >
      <ListItemAvatar>
        <Avatar sx={{ width: 70, height: 70, margin: 3, bgcolor: 'primary.main'}}>
          {/* <CurrentListIcon sx={{ fontSize: 40 }} /> */}

          <DynamicIcon
              value={listIconName}
              AllMuiIcons={AllMuiIcons}
              iconFontSize={40}
              iconColor={'#fff'}
            />

        </Avatar>
      </ListItemAvatar>
      <ListItemText
        disableTypography
        primary={
          <Typography
            sx={{ mt: 4, mb: 2, mr: 5, fontWeight: "bold"}}
            variant="h4"
            component="h1"
            color="primary"
          >
            {listName}
          </Typography>
        }
      />
    </ListItem>
  );
}


