import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import React, {useEffect, useState} from "react";




const SelectedCandidates = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [students, setStudents] = useState([]);

  const handleSendEmail = (candidate) => {
    // Replace this alert with your actual email sending logic
    
  };

  // Function to send email to all candidates
  const handleSendEmailToAll = () => {
    students.forEach((candidate) => {
      handleSendEmail(candidate);
    });
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
    }
    
  ];



  return (
    <Box m="10px">
      <Header
        title="Selected Candidates"
        subtitle="List of Selected Candidates"
      />
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >

        <Box display="flex" justifyContent={"right"} padding="3px 3px">
            <Button onClick={handleSendEmailToAll}
              sx={{
                backgroundColor: colors.blueAccent[300],
                color: colors.grey[100],
                fontSize: "12px",
                fontWeight: "bold",
                padding: "5px 8px",
              }}
            >
              Send Emails to All
            </Button>

            </Box>

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

export default SelectedCandidates;