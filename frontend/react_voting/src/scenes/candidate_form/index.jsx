import { useState, useEffect } from "react";
import { tokens } from "../../theme";
import {Box} from "@mui/material";
import { Typography, useTheme } from "@mui/material";
import {IconButton} from "@mui/material";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

// export default function FormDialog() {
//   const [open, setOpen] = useState(false);
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     uid: '',
//     department: '',
//     gender: '',
//   });

//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     const storedUserId = localStorage.getItem('userId');
//     if (storedUserId) {
//       setUserId(storedUserId);
      
//     }
//   }, []);

export default function FormDialog() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    uid: '',
    department: '',
    gender: '',
  });

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      
    }

    const fetchFirstName = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/view/view_api/user/${userId}/?format=json`); 
        const data = await response.json();
        const { first_name } = data;
        setFormData((prevFormData) => ({
          ...prevFormData,
          firstName: first_name || '', // Set the value of firstName from the API response, or an empty string if it's null or undefined
        }));
        setOpen(first_name === ''); // Set the open state to true if first_name is empty
      } catch (error) {
        console.error(error);
      }
    };

    fetchFirstName();
  }, [userId]);


  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNextStep = async () => {
    if (step === 1) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/view/view_api/user/update/${userId}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            first_name: formData.firstName,
            last_name: formData.lastName,
          }),
        });
  
        // Handle the response, e.g., check for success or display an error message
        if (response.ok) {
          // Proceed to the next step
          setStep(step + 1);
        } else {
          // Handle the error response
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        // Handle any network or API errors
        console.error('Error:', error.message);
      }
    } else if (step === 2) {
      try {
        const dataToSend = {
          admin_id: userId,
          uid: formData.uid,
          gender: formData.gender,
          department: formData.department,
          
        };
  
        const response = await fetch('http://127.0.0.1:8000/view/view_api/student/create/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });
  
        // Handle the response, e.g., check for success or display an error message
        if (response.ok) {
          // Proceed to the next step
          setStep(step + 1);
        } else {
          // Handle the error response
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        // Handle any network or API errors
        console.error('Error:', error.message);
      }
    }
  };
  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleFormSubmit = () => {
    if (step === 1) {
      // Submit to model 1
      console.log('Submitting to Model 1:', formData);
    } else if (step === 2) {
      // Submit to model 2
      console.log('Submitting to Model 2:', formData);
    } else if (step === 3) {
      // Submit to model 3
      console.log('Submitting to Model 3:', formData);
    }

    handleClose();
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <DialogContent>
            <DialogContentText>
              Step 1: Enter your first name and last name.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="firstName"
              label="First Name"
              type="text"
              fullWidth
              variant="standard"
              value={formData.firstName}
              onChange={handleInputChange}
              style={{ marginBottom: '16px' }}
              inputProps={{ style: { fontSize: '20px', padding: '12px' } }}
            />
            <TextField
              margin="dense"
              id="lastName"
              label="Last Name"
              type="text"
              fullWidth
              variant="standard"
              value={formData.lastName}
              onChange={handleInputChange}
              style={{ marginBottom: '16px' }}
              inputProps={{ style: { fontSize: '20px', padding: '12px' } }}
            />
          </DialogContent>
        );
        case 2:
          return (
            <DialogContent>
              <DialogContentText>
                Step 2: Enter your UID, department, and gender.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="uid"
                label="UID"
                type="text"
                fullWidth
                variant="standard"
                value={formData.uid}
                onChange={handleInputChange}
                style={{ marginBottom: '16px' }}
                inputProps={{ style: { fontSize: '20px', padding: '12px' } }}
              />
              <TextField
                margin="dense"
                id="department"
                label="Department"
                type="text"
                fullWidth
                variant="standard"
                value={formData.department}
                onChange={handleInputChange}
                style={{ marginBottom: '16px' }}
                inputProps={{ style: { fontSize: '20px', padding: '12px' } }}
              />
              <TextField
                margin="dense"
                id="gender"
                label="Gender"
                type="text"
                fullWidth
                variant="standard"
                value={formData.gender}
                onChange={handleInputChange}
                style={{ marginBottom: '16px' }}
                inputProps={{ style: { fontSize: '20px', padding: '12px' } }}
              />
            </DialogContent>
          );
      case 3:
        return (
          <DialogContent>
            <DialogContentText>
              Step 3: Review your information.
            </DialogContentText>
            <p>First Name: {formData.firstName}</p>
            <p>Last Name: {formData.lastName}</p>
            <p>Email: {formData.email}</p>
          </DialogContent>
        );
      default:
        return null;
    }
  };

  const renderActionButton = () => {
    if (step === 1) {
      return (
        <Button onClick={handleNextStep}>Next</Button>
      );
    } else if (step === 2) {
      return (
        <div>
          <Button onClick={handlePreviousStep}>Previous</Button>
          <Button onClick={handleNextStep}>Next</Button>
        </div>
      );
    } else if (step === 3) {
      return (
        <div>
          <Button onClick={handlePreviousStep}>Previous</Button>
          <Button onClick={handleFormSubmit}>Submit</Button>
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        EDIT DETAILS
      </Button> */}
        <Box display="flex" justifyContent={"right"} padding={"50px 50px"} >
          <Button onClick={handleClickOpen}
            sx={{
              backgroundColor: colors.blueAccent[300],
              color: colors.grey[100],
              fontSize: "12px",
              fontWeight: "bold",
              padding: "5px 10px",
            }}
          >
            Edit Details
          </Button>

          </Box>
          
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Complete all the Details</DialogTitle>
        {renderFormStep()}
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {renderActionButton()}
        </DialogActions>
      </Dialog>
    </div>
  );
}


