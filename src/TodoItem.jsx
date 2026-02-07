import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';


export default function TodoItem({todo}){

    const labelId = `checkbox-list-label-${todo.id}`;
                return (
                    <ListItem
                        secondaryAction={
                        <IconButton edge="end" aria-label="comments">
                            <CommentIcon />
                        </IconButton>
                        }
                        disablePadding
                    >
                        <ListItemButton role={undefined} dense>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={todo.completed}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={todo.text} />
                        </ListItemButton>
                    </ListItem>
                );
}