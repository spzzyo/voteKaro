// import { Box, IconButton, Button,useTheme } from "@mui/material";
// import { useContext } from "react";
// import { ColorModeContext, tokens } from "../../theme";
// import InputBase from "@mui/material/InputBase";
// import LightModeIcon from '@mui/icons-material/LightMode';
// import DarkModeIcon from '@mui/icons-material/DarkMode';
// import SearchIcon from "@mui/icons-material/Search";
// import { Link } from 'react-router-dom';
// import AuthContext from "../../AuthContext";

// const Topbar = () => {

//     // let {user, signoutUser} = useContext(AuthContext)


//     const theme = useTheme();
//     const colors = tokens(theme.palette.mode);
//     const colorMode = useContext(ColorModeContext);


//     return <Box display="flex" justifyContent="space-between" p={2}>
//             <Box display="flex" 
//             backgroundColor = {colors.primary[400]}
//             borderRadius= "3px"
//             >
//                 <InputBase sx ={{ml:2, flex:1}} placeholder="Search" />
//                 <IconButton type = "button" sx={{p:1}}>
//                     <SearchIcon/>
//                 </IconButton>
//             </Box>

//             <Box display="flex">
//             <div className="navbar-buttons">
//                 <Link to="/signin  ">Sign In</Link>
//                 <Link to="/signup  ">Sign Up</Link>
                
   
//             </div>
            

            
//             </Box>

//             {/* icons */}
//             <Box display="flex"></Box>
//             <IconButton onClick={colorMode.toggleColorMode}>
//                 { theme.palette.mode === 'dark'?(
//                     <DarkModeIcon/>
//                 ): (
//                     <LightModeIcon/>
//                 )} 
            
//             </IconButton>
//     </Box>;
// }
// export default Topbar;


import { Box, Button, useTheme, Tab, Tabs, IconButton } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SearchIcon from "@mui/icons-material/Search";
import { Link } from 'react-router-dom';
import AuthContext from "../../AuthContext";

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
            <Box display="flex" alignItems="center" backgroundColor={colors.primary[400]} borderRadius="3px">
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>

            <Box display="flex" flex={1} justifyContent="flex-end">
                <Button component={Link} to="/signin" color="inherit">Sign In</Button>
                <Button component={Link} to="/signup" color="inherit">Sign Up</Button>
            </Box>

            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? (
                        <DarkModeIcon />
                    ) : (
                        <LightModeIcon />
                    )}
                </IconButton>
            </Box>
        </Box>
    );
};

export default Topbar;
