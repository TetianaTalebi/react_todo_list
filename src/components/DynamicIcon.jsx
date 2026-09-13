
export default function DynamicIcon({
  value,
  AllMuiIcons,
  iconFontSize = 40,
  iconColor = "primary.main",
}) {
  const DynamicComponent = AllMuiIcons[value];

  // Return null or a fallback icon if the component is missing
  if (!DynamicComponent) {
    return null; 
  }

  return (
    <>
      <DynamicComponent sx={{ color: iconColor, fontSize: iconFontSize }} />
    </>
  );
}
