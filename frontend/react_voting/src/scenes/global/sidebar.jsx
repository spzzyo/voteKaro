
import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Select, FormControl } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import HowToRegIcon from '@mui/icons-material/HowToReg';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};



const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [userId, setUserId] = useState(null);  
  
  const [selectedCategory, setSelectedCategory] = useState('GENSEC');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      
    }
  }, []);

  return (
    
    <Box sx={{ display: 'flex', position : "sticky"}}>
    <Box
      sx={{
        // position: 'sticky',
        // top: 0,
        // height: '100%',

          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
             
        
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
     
      <ProSidebar collapsed={isCollapsed} >
        
        <Menu iconShape="square">
        
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "1px 0 10px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="5px"
              >
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  VOTEKARO
                </Typography>
                
              </Box>
            </Box>
          )}

          {userId === '1' ?(
          <Box Box paddingLeft={isCollapsed ? undefined : "5%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Candidates
            </Typography>
            
            
            
            <Item
              title="Applied Candidates"
              to="/applied_candidates"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Selected Candidates"
              to="/selected_candidates"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            <Item
              title="Display Results"
              to="/results"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> 

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: '15px 0 5px 20px' }}
            >
              Charts
            </Typography>
            <SubMenu
              title="Bar Chart"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            >
            <Item icon = {<PeopleOutlinedIcon /> } to="/bargraphgs" title = "GENERAL SEC." selected={selected} setSelected={setSelected} ></Item>
            <Item icon={<PeopleOutlinedIcon />} to="/bargraphfs"title="FINANCE SEC." selected={selected} setSelected={setSelected}></Item>
            <Item icon={<PeopleOutlinedIcon />}to="/bargraphss" title="SPORTS SEC." selected={selected} setSelected={setSelected}></Item>
            </SubMenu>
            <SubMenu 
              title="Pie Chart"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            >
            <Item icon = {<PeopleOutlinedIcon /> } to="/piegraphgs" title = "GENERAL SEC." selected={selected} setSelected={setSelected} ></Item>
            <Item icon={<PeopleOutlinedIcon />} to="/piegraphfs"title="FINANCE SEC." selected={selected} setSelected={setSelected}></Item>
            <Item icon={<PeopleOutlinedIcon />}to="/piegraphss" title="SPORTS SEC." selected={selected} setSelected={setSelected}></Item>
            </SubMenu>

            </Box>
          ):(
            <Box Box paddingLeft={isCollapsed ? undefined : "5%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Know Your Candidates"
              to="/candidates"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />  //For after the selection phase is over*/}   
             

            <Item
              title="Vote Now"
              to="/vote"
              icon={< HowToRegIcon/>}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Apply for a Position"
              to="/details"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> 

            
            </Box>
          )     }
        </Menu>
    
      </ProSidebar>
      </Box>
    </Box>
  
  );
};

export default Sidebar;