import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";

import React, {useEffect, useState} from "react";


const AppliedCandidates = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [students, setStudents] = useState([]);

  const handleStatusChange = async (row, newStatus) => {
    try {
      // Make the post request here with the new status and row data
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: row.id, status: newStatus }),
      });
      const data = await response.json();
      console.log(data); // Response from the API (if needed)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/view/view_api/candidates/?format=json'); 
        const data = await response.json();
        console.log(data); 
        setStudents(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudents();
  }, []);

  const columns = [
    {
      field: "student.uid",
      headerName: "UID",
      flex: 1,
      cellClassName: "name-column--cell",
      valueGetter: (params) => params.row.student?.uid || "", 
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
      valueGetter: (params) =>
        `${params.row.student?.admin?.first_name || ""} ${params.row.student?.admin?.last_name || ""}`,
    },
    
    {
      field: "student.admin.email",
      headerName: "Email",
      flex: 1,
      cellClassName: "name-column--cell",
      valueGetter: (params) => params.row.student?.admin?.email || ""
    },



        {
      field: "category",
      headerName: "Category",
      flex: 1,
      cellClassName: "name-column--cell", 
      valueGetter: (params) => {
        let categoryVal = params.row.category;
        let displayValue = "";
  
        switch (categoryVal) {
          case "1":
            displayValue = "GENSEC";
            break;
          case "2":
            displayValue = "FINANCESEC";
            break;
          case "3":
            displayValue = "SPORTSSEC";
            break;
          default:
            displayValue = "";
            break;
        }
  
        return displayValue;
    },
    },
    {
      field: "student.department",
      headerName: "department",
      flex: 1,
      cellClassName: "name-column--cell", 
      valueGetter: (params) => {
        const departmentValue = params.row.student?.department;
        let displayValue = "";
  
        switch (departmentValue) {
          case "1":
            displayValue = "Comps";
            break;
          case "2":
            displayValue = "AIML";
            break;
          case "3":
            displayValue = "DS";
            break;
          case "4":
            displayValue = "EXTC";
            break;
          case "5":
            displayValue = "IT";
            break;
          case "6":
            displayValue = "ETRX";
            break;
          case "7":
            displayValue = "MCA";
            break;
          default:
            displayValue = "";
            break;
        }
  
        return displayValue;
      },
    },
    
    {
      field: "status",
      headerName: "Select/Reject",
      flex: 1,
      renderCell: ({ row }) => {
        const handleSelect = () => handleStatusChange(row, "selected");
        const handleReject = () => handleStatusChange(row, "rejected");

        <Box display="flex" justifyContent="center">
            <Button variant="contained" onClick={handleSelect}>
              Select
            </Button>
            <Button variant="contained" onClick={handleReject} sx={{ ml: 2 }}>
              Reject
            </Button>
          </Box>
    },
    
  }

  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box
        m="40px 0 0 0"
        height="60vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={students}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.student?.uid}
        />      
        
        </Box>
    </Box>
  );
};

export default AppliedCandidates;