// import React, { useState, useEffect } from 'react';
// import Card from '@mui/material/Card';
// import { tokens } from '../../theme';
// import Header from '../../components/Header';
// import {
//   Box,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   Typography,
//   useTheme,
// } from '@mui/material';


// export default function Result() {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const [selectedRow, setSelectedRow] = useState('');
//   const [studentData, setStudentData] = useState({});


//   const handleChange = (event) => {
//     setSelectedRow(event.target.value);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`http://127.0.0.1:8000/vote/category/${selectedRow}/winner/`);
//         const data = await response.json();
//         setStudentData(data.student);
//       } catch (error) {
//         console.log('Error fetching data:', error);
//       }
//     };

//     if (selectedRow) {
//       fetchData();
//     }
//   }, [selectedRow]);

  
  


//   return (
//     <Box flexDirection="column" alignItems="center" paddingTop={8} paddingBottom={8} paddingLeft={12} paddingRight={4} minHeight="100vh" boxSizing="border-box">
//       {/* Dropdown menu */}
//       <FormControl sx={{ m: 2, width: '200px' }}>
//         <InputLabel id="row-select-label">Select Position</InputLabel>
//         <Select labelId="row-select-label" id="row-select" value={selectedRow} label="Select Row" onChange={handleChange}>
//           <MenuItem value="1">GENSEC</MenuItem>
//           <MenuItem value="2">FINANCESEC</MenuItem>
//           <MenuItem value="3">SPORTSSEC</MenuItem>
//         </Select>
//       </FormControl>

//       {/* Display winner and chart for the selected category */}
//       <Box display="flex" gap={6} justifyContent="center" mt={4}>
//         {/* Box to display the winner */}
//         <Box
//           sx={{
//             padding: '20px',
//             backgroundColor: colors.primary[400],
//             borderRadius: '8px',
//             minWidth: '300px',
//             textAlign: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <Typography variant="h4" color="white">
//             <p>Winner is</p> 
//             <p>{studentData.admin?.first_name} {studentData.admin?.last_name}</p>
//           </Typography>
//         </Box>

           
//         </Box>
//       </Box>
 
//   );
// }


import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';

export default function Result() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedRow, setSelectedRow] = useState('');
  const [studentData, setStudentData] = useState({});
  const [graphData, setGraphData] = useState([]);

  const handleChange = (event) => {
    setSelectedRow(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/vote/category/${selectedRow}/winner/`);
        const data = await response.json();
        setStudentData(data.student);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    const fetchChartData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/vote/category/${selectedRow}/all/`);
        const data = await response.json();
        setGraphData(data);
      } catch (error) {
        console.log('Error fetching chart data:', error);
      }
    };

    if (selectedRow) {
      fetchData();
      fetchChartData();
    }
  }, [selectedRow]);

  const candidateNames = graphData.map((candidate) => candidate.candidate_name);
  const voteCounts = graphData.map((candidate) => candidate.vote_count);

  const chartData = {
    labels: candidateNames,
    datasets: [
      {
        label: 'Votes',
        data: voteCounts,
        backgroundColor: colors.primary[400],
        borderColor: colors.primary[600],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box flexDirection="column" alignItems="center" paddingTop={8} paddingBottom={8} paddingLeft={12} paddingRight={4} minHeight="100vh" boxSizing="border-box">
      {/* Dropdown menu */}
      <FormControl sx={{ m: 2, width: '200px' }}>
        <InputLabel id="row-select-label">Select Position</InputLabel>
        <Select labelId="row-select-label" id="row-select" value={selectedRow} label="Select Row" onChange={handleChange}>
          <MenuItem value="1">GENSEC</MenuItem>
          <MenuItem value="2">FINANCESEC</MenuItem>
          <MenuItem value="3">SPORTSSEC</MenuItem>
        </Select>
      </FormControl>

      {/* Display winner and chart for the selected category */}
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        {/* Box to display the winner */}
        {studentData.admin && (
          <Card
            sx={{
              padding: '20px',
              backgroundColor: colors.primary[400],
              borderRadius: '8px',
              minWidth: '300px',
              textAlign: 'center',
              alignItems: 'center',
              color: colors.grey[100],
            }}
          >
            <Typography variant="h4" color="inherit">
              Winner is {studentData.admin.first_name} {studentData.admin.last_name}
            </Typography>
          </Card>
        )}

        </Box>
        </Box>
  )};

