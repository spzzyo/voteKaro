import React, { useState , useEffect} from 'react';
import Card from '@mui/material/Card';
import { tokens } from "../../theme";
import Header from "../../components/Header";
import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Modal,
  Typography,
  useTheme,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';



export default function VoteAction() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedRow, setSelectedRow] = useState('');
  const [rowsData, setRowsData] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const targetDate = new Date('2023-07-22');
  const now = new Date();
  const timeRemaining = targetDate - now;
  const votingPhaseStarted = now >= targetDate;

    const handleChange = (event) => {
    setSelectedRow(event.target.value);
    };

    const handleCloseModal = () => {
      setSelectedCandidate(null);
      setModalOpen(false);
    };

     const handleVoteClick = (candidate) => {
      setSelectedCandidate(candidate);
      setConfirmationOpen(true);
    };
  
    const handleConfirmVote = async () => {
      try {
        if (selectedCandidate) {
          const candidateId = selectedCandidate.student.admin.id;
          console.log(candidateId);
  
          const response = await fetch(`http://127.0.0.1:8000/vote/vote_api/${candidateId}/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(selectedCandidate),
          });
  
          if (response.ok) {
            console.log('Vote submitted.');
          } else {
            console.error('Error submitting vote.');
          }
        }
      } catch (error) {
        console.error('Error submitting vote:', error);
      }
      setHasVoted(true);
      setConfirmationOpen(false);
    };
    
    const handleNextCard = () => {
      const currentIndex = rowsData.findIndex((candidate) => candidate.student.admin.id === selectedCandidate.student.admin.id);
      const nextIndex = (currentIndex + 1) % rowsData.length;
      setSelectedCandidate(rowsData[nextIndex]);
    };
  
    const handlePrevCard = () => {
      const currentIndex = rowsData.findIndex((candidate) => candidate.student.admin.id === selectedCandidate.student.admin.id);
      const prevIndex = (currentIndex - 1 + rowsData.length) % rowsData.length;
      setSelectedCandidate(rowsData[prevIndex]);
    };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (votingPhaseStarted){
        const response = await fetch(`http://127.0.0.1:8000/view/view_api/candidates/category/${selectedRow}/`);
        const data = await response.json();
        setRowsData(data);
      } 
    }
      catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    if (selectedRow) {
      fetchData();
    }
  }, [selectedRow,votingPhaseStarted]);

  const handleCardClick = (candidate) => {
    setSelectedCandidate(candidate);
    setModalOpen(true);
  };



  const CountdownTimer = ({ targetDate }) => {
    const calculateTimeRemaining = () => {
      const timeRemaining = targetDate - now;

      return {
        days: Math.floor(timeRemaining / (1000 * 60 * 60 * 24)),
        hours: Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)),
        
      };
    };

    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
    useEffect(() => {
      const timer = setInterval(() => {
        setTimeRemaining(calculateTimeRemaining());
      }, 1000);

      return () => clearInterval(timer);
    }, []);

  //   return (
  //     <Box display="flex" flexDirection="column" alignItems="center">
  //       <Typography variant="h4">Voting Phase Starts From</Typography>
  //       <Typography variant="h4">
  //         {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s
  //       </Typography>
  //     </Box>
  //   );
  // };

  const formatTimeUnit = (unit) => {
    return unit < 10 ? `0${unit}` : unit;
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', backgroundColor:colors.primary[400] , borderRadius: '8px' }}>
      <Typography variant="h4">Voting Phase Starts In:</Typography>
      <Typography variant="h3" style={{ margin: '10px', color: '#3f51b5' }}>
        {formatTimeUnit(timeRemaining.days)}d {formatTimeUnit(timeRemaining.hours)}h{' '}
        {formatTimeUnit(timeRemaining.minutes)}m
      </Typography>
    </div>
  );
};
     

  return (
    <Box 
      flexDirection="column"
      alignItems="center"
      paddingTop={8}
      paddingBottom={8}
      paddingLeft={12}
      paddingRight={4}
      minHeight="100vh"
      boxSizing="border-box">

      {!votingPhaseStarted ? (
        <Box display="flex" flexDirection="column" alignItems="center">
        <CountdownTimer targetDate={targetDate} />
      </Box>
      ) : (
        <>

     {/* Dropdown menu */}
      <FormControl sx={{ m: 2, width: "200px" }}>
        <InputLabel id="row-select-label">Select Position</InputLabel>
        <Select
          labelId="row-select-label"
          id="row-select"
          value={selectedRow}
          label="Select Row"
          onChange={handleChange}
        >
          <MenuItem value="1">GENSEC</MenuItem>
          <MenuItem value="2">FINANCESEC</MenuItem>
          <MenuItem value="3">SPORTSSEC</MenuItem>
          
        </Select>
      </FormControl>

      {/* Table-like display of cards */}
      <Box display="flex" gap={6} justifyContent="center">
        {rowsData.length > 0 ? (
          rowsData.map((candidate) => (
            <Card key={candidate.student.admin.id} sx={{ maxWidth: 500, width: "200px" }}>
              
              <CardActionArea onClick={() => handleCardClick(candidate)}>
                <CardMedia
                  component="img"
                  height="140"
                  // image={card.imageUrl}
                  alt="Card Image"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {candidate.student.admin.first_name}
                </Typography>
        </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" disabled={hasVoted} onClick={() => handleVoteClick(candidate)}>
                    <Typography color="text.secondary">{hasVoted ? 'Voted' : 'Vote'}</Typography>
                  
                </Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography variant="body1">Select a Position.</Typography>
        )}

<Modal open={modalOpen} onClose={handleCloseModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 700,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}
          >
            {selectedCandidate && (
              <div>
                <CardMedia
                  component="img"
                  height="140"
                  image={selectedCandidate.imageUrl} // Replace with the actual image URL field from the API response
                  alt="Card Image"
                />
                <Typography variant="h5" component="div">
                  {selectedCandidate.student.admin.first_name} {selectedCandidate.student.admin.last_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Department: {selectedCandidate.student.department}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {selectedCandidate.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Reason: {selectedCandidate.reason}
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                  <Button onClick={handlePrevCard}>
                    <ChevronLeftIcon />
                  </Button>
                  <Button onClick={handleNextCard}>
                    <ChevronRightIcon />
                  </Button>
                </Box>
                <Box display="flex" justifyContent="center" mt={2}>
                <Button variant="contained" onClick={handleVoteClick}  disabled={hasVoted}>
                  {hasVoted ? 'Voted' : 'Vote'}
                </Button>
                </Box>
              </div>
            )}
          </Box>
        </Modal>

        
{/* <Dialog open={confirmationOpen} onClose={() => setConfirmationOpen(false)}>
  <DialogTitle>Confirm Vote Submission</DialogTitle>
  <DialogContent>
    {selectedCandidate && (
      <Typography variant="body1">
        Are you sure you want to submit your vote for the following candidate?
        <br />
        <br />
        <strong>Full Name:</strong> {selectedCandidate.student.admin.first_name} {selectedCandidate.student.admin.last_name}
        <br />
        <strong>Category:</strong> {selectedCandidate.category}
      </Typography>
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setConfirmationOpen(false)}>Cancel</Button>
    <Button variant="contained" onClick={handleConfirmVote}>
      Submit
    </Button>
  </DialogActions>
</Dialog> */}

<Dialog open={confirmationOpen} onClose={() => setConfirmationOpen(false)}>
  <DialogTitle>Confirm Vote Submission</DialogTitle>
  <DialogContent>
    {selectedCandidate && (
      <Typography variant="body1">
        Are you sure you want to submit your vote for the following candidate?
        <br />
        <br />
        <strong>Full Name:</strong> {selectedCandidate.student.admin.first_name}{' '}
        {selectedCandidate.student.admin.last_name}
        <br />
        <strong>Category:</strong> {selectedCandidate.category}
      </Typography>
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setConfirmationOpen(false)}>Cancel</Button>
    <Button variant="contained" onClick={handleConfirmVote}>
      Submit
    </Button>
  </DialogActions>
</Dialog>

      </Box>
      </>
      )}
    </Box>
  );
}

