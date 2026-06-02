import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SvgIcon from '@mui/material/SvgIcon';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Tooltip from '@mui/material/Tooltip';


export default function ListTitle({ listId, listName, ListIconElement }) {

  // Turn ListIconElement into CurrentListIcon function component 
  // in order we will be able to use <.../> syntax in return() part and pass sx prop

  // Wrap ListIconElement with SvgIcon for inheriting the sx prop

  const CurrentListIcon = (props) => (<SvgIcon {...props}>{ListIconElement}</SvgIcon>);

  return (
    <ListItem
      secondaryAction={
        <Tooltip title="Delete List" placement="right" arrow>
          <IconButton edge="end" aria-label="delete">
            <DeleteSweepIcon color="primary" fontSize="large" />
          </IconButton>
        </Tooltip>
      }
    >
      <ListItemAvatar>
        <Avatar sx={{ width: 70, height: 70, margin: 3, bgcolor: 'primary.main'}}>
          <CurrentListIcon sx={{ fontSize: 40 }} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        disableTypography
        primary={
          <Typography
            sx={{ mt: 4, mb: 2, fontWeight: "bold"}}
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

{
  /* <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Avatar with text and icon
          </Typography>
          
            
              
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Single-line item"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>
              
            
           */
}
