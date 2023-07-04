import React, {useContext} from 'react'
import {Avatar, Button, Grid, Paper, TextField, Typography, Link} from '@material-ui/core'
import LockIcon from '@material-ui/icons/Https';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AuthContext from '../../AuthContext';




const SignUpPage = () => {

  const paperStyle={padding:20, height:'90vh', width:280, margin: '20px auto'}
  const avatarStyle={backgroundColor:'#18c588'}
  const buttonStyle={margin:'8px 0'}

  const {signupUser} = useContext(AuthContext)
 

  return (
    <Grid>
       <form onSubmit={signupUser}>
        <Paper elevation={10} style={paperStyle}>
          <Grid align='center'>
            <Avatar style={avatarStyle}><LockIcon /></Avatar>
            <h2>Sign up</h2>
          </Grid> 
          <TextField label='Phone Number' name='phone_number' placeholder='Enter Your Phone Number' fullwidth required/> 
          <TextField label='Email ID' name='email' placeholder='Enter Your Email ID' fullwidth required/> 
          <TextField label='Username' name='username' placeholder='Enter Username' fullWidth required/>
          <TextField label='Password' name='password' placeholder='Enter Password' type='password' fullWidth required/>
          
          <FormControlLabel control={<Checkbox defaultChecked />} label="Remember Me" />
          <Button type='submit' color='primary' variant='contained' style={buttonStyle} fullWidth>Sign Up</Button>
          <Typography>
              <Link href="#">
                  Forgot Password
              </Link>  
          </Typography> 
          <Typography> Already have an account?
              <Link href="#">
                  Sign In
              </Link>  
          </Typography> 
        </Paper>
       </form>
    </Grid>
  )
}

export default SignUpPage 