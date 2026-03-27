import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

// [
    //   { todoId: 1, todoText: "Rain", todoCompleted: false },
    //   { todoId: 2, todoText: "Snow", todoCompleted: false },
    //   { todoId: 3, todoText: "Sun", todoCompleted: false },
    //   { todoId: 4, todoText: "Clouds", todoCompleted: true },
    // ]


// export default function TodoItem({todo, remove, toggle}){

export default function TodoItem({todo, remove, toggle}){

    const removeTodo = () => remove(todo.todoId);
    const labelId = `checkbox-list-label-${todo.todoId}`;

                return (
                    <ListItem
                        secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={removeTodo}>
                            <DeleteIcon color='primary'/>
                        </IconButton>
                        }
                        disablePadding
                    >
                        <ListItemButton role={undefined} dense>
                            <ListItemIcon>
                                <Checkbox
                                    onChange={toggle}
                                    edge="start"
                                    checked={todo.todoCompleted}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={todo.todoText} />
                        </ListItemButton>
                    </ListItem>
                );
}