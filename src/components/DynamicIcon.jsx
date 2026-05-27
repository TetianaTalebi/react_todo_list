
import SailingIcon from "@mui/icons-material/Sailing";

export default function DynamicIcon({value="SailingIcon", AllMuiIcons}){

     const DynamicComponent = AllMuiIcons[value];
     
  return (
    <>

      < DynamicComponent />
    
    </>
  );
}

