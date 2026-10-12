import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import CustomizedTooltip from "./CustomizedTooltip.jsx";
import NewListDialog from "./NewListDialog.jsx";



export default function AppNavbar({AllMuiIcons, addNewList,}){

  // openDialog variable defines whether the dialog window opened or closed
  // (i.e. the dialog window for creating a new list)

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

    return (
        <>
            <AppBar
            elevation={8}
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <Toolbar>
              <Typography
                sx={{ flexGrow: 1, fontWeight: 500, textAlign: "start" }}
                variant="h4"
                noWrap
                component="div"
              >
                React Todos
              </Typography>
              <div>
                <CustomizedTooltip title="Create new list" arrow>
                  <IconButton
                    size="large"
                    color="inherit"
                    onClick={handleClickOpen}
                  >
                    {/* <AllMuiIcons.AddCircleOutlined fontSize="large" /> */}
                    <AddCircleOutlinedIcon fontSize="large"/>
                  </IconButton>
                </CustomizedTooltip>

                <NewListDialog
                  AllMuiIcons={AllMuiIcons}
                  open={openDialog}
                  onClose={handleClose}
                  addNewList={addNewList}
                />
              </div>
            </Toolbar>
          </AppBar>
        </>
    );
}