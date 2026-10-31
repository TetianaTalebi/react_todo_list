import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CustomizedTooltip from "./CustomizedTooltip.jsx";



export default function AppFooter(){

    return ( 
         <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "primary.main",
                color: "white",
                width: "100%",
                height: "100%",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 400,
                  textAlign: "center",
                  whiteSpace: "pre-wrap",
                }}
                component="div"
                variant="subtitle2"
              >
                <Box component="span">{`\u00A9 2026   Tetiana Talebi  `}</Box>
                <Box component="span" sx={{display:{xs: "none", sm: "inline"}}}>{` Full-Stack Web Developer  `}</Box>

                <CustomizedTooltip
                  title="https://github.com/TetianaTalebi"
                  placement="top"
                  arrow
                >
                  <IconButton
                    size="small"
                    component="a"
                    href="https://github.com/TetianaTalebi"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHubIcon fontSize="inherit" sx={{ color: "common.white" }} />
                  </IconButton>
                </CustomizedTooltip>

                <CustomizedTooltip
                  title="https://linkedin.com/in/tetianatalebi"
                  placement="top"
                  arrow
                >
                  <IconButton
                    size="small"
                    component="a"
                    href="https://linkedin.com/in/tetianatalebi"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedInIcon fontSize="inherit" sx={{ color: "common.white" }} />
                  </IconButton>
                </CustomizedTooltip>
              </Typography>
            </Box>
        </>
    );
}