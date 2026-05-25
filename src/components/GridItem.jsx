
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import SailingIcon from "@mui/icons-material/Sailing";



export default function GridItem({size=1, iconName="SailingIcon"}){

    return(
            <>
                <Grid size={size}>
                    <IconButton>
                      <SailingIcon/>
                    </IconButton>
                </Grid>
            
            </>
    );

}