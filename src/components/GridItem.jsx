
import DynamicIcon from './DynamicIcon';
import Grid from '@mui/material/Grid';
import ToggleButton from "@mui/material/ToggleButton";
import Tooltip from '@mui/material/Tooltip';


export default function GridItem({size=1, value="SailingIcon", AllMuiIcons}){

    return(
            <>
                <Grid size={size}>
                    <Tooltip title={value} arrow>
                      <ToggleButton
                        value={value}
                        aria-label={value}
                      >
                        <DynamicIcon value={value} AllMuiIcons={AllMuiIcons}/>

                      </ToggleButton>
                    </Tooltip>
                </Grid>
            
            </>
    );

}
