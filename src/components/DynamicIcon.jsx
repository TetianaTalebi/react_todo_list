
export default function DynamicIcon({value, AllMuiIcons, iconFontSize=40, iconColor="primary.main"}){

     const DynamicComponent = AllMuiIcons[value];

  return (
    <>

      < DynamicComponent sx={{ color: iconColor, fontSize: iconFontSize }} />
    
    </>
  );
}

