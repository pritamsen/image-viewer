import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import './Login.css';
import '../../common/Utils';
import Header from '../../common/Header';
import { CardContent, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Utils from '../../common/Utils';

class Login extends Component {
    /*
         Username: user   
         Password: pass
         token:"IGQVJVTUtTNUVYZAkdGVk5zNS1WMnZAPTDNFanVIQkRvWWdsSmlfRHdRMkRRSzRkVjFtMkdrOERPQ0JmZA1AyZAVZA3dmx4WVI2ZAzdzZA0JHcG1GYkYxU3hRbHhHOW9oODhhd1dSblZA4VTc5Vi1qOXhwV2NGYgZDZD"
         Access Token: Stored in ../../common/Utils.js
    */
    constructor() {
        super();
        this.state = {
            usernameRequired: "displayNone",
            username: "",            
            password: "",
            validUserName:Utils.login.username,
            loginPasswordRequired: "displayNone",
            invalidCredentials:"displayNone",
            validLoginPassword:Utils.login.password,
            token:Utils.auth["access-token"]
        }
    }
    usernameUpdateHandler = (e) => {
        this.setState({ username: e.target.value });
    }
    passwordUpdateHandler = (e) => {
        this.setState({ password: e.target.value });
    }
    loginHandler = () => {
        this.state.username === "" ? this.setState({ usernameRequired: "displayBlock" }) : this.setState({ usernameRequired: "displayNone" });
        this.state.password === "" ? this.setState({ loginPasswordRequired: "displayBlock" }) : this.setState({ loginPasswordRequired: "displayNone" });
        if(this.state.username !== this.state.validUserName || this.state.password !== this.state.validLoginPassword){
            this.setState({ invalidCredentials: "displayBlock" }); 
        }else{
           this.setState({ invalidCredentials: "displayNone" }); 
           this.props.history.push('/home');
           var accessToken = this.state.token;
           sessionStorage.setItem("access-token",accessToken);
        }
    }
    render() {
        return (
            <div className="mainDiv">
               <Header showSearch={false}></Header>
                <Card className="cardSet">
                    <CardContent>
                        <Typography component="h5" variant="h5">
                            LOGIN
                        </Typography>
                        <FormControl required className="formControl" fullWidth required margin="normal" size="medium" variant="standard">
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input id="username" type="text" username={this.state.username} onChange={this.usernameUpdateHandler}></Input>

                            <FormHelperText className={this.state.usernameRequired}>
                                <span className="colorRed">required</span>
                            </FormHelperText>
                        </FormControl>
                        <FormControl required className="formControl" fullWidth required margin="normal" size="medium" variant="standard">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input id="password" type="password" password={this.state.password} onChange={this.passwordUpdateHandler} />
                            <FormHelperText className={this.state.loginPasswordRequired}>
                                <span className="colorRed">required</span>
                            </FormHelperText>
                        </FormControl> <br></br> <br></br>
                        <FormHelperText className={this.state.invalidCredentials}>
                                <span className="colorRed">Incorrect username and/or password</span>
                            </FormHelperText><br></br> <br></br>
                        {}
                        <Button variant="contained" color="primary" onClick={this.loginHandler} >LOGIN</Button>
                    </CardContent>
                </Card>
            </div>
        )
    }
}
export default Login;