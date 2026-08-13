import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

// Customize tooltips: change font weight and size

  const CustomizedTooltip = styled(({ className, ...props }) => (
  <Tooltip describeChild {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: 16,
  },
}));

export default CustomizedTooltip;