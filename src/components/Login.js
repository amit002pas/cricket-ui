import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {NavLink} from "react-router-dom";
import axios from 'axios'


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
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class SignIn extends React.Component {

    

    constructor(props){
        super(props)
        this.state={
            username:null,
            password:null,
            hasLoginFailed:false,
            showMessage:''
        }
    }
    executeBasicAuthenticationService=(username, password) =>{
        return axios.get(`http://localhost:7070/login`,
            { headers: { authorization: this.createBasicAuthToken(username, password) } })
   
        }

        createBasicAuthToken(username, password) {
            return 'Basic ' + window.btoa(username + ":" + password)
        }
    
    loginClicked=()=>{
        this
        .executeBasicAuthenticationService(this.state.username, this.state.password)
        .then(() => {
            this.props.history.push(`/matchschedule`)
        }).catch(() => {
            console.log("Inside catch")
            this.setState({ showMessage: 'Invalid Credential..Try Again' })
            this.setState({ hasLoginFailed: true })
        })    }
    handleChange=(event)=>{

        if(event.target.id==='email'){
            this.setState({username:event.target.value})
        }

        if(event.target.id==='password'){
            this.setState({password:event.target.value})
        }

    }
    
    render(){
        const { classes } = this.props

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={this.handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={this.handleChange}

                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={this.loginClicked}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs={6}>
                            <NavLink to="/login_success">Forget Password</NavLink>
                        </Grid>
                        <Grid item xs={6}>
                            <NavLink to="/signup">
                                {"Don't have an account? Sign Up"}
                                </NavLink>
                                </Grid>
                        <Grid item xs={12}>
                            {this.state.showMessage}
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>

        </Container>
    );
    }
    
}

export default withStyles(styles)(SignIn);

