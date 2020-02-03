import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {NavLink} from "react-router-dom";
import NumberFormat from 'react-number-format';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support

import axios from 'axios';


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}



const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        
    },
    paper1:{
        backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});



  

class SignUp extends React.Component {

    constructor(props){
        super(props);
        this.state={
           firstName:'',
           lastName:'',
           email:'',
           phoneNumber:'',
           password:'',
           showMessage:'',
           setModalState:false,
           modalStyle:''

        }
    }

    rand() {
        return Math.round(Math.random() * 20) - 10;
      }
      
       getModalStyle() {
        const top = 50 + this.rand();
        const left = 50 + this.rand();
      
        return {
          top: `${top}%`,
          left: `${left}%`,
          transform: `translate(-${top}%, -${left}%)`,
        };
      }



     handleOpen = () => {
        console.log(this.state.setModalState)
        this.setState({setModalState:true})
        console.log(this.state.setModalState)
       
      };
    
       handleClose = () => {
           console.log("Yupp.. Inside Close")
        this.setState({setModalState:false})
        console.log("^^^ "+this.state.setModalState)
      };
    

    handleChange=(event)=>{

        if(event.target.id==='firstName'){
            this.setState({firstName:event.target.value})
        }

        if(event.target.id==='lastName'){
            this.setState({lastName:event.target.value})
        }

        if(event.target.id==='email'){
            this.setState({email:event.target.value})
        }

        if(event.target.id==='phoneNumber'){
            this.setState({phoneNumber:event.target.value})
        }

        if(event.target.id==='password'){
            this.setState({password:event.target.value})
        }

    }

    signupClicked=()=>{
        console.log("inside signup clicked")
        const params = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailId: this.state.email,
            phoneNumber: this.state.phoneNumber,
            password:this.state.password
          }

        axios.post('http://localhost:7070/user-registration/users',params)
        .then((res)=>{
            this.handleOpen()

           // console.log(this.state.setModalState)
           // if(this.setModalState===false)
           const aa=res.data
           window.alert(aa.message)
                this.props.history.push(`/`)
        })
        .catch((data)=>{
         //  this.handleOpen()
         //   console.log(this.state.setModalState)
            this.setState({showMessage:'Invalid Request...Try Again'})
            console.log(this.state.setModalState)
            console.log("Inside catch "+data.message)

        });
        
    }

    render(){
        const {classes} = this.props;
  
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="lName"
                                name="lastName"
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                autoFocus
                                onChange={this.handleChange}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={this.handleChange}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <NumberFormat
                                format="##########"
                                customInput={TextField}
                                variant="outlined"
                                required
                                fullWidth
                                id="phoneNumber"
                                label="Phone Number"
                                onChange={this.handleChange}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={this.handleChange}

                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={this.signupClicked}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <NavLink to="/">
                                Already have an account? Sign in
                            </NavLink>
                        </Grid>
                        <Grid item xs={12}>
                            {this.state.showMessage}
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
            <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.setModalState}
        onClose={this.handleClose}
      >
        <div className={classes.paper1}>
          <h2 id="simple-modal-title">Successfully Registered</h2>
        </div>
      </Modal>
        <Copyright />
            </Box>
           
        </Container>
    );
    }
}

export default withStyles(styles)(SignUp);



