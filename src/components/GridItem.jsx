
import DynamicIcon from './DynamicIcon';
import Grid from '@mui/material/Grid';
import ToggleButton from "@mui/material/ToggleButton";
import CustomizedTooltip from "./CustomizedTooltip.jsx";


export default function GridItem({size=1, value="SailingIcon", AllMuiIcons}){

    return(
            <>
                <Grid size={size}>
                    <CustomizedTooltip title={value} arrow>
                      <ToggleButton
                        value={value}
                        aria-label={value}
                      >
                        <DynamicIcon value={value} AllMuiIcons={AllMuiIcons}/>

                      </ToggleButton>
                    </CustomizedTooltip>
                </Grid>
            
            </>
    );

}
