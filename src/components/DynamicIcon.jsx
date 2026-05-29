
export default function DynamicIcon({value, AllMuiIcons}){

     const DynamicComponent = AllMuiIcons[value];

  return (
    <>

      < DynamicComponent color="primary" sx={{ fontSize: 40 }} />
      {/* < DynamicComponent color="primary" size="large" /> */}
    
    </>
  );
}

