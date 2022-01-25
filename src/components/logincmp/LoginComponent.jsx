import {  Button, FormControl, Input, InputAdornment, 
  InputLabel, makeStyles, Snackbar, Typography } from '@material-ui/core';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import LockIcon from '@material-ui/icons/Lock';
import Alert from '@material-ui/lab/Alert';
import { React, useEffect, useState } from 'react';
import {  Col, Form, Row } from 'react-bootstrap';
import LoginService from '../../services/LoginService';
import Stcargo from '../img/Stcargo.png';
import RingLoader from "react-spinners/RingLoader";
import { setloginSession, setUserSession } from '../Utils/Common';

const useStyles = makeStyles((theme) => ({
  formcontrol:{
    marginLeft: theme.spacing(60),
    margin: theme.spacing(1),
    height: "7vh",
    minWidth: 240,
    maxWidth: 250,
  },
  submit:{
    marginLeft: theme.spacing(65),
    margin: theme.spacing(1),
    padding:1,
    minWidth: 180,
    maxWidth: 200,
    
    '&:hover':{
      backgroundColor:"rgb(79, 163, 247);",
      color:"white"
    }
  },
 
}))
function LoginComponent(props) {
  const classes = useStyles();
  const [preLoding , setPreLoding] = useState(false);
  const [proccesing ,setProccesing] = useState(false);
  const [message ,setmassage] = useState("");
  const [open ,setOpen] = useState(false);
  const [values, setValues] = useState({
    txt_userName:"",
    txt_password:""
  });
  useEffect(() => {
  setPreLoding(true);
  setTimeout(() => {
    setPreLoding(false);
  }, 6000);
  }, [])
  const handleClose =()=>{
    setOpen(false);
  }
  const loginpage =(e)=>{
    e.preventDefault();
    let login_Api = {userName:values.txt_userName,password:values.txt_password}
    setProccesing(true)
    if(values.txt_userName === "" && values.txt_password === ""){
      setmassage("username or password missing")
      setOpen(true);
      setProccesing(false)
    }else{
    LoginService.getLogin(login_Api).then(res=>{
      console.log("data=> "+JSON.stringify(res.data));
      if(res.data[0].messageCode === "0000"){
        setUserSession("Bearer token", values.txt_userName)
        setloginSession(res.data[0].userID, res.data[0].currentDate)
        console.log("messageCode=> "+JSON.stringify(res.data[0].messageCode));
        props.history.push('/home');
        setProccesing(false)
      }
      else{
       setmassage(res.data[0].message)
       console.log("messageCode=>else "+JSON.stringify(res.data[0].messageCode));
       setOpen(true);
       setProccesing(false)
      setValues({txt_userName:"",
      txt_password:""});
      }
      
    }).catch(error=>{
      console.log(error);
      setOpen(false);
      setProccesing(false)
      setValues({txt_userName:"",
                  txt_password:""});
    })
  }
  }
  const ChangeuserNameHandler = (event) => {
    setValues({ ...values, txt_userName: event.target.value });
  }
  const ChangepasswordHandler = (event) => {
    setValues({ ...values, txt_password: event.target.value });
  }

  return (
    <body>
    <div >
    {preLoding ?<div  className="backround">
      <RingLoader color={"#36D7B7"} loading={preLoding} className="loding" size={80} />
    </div>   :<div>
      <div style={{marginTop:"10%"}}/>
          <Form >
            
              <div >
                <div>
                <div className="containerBody">
            <img  className="icon" src={Stcargo} alt="icon" />
            </div>
                <h1 className="title"><Typography variant="body2" gutterBottom>
        sign in to continue
      </Typography></h1>
                </div>
                <Row sm={1} >
                  <Col>
                <FormControl  className={classes.formcontrol}>
                  <InputLabel focused>
                  userName
                  </InputLabel>
              <Input type="text"  value={values.txt_userName} onChange={ChangeuserNameHandler} autoComplete="off" 
              startAdornment={
                <InputAdornment position="start">
                <AccountCircleRoundedIcon/>
                </InputAdornment>
              }
              />
              </FormControl>
              </Col>
              <Col>
              <FormControl className={classes.formcontrol}>
              <InputLabel focused>
                password
                  </InputLabel>
              <Input type="password"  value={values.txt_password}  onChange={ChangepasswordHandler} autoComplete="off" 
              startAdornment={
                <InputAdornment position="start">
                <LockIcon/>
                </InputAdornment>
              }
              />
              </FormControl>
              </Col>
              </Row>
              <Row>
              <Button variant="outlined" color="primary" className={classes.submit} onClick={loginpage} disabled={proccesing}>{proccesing? 'proccesing..':'Login'}</Button>
              </Row>
              <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{vertical: 'center', horizontal: 'left'}}>
        <Alert onClose={handleClose} severity="error">
       {message}
        </Alert>
      </Snackbar>
                 </div>
                </Form>
        
  </div>  }
        </div >
        </body>
    )
}
export default LoginComponent;