import {
    Button, ButtonGroup, Container, Dialog,
  DialogActions, DialogContent, DialogTitle, Divider, FormControl,
  ImageList,
  ImageListItem,
  InputLabel, makeStyles, Paper, Select,  Table, TableBody, TableCell,
  TableContainer, TableHead, TablePagination, TableRow,  TextField, Typography, withStyles
}
  from '@material-ui/core'
import { React, useEffect, useState } from 'react'
import Sidebar from '../home/Sidebar';
import { Col, Form, Row } from 'react-bootstrap';
import profile from '../img/user.svg'
import MasterService from '../../services/masterservices/MasterService';

const useStyles = makeStyles((theme) => ({
  formcontrol: {
    marginTop: theme.spacing(-1),
    marginLeft: theme.spacing(-12),
    margin: theme.spacing(1),
    height: "2vh"
  },
  radio: {
    marginTop: theme.spacing(1),
    height: "2vh"
  },
  titele: {
    textAlign: "center",
    fontWeight: "bold"
  },
  buttonUG: {
    margin: theme.spacing(1),
    marginLeft: theme.spacing(50),
    marginRight: theme.spacing(3),
  },
  buttonR: {
    margin: theme.spacing(1),
  },
  card: {
    marginLeft: theme.spacing(5),
    height:"80vh"
  },
  container: {
    marginTop: theme.spacing(1),
  },
  card2: {
    marginTop: theme.spacing(1),
  },
  tableContainer: {
    margin: theme.spacing(0),
    minHeight: 550,
    maxHeight: 550,
  },
  ButtonG1: {
    marginLeft: theme.spacing(45),
  },
  DialogTitel1: {
    marginTop: theme.spacing(-7),
  },
  imageList: {
    width: 500,
    height: 450,
  },
  selectcontrol: {
    width: 150
  },
  table: {
    minWidth: "10vh",
    maxWidth: "10vh",
  },
}))
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    width:700
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function Kyc() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [processing ,setProcessing ] = useState(false);
  const [error , setError ] = useState(false)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [customerDetails, setCustomerDetails] = useState([]);
  const [drpOriginCountry, setDrpOrigionCountry] = useState([]);
  const [drpCustomerBill, setDrpCustomerBill] = useState([]);
  const [drpCustomerType, setdrpCustomerType] = useState([]);
  const [drpState, setDrpState] = useState([]);
  const [drpCustomerKycConfiguretion, setdrpCustomerKycConfiguretion] = useState([]);
  const [values , setValues] = useState({
    ip_old_customer_id:0,
    ip_customer_id:'',
    ip_customer_bill_type:'',
    ip_customer_type:'',
    ip_country_id:'',
    ip_state_id:'',
    ip_kyc_type:'',
    ip_customer_name:'',
    ip_customer_address:'',
    ip_customer_mobile_no:'',
    ip_phone:'',
    ip_customer_city:'',
    ip_district:'',
    ip_customer_pincode:'',
    ip_customer_emailId:'',
    ip_credit_point:'',
    ip_created_by:'',
    id_proof: profile,
  });
  const getAlldata = async () => {
    MasterService.getCustomerBill().then(res=>{
      setDrpCustomerBill(res.data)
    })
    MasterService.getCustomerType().then(res=>{
      setdrpCustomerType(res.data);
    })
    MasterService.getOrigineCountry().then(res=>{
      setDrpOrigionCountry(res.data);
    })
   MasterService.getState().then(res=>{
    setDrpState(res.data);
   })  
   MasterService.getCustomerDetails().then(res=>{
    setdrpCustomerKycConfiguretion(res.data);
   })  
   MasterService.getCustomerDetails().then(res=>{
     setCustomerDetails(res.data);
   })  
   
  };
  useEffect(() => {
    getAlldata();
  }, []);
  const editTable =(customs)=>{
    setValues({
      ip_old_customer_id:customs.customer_id,
      ip_customer_bill_type:customs.customer_bill_type,
      ip_customer_type:customs.customer_type,
      ip_country_id:customs.country_id,
      ip_state_id:customs.state_id,
      ip_kyc_type:customs.kyc_type,
      ip_customer_name:customs.customer_name,
      ip_customer_address:customs.customer_address,
      ip_customer_mobile_no:customs.customer_mobile_no,
      ip_phone:customs.phone,
      ip_customer_city:customs.customer_city,
      ip_district:customs.district,
      ip_customer_pincode:customs.customer_pincode,
      ip_customer_emailId:customs.customer_emailId,
      ip_credit_point:customs.credit_point,
      ip_created_by:customs.created_by,
      id_proof: profile,
    })
  }

  const SaveCustomer =()=>{
    setProcessing(true);
    let customerDetails = {  customer_id:values.ip_customer_id,customer_bill_type:values.ip_customer_bill_type,customer_type:values.ip_customer_type,
    country_id:values.ip_country_id,state_id:values.ip_state_id,kyc_type:values.ip_kyc_type,customer_name:values.ip_customer_name,customer_address:values.ip_customer_address,
    customer_mobile_no:values.ip_customer_mobile_no,phone:values.ip_phone,customer_city:values.ip_customer_city,district:values.ip_district,customer_pincode:values.ip_customer_pincode,
    customer_emailId:values.ip_customer_emailId,credit_point:values.ip_credit_point,created_by:values.ip_created_by}
    if(!values.ip_customer_id){
        setError(true);
        setProcessing(false);
    }
    else if(!values.ip_customer_bill_type){
      setError(true);
      setProcessing(false);
    }
    if(!values.ip_customer_type){
      setError(true);
      setProcessing(false);
    }
    else if(!values.ip_country_id){
      setError(true);
      setProcessing(false);
    }
    if(!values.ip_state_id){
      setError(true);
      setProcessing(false);
    }
    else if(!values.ip_kyc_type){
      setError(true);
      setProcessing(false);
    }
    if(!values.ip_customer_name){
      setError(true);
      setProcessing(false);
    }
    else if(!values.ip_customer_address){
      setError(true);
      setProcessing(false);
    }
    if(!values.ip_customer_mobile_no){
      setError(true);
      setProcessing(false);
    }
    else if(!values.ip_phone){
      setError(true);
      setProcessing(false);
    }
    if(!values.ip_customer_city){
      setError(true);
      setProcessing(false);
    }
    else if(!values.ip_district){
      setError(true);
      setProcessing(false);
    }
    if(!values.ip_customer_pincode){
      setError(true);
      setProcessing(false);
    }
    else if(!values.ip_customer_emailId){
      setError(true);
      setProcessing(false);
    }
    if(!values.ip_credit_point){
      setError(true);
      setProcessing(false);
    }
    else if(!values.ip_created_by){
      setError(true);
      setProcessing(false);
    }
    else{
    MasterService.addCustomerDetails(customerDetails).then(res=>{
      setProcessing(false);
          console.log("response => "+JSON.stringify(res.data));
          setValues({
            ip_customer_id:'',
          ip_customer_bill_type:'',
          ip_customer_type:'',
          ip_country_id:'',
          ip_state_id:'',
          ip_kyc_type:'',
          ip_customer_name:'',
          ip_customer_address:'',
          ip_customer_mobile_no:'',
          ip_phone:'',
          ip_customer_city:'',
          ip_district:'',
          ip_customer_pincode:'',
          ip_customer_emailId:'',
          ip_credit_point:'',
          ip_created_by:'',
          id_proof: profile,
          })
    }).catch(error=>{
      setValues({
        ip_customer_id:'',
      ip_customer_bill_type:'',
      ip_customer_type:'',
      ip_country_id:'',
      ip_state_id:'',
      ip_kyc_type:'',
      ip_customer_name:'',
      ip_customer_address:'',
      ip_customer_mobile_no:'',
      ip_phone:'',
      ip_customer_city:'',
      ip_district:'',
      ip_customer_pincode:'',
      ip_customer_emailId:'',
      ip_credit_point:'',
      ip_created_by:'',
      id_proof: profile,
      })
      console.log("error=> "+JSON.stringify(error));
    })
  }
  }
  const updateCustomer =()=>{
    setProcessing(true);
    let customerDetails = { old_customer_id:values.ip_old_customer_id, customer_id:values.ip_customer_id,customer_bill_type:values.ip_customer_bill_type,customer_type:values.ip_customer_type,
    country_id:values.ip_country_id,state_id:values.ip_state_id,kyc_type:values.ip_kyc_type,customer_name:values.ip_customer_name,customer_address:values.ip_customer_address,
    customer_mobile_no:values.ip_customer_mobile_no,phone:values.ip_phone,customer_city:values.ip_customer_city,district:values.ip_district,customer_pincode:values.ip_customer_pincode,
    customer_emailId:values.ip_customer_emailId,credit_point:values.ip_credit_point,created_by:values.ip_created_by}
    if(!values.ip_old_customer_id || values.ip_old_customer_id === 0){
        setError(true);
        setProcessing(false);
    }
    if(!values.ip_customer_id){
        setError(true);
        setProcessing(false);
    }
    else if(!values.ip_customer_bill_type){
      setError(true);
      setProcessing(false);
    }
    if(!values.ip_customer_type){
      setError(true);
      setProcessing(false);
    }
    else if(!values.ip_country_id){
      setError(true);
      setProcessing(false);
    }
    if(!values.ip_state_id){
      setError(true);
      setProcessing(false);
    }
    else if(!values.ip_kyc_type){
      setError(true);
      setProcessing(false);
    }
    if(!values.ip_customer_name){
      setError(true);
      setProcessing(false);
    }
    else if(!values.ip_customer_address){
      setError(true);
      setProcessing(false);
    }
    if(!values.ip_customer_mobile_no){
      setError(true);
      setProcessing(false);
    }
    else if(!values.ip_phone){
      setError(true);
      setProcessing(false);
    }
    if(!values.ip_customer_city){
      setError(true);
      setProcessing(false);
    }
    else if(!values.ip_district){
      setError(true);
      setProcessing(false);
    }
    if(!values.ip_customer_pincode){
      setError(true);
      setProcessing(false);
    }
    else if(!values.ip_customer_emailId){
      setError(true);
      setProcessing(false);
    }
    if(!values.ip_credit_point){
      setError(true);
      setProcessing(false);
    }
    else if(!values.ip_created_by){
      setError(true);
      setProcessing(false);
    }
    else{
    MasterService.addCustomerDetails(customerDetails).then(res=>{
      setProcessing(false);
          console.log("response => "+JSON.stringify(res.data));
          setValues({
            ip_customer_id:'',
          ip_customer_bill_type:'',
          ip_customer_type:'',
          ip_country_id:'',
          ip_state_id:'',
          ip_kyc_type:'',
          ip_customer_name:'',
          ip_customer_address:'',
          ip_customer_mobile_no:'',
          ip_phone:'',
          ip_customer_city:'',
          ip_district:'',
          ip_customer_pincode:'',
          ip_customer_emailId:'',
          ip_credit_point:'',
          ip_created_by:'',
          id_proof: profile,
          })
    }).catch(error=>{
      setValues({
        ip_customer_id:'',
      ip_customer_bill_type:'',
      ip_customer_type:'',
      ip_country_id:'',
      ip_state_id:'',
      ip_kyc_type:'',
      ip_customer_name:'',
      ip_customer_address:'',
      ip_customer_mobile_no:'',
      ip_phone:'',
      ip_customer_city:'',
      ip_district:'',
      ip_customer_pincode:'',
      ip_customer_emailId:'',
      ip_credit_point:'',
      ip_created_by:'',
      id_proof: profile,
      })
      console.log("error=> "+JSON.stringify(error));
    })
  }
  }

 

  const ViewImage = () => {
    setOpen2(true);
  }
  const ChangeCustomBillTypeHandler = (event) => {
    setValues({ ...values, ip_customer_bill_type: event.target.value })
  }

  const ChangeCustomeTypeHandler = (event) =>{
    setValues({...values,ip_customer_type: event.target.value});
  }

  const ChangeCountryHandler =(event)=>{
    setValues({...values,ip_country_id:event.target.value})
  }
  const ChangeStateHandler =(event)=>{
    setValues({...values,ip_state_id:event.target.value})
  }
  const changeKycTypeHandler =(event)=>{
    setValues({...values,ip_kyc_type:event.target.value})
  }
  const ChangeCustomIdHandler =(event)=>{
    setValues({...values,ip_customer_id:event.target.value})
  }
  const ChangeCustomerNameHandler =(event)=>{
    setValues({...values,ip_customer_name:event.target.value})
  }
  const ChangeCustomerAddressHandler =(event)=>{
    setValues({...values,ip_customer_address:event.target.value})
  }
  const ChangeDistricHandler =(event)=>{
    setValues({...values,ip_district:event.target.value})
  }
  const ChangePhoneHandler =(event)=>{
    setValues({...values,ip_phone:event.target.value})
  }
  const ChangeMobileHandler =(event)=>{
    setValues({...values,ip_customer_mobile_no:event.target.value})
  }
  const ChangeCitiHandler =(event)=>{
    setValues({...values,ip_customer_city:event.target.value})
  }
  const ChangepincodeHandler =(event)=>{
    setValues({...values,ip_customer_pincode:event.target.value})
  }
  const ChangeCriditPointHandler =(event)=>{
    setValues({...values,ip_credit_point:event.target.value})
  }
  const ChangeCustomerEmailIdHandler =(event)=>{
    setValues({...values,ip_customer_emailId:event.target.value})
  }

  const ChangeImageHandler = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setValues({ ...values, id_proof: reader.result })
      }
    }
    reader.readAsDataURL(event.target.files[0])
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickSaveOpen = () => {
    setOpen(true);
  };
  const handleClickUpdateOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setValues({
      ip_customer_id:'',
    ip_customer_bill_type:'',
    ip_customer_type:'',
    ip_country_id:'',
    ip_state_id:'',
    ip_kyc_type:'',
    ip_customer_name:'',
    ip_customer_address:'',
    ip_customer_mobile_no:'',
    ip_phone:'',
    ip_customer_city:'',
    ip_district:'',
    ip_customer_pincode:'',
    ip_customer_emailId:'',
    ip_credit_point:'',
    ip_created_by:'',
    id_proof: profile,
    })
    setOpen(false);
  };
  const handleImageViewClose = () => {
    setOpen2(false);
  }
  const saveORupdate =()=>{
    if(!values.ip_old_customer_id || values.ip_old_customer_id === 0){
        return "save";
    }
    else{
      return "update"
    }
  }
  const OnClicksaveORupdate =()=>{
    if(!values.ip_old_customer_id || values.ip_old_customer_id === 0){
        return SaveCustomer;
    }
    else{
      return updateCustomer;
    }
  }
  return (
    <div>
      <Sidebar />
      <div style={{ marginTop: "6%" }} />
      <Container classNam="scrollbar scrollbar-secondary">
        <Paper className={classes.card} elevation={7}>  
        <Typography className={classes.titele}>KYC Details</Typography>       
            <Container className={classes.container} >
              <Paper className={classes.card2}>
                <TableContainer className={classes.tableContainer}>
                  <Table stickyHeader size="small" className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="left">Sl.No</StyledTableCell>
                        <StyledTableCell align="left">CustomerId</StyledTableCell>
                        <StyledTableCell align="left">CustomerName</StyledTableCell>
                        <StyledTableCell align="left">CustomerAddresh</StyledTableCell>
                        <StyledTableCell align="left">CustomerBillType</StyledTableCell>
                        <StyledTableCell align="left">CustomerType</StyledTableCell>
                        <StyledTableCell align="left">CountryName</StyledTableCell>
                        <StyledTableCell align="left">State</StyledTableCell>
                        <StyledTableCell align="left">District</StyledTableCell>
                        <StyledTableCell align="right">KycType</StyledTableCell>
                        <StyledTableCell align="left">EmailId</StyledTableCell>
                        <StyledTableCell align="left">CustomerMobile</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody >
                      {customerDetails.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((customs) => (
                        <StyledTableRow hover key={customs.customer_id} onClick={()=>editTable(customs)}>
                          <TableCell align="center">{customs.sl_No}</TableCell>
                          <TableCell align="center">{customs.customer_id}</TableCell>
                          <TableCell align="center">{customs.customer_name}</TableCell>
                          <TableCell align="center">{customs.customer_address}</TableCell>
                          <TableCell align="center">{customs.customer_bill_type}</TableCell>
                          <TableCell align="center">{customs.customer_type}</TableCell>
                          <TableCell align="center">{customs.country_name}</TableCell>
                          <TableCell align="center">{customs.delivery_state_name}</TableCell>
                          <TableCell align="center">{customs.customer_city}</TableCell>
                          <TableCell align="center" >{customs.kyc_type}</TableCell>
                          <TableCell align="center">{customs.customer_emailId}</TableCell>
                          <TableCell align="center">{customs.customer_mobile_no}</TableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Divider />
                <TablePagination
                  rowsPerPageOptions={[50, 100]}
                  component="div"
                  count={customerDetails.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
              <br />
              <ButtonGroup size="small" variant="text" color="primary" className={classes.ButtonG1} >
                <Button onClick={handleClickSaveOpen}>
                  Add Sender
                  </Button>
                <Button onClick={handleClickUpdateOpen}>
                  Update Sender
                  </Button>
                <Button>
                  Delete Sender
                  </Button>
                <Button>
                  Reset
                  </Button>
              </ButtonGroup>
            </Container>
            <Dialog fullWidth={true}
            maxWidth="lg"
              open={open} onClose={handleClose}>
              <Dialog open={open2} onClose={handleImageViewClose}>
                <DialogActions>
                  <Button onClick={handleImageViewClose} color="primary">
                    Close
                  </Button>
                </DialogActions>
                <DialogTitle className={classes.DialogTitel1}>
                  View Image
                </DialogTitle>
                <DialogContent className="scrollbar scrollbar-primary">
                  <ImageList cols={1} rowHeight={500} className={classes.imageList}>
                    <ImageListItem>
                      <img src={values.id_proof} alt=""  />
                    </ImageListItem>
                  </ImageList>
                  </DialogContent>
              </Dialog>
              {/*  */}
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Close
                </Button>
              </DialogActions>
              <DialogTitle className={classes.DialogTitel1}>{"SAVE CONSIGNEE DETAILS"}</DialogTitle>
              <DialogContent className="scrollbar scrollbar-primary">
                <Container>
                  <div>
                    <Row xs={6}>
                    <Col>
                        <FormControl error={error} helperTex="field is required">
                          <InputLabel required >Custom Bill Type</InputLabel>
                          <Select autoComplete="off" className={classes.selectcontrol} value={values.ip_customer_bill_type}
                            onChange={ChangeCustomBillTypeHandler}>
                            {drpCustomerBill.map(customer => (
                              <option key={customer.customer_bill_type_name} value={customer.customer_bill_type_name}>
                                {customer.customer_bill_type_name}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      </Col>
                      <Col>
                        <FormControl error={error} helperTex="field is required">
                          <InputLabel required >Custom Type</InputLabel>
                          <Select autoComplete="off" className={classes.selectcontrol} value={values.ip_customer_type}
                            onChange={ChangeCustomeTypeHandler}>
                            {drpCustomerType.map(kycIdType => (
                              <option key={kycIdType.customer_type_name} value={kycIdType.customer_type_name}>
                                {kycIdType.customer_type_name}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      </Col>
                      <Col>
                        <FormControl error={error} helperTex="field is required">
                          <InputLabel required >Country</InputLabel>
                          <Select autoComplete="off" className={classes.selectcontrol} value={values.ip_country_id}
                            onChange={ChangeCountryHandler}>
                            {drpOriginCountry.map(country => (
                              <option key={country.country_id} value={country.country_id}>
                                {country.country_name}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      </Col>
                      <Col>
                        <FormControl error={error} helperTex="field is required">
                          <InputLabel required >State</InputLabel>
                          <Select autoComplete="off" className={classes.selectcontrol} value={values.ip_state_id}
                            onChange={ChangeStateHandler}>
                            {drpState.map(state => (
                              <option key={state.stateId} value={state.stateId}>
                                {state.stateName}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      </Col>
                      <Col>
                        <FormControl error={error} helperTex="field is required">
                          <InputLabel required >KYC Id Type</InputLabel>
                          <Select autoComplete="off" className={classes.selectcontrol} value={values.ip_kyc_type}
                            onChange={changeKycTypeHandler}>
                            <option value="1">
                              ten
                             </option>
                            {drpCustomerKycConfiguretion.map(kycIdType => (
                              <option key={kycIdType.kycId} value={kycIdType.kycId}>
                                {kycIdType.kycType}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      </Col>
                      <Col>
                      <TextField error={error} helperTex="field is required" autoComplete="off" required label="Custom ID" value={values.ip_customer_id}
                          onChange={ChangeCustomIdHandler} />
                      </Col>
                    </Row>
                    <Row xs={5}>
                    <Col>
                        <TextField error={error} helperTex="field is required" required label="Customer Name" value={values.ip_customer_name}
                          onChange={ChangeCustomerNameHandler} />
                      </Col>
                      <Col>
                        <Form.Label >Address</Form.Label>
                        <Form.Control as="textarea" autoComplete="off" value={values.ip_customer_address}
                          onChange={ChangeCustomerAddressHandler} size="sm"/>
                      </Col>
                      <Col>
                      <FormControl error={error} helperTex="field is required">
                          <InputLabel required >Distric</InputLabel>
                          <Select autoComplete="off" className={classes.selectcontrol}
                            value={values.ip_district} onChange={ChangeDistricHandler}>
                            <option>
                            {values.ip_district}
                           </option>
                            {/* {drp.map(consigneeArea => (
                              <option key={consigneeArea.consigneeId} value={consigneeArea.consigneeId}>
                                {consigneeArea.consigneArea}
                              </option>
                            ))} */}
                          </Select>
                        </FormControl>
                      </Col>
                      <Col>
                        <TextField error={error} helperTex="field is required" autoComplete="off" required label="Phon.No" value={values.ip_phone}
                          onChange={ChangePhoneHandler} />
                      </Col>
                      <Col>
                        <TextField error={error} helperTex="field is required" autoComplete="off" required label="Mobile" value={values.ip_customer_mobile_no}
                          onChange={ChangeMobileHandler} />
                      </Col>
                    </Row>
                    <Row xs={4}>
                      <Col>
                        <TextField error={error} helperTex="field is required" autoComplete="off" required label="Citi"
                          value={values.ip_customer_city} onChange={ChangeCitiHandler} />
                      </Col>
                      <Col>
                        <TextField error={error} helperTex="field is required" autoComplete="off" required label="PinCode" value={values.ip_customer_pincode}
                          onChange={ChangepincodeHandler} />
                      </Col>
                      <Col>
                        <TextField error={error} helperTex="field is required" autoComplete="off" required label="Cridit Points" value={values.ip_credit_point}
                          onChange={ChangeCriditPointHandler} />
                      </Col>
                      <Col>
                        <TextField error={error} helperTex="field is required" autoComplete="off" required label="EmailId" value={values.ip_customer_emailId}
                          onChange={ChangeCustomerEmailIdHandler} />
                      </Col>
                    </Row>
                    <hr />
                    <Row xs={1}>
                      <Form.Label column="lg" lg={5}>KYC Image</Form.Label>
                    </Row>
                    <img src={values.id_proof} alt="" className="img" />
                  
                      <label  className="btn btn-outline-primary p-1 w-1 h-1 disabled" ><input hidden={true} type="file" onChange={ChangeImageHandler} id="input" accept="image/*" />Upload Proof</label>
                      <button disabled className="btn btn-outline-primary p-1 w-1" onClick={ViewImage}>View Image</button>
                      <button disabled className="btn btn-outline-primary p-1 w-1">Download Image</button>
                      <button className="btn btn-outline-primary p-1 w-1" disabled={processing} onClick={OnClicksaveORupdate}>{processing ? 'processing..': saveORupdate()}</button>
                    <hr/>
                  </div>
                </Container>
              </DialogContent>
            </Dialog>
        </Paper>
      </Container>
    </div>
  )
}
