import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';


export default function TodoItem({todo, remove}){

    const removeTodo = () => remove(todo.id);
    const labelId = `checkbox-list-label-${todo.id}`;

                return (
                    <ListItem
                        secondaryAction={
                        <IconButton edge="end" aria-label="comments" onClick={removeTodo}>
                            <DeleteIcon color='primary'/>
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