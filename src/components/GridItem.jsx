
import DynamicIcon from './DynamicIcon';
import Grid from '@mui/material/Grid';
import SailingIcon from "@mui/icons-material/Sailing";
import ToggleButton from "@mui/material/ToggleButton";


export default function GridItem({size=1, value="SailingIcon"}){

    return(
            <>
                <Grid size={size}>
                      <ToggleButton
                        value={value}
                        aria-label={value}
                      >
                        <DynamicIcon value={value}/>
                        {/* <SailingIcon /> */}
                      </ToggleButton>
                </Grid>
            
            </>
    );

}