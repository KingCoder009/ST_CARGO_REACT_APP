import { Button, ButtonGroup, Card, Container, FormControl, InputLabel, makeStyles, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import Sidebar from '../home/Sidebar'

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer - 1,
      color: '#fff',
    },
    formControl: {
      marginLeft: theme.spacing(2),
      margin: theme.spacing(1),
      height: "7vh",
      minWidth: 180,
      maxWidth: 200,
    },
    formControl2: {
      marginLeft: theme.spacing(5),
      margin: theme.spacing(1),
      marginTop:theme.spacing(-1),
      height: "7vh",
      minWidth: 180,
      maxWidth: 200,
    },
    buttongroup: {
      marginLeft: theme.spacing(5),
      margin: theme.spacing(1),

    },
    container: {
      minHeight: 400,
      maxHeight: 400,
    },
    table: {
      backgroundColor: "gray"
    },
    formOption: {
      fontSize: "13px",
      padding: -5
    },
    titele: {
      textAlign: "center",
      fontWeight: "bold",
      marginTop:theme.spacing(-5)
    },
    card: {
      margin:theme.spacing(1),
      minWidth: 570,
      maxWidth: 570,
      minHeight: 400,
      maxHeight: 400,
    },
    Formcard: {

    },
  }));
function MAWBclearanceEntry() {
    const classes = useStyles();
    const [TblMAWBNO, setTblMAWBNO] = useState([]);
    const [values, setValues] = useState({
      slct_shipmentCompany: "",
      ecici:"0.00",
      demurruge:"0.00",
      transport: "0.00",
      mawb_duty:"0.00",
      miscellaneous_penality:"0.00",
      miscellaneous_setting:"0.00",
      miscellaneous_labour:"0.00",
      miscellaneous_airlines:"0.00",
      miscellaneous_gatepass:"0.00",
      miscellaneous_fine:"0.00",
    });
 const ChangeShipmentHandler =(event)=>{
     setValues({...values,slct_shipmentCompany:event.target.value})
     setTblMAWBNO([])
 }
 const ChangeEciciHandler =(event)=>{
     setValues({...values,ecici:event.target.value})
     setTblMAWBNO([])
 }
 const ChangeDemurrageHandler =(event)=>{
     setValues({...values,demurruge:event.target.value})
     setTblMAWBNO([])
 }
 const ChangeTransportHandler =(event)=>{
     setValues({...values,transport:event.target.value})
     setTblMAWBNO([])
 }
 const ChangeMAWBDutyHandler =(event)=>{
     setValues({...values,mawb_duty:event.target.value})
     setTblMAWBNO([])
 }
 const ChangepenalityHandler =(event)=>{
     setValues({...values,miscellaneous_penality:event.target.value})
     setTblMAWBNO([])
 }
 const ChangeSettingHandler =(event)=>{
     setValues({...values,miscellaneous_setting:event.target.value})
     setTblMAWBNO([])
 }
 const ChangeLabourHandler =(event)=>{
     setValues({...values,miscellaneous_gatepass:event.target.value})
     setTblMAWBNO([])
 }
 const ChangeAirlinesHandler =(event)=>{
     setValues({...values,miscellaneous_airlines:event.target.value})
     setTblMAWBNO([])
 }
 const ChangeGatepassHandler =(event)=>{
     setValues({...values,miscellaneous_gatepass:event.target.value})
     setTblMAWBNO([])
 }
 const ChangeFineHandler =(event)=>{
     setValues({...values,miscellaneous_fine:event.target.value})
     setTblMAWBNO([])
 }
    return (
        <div>
            <Sidebar/>
            <div style={{marginTop:"2%"}} />
            <Container>
            <div className='navbarss'>
                <FormControl className={classes.formControl2}>
                    <InputLabel>Shipment Company</InputLabel>
                    <Select value={values.slct_shipmentCompany} onChange={ChangeShipmentHandler}>
                        <option>
                            ten
                        </option>
                    </Select>
                </FormControl>
                <Typography className={classes.titele}>MAWB-Clearance Entry</Typography>
            </div>
           
            <Card className={classes.Formcard}>
              <Row xs={2}>
                  <Col>
                  <TextField className={classes.formControl} value={values.ecici} onChange={ChangeEciciHandler} label="EICI Charge"/>
                  <TextField className={classes.formControl} value={values.demurruge} onChange={ChangeDemurrageHandler} label="Demurrage Charge"/>
                  <TextField className={classes.formControl} value={values.transport} onChange={ChangeTransportHandler} label="Transport Charge"/>
                  <TextField className={classes.formControl} value={values.mawb_duty} onChange={ChangeMAWBDutyHandler}  disabled label="MAWB Duty Amount"/>
                  <TextField className={classes.formControl} value={values.miscellaneous_penality} onChange={ChangepenalityHandler}  disabled label="Miscellaneous penality"/>
                  </Col>
                  <Col>
                  <TextField className={classes.formControl} value={values.miscellaneous_setting} onChange={ChangeSettingHandler}  label="Miscellaneous Setting Charge"/>
                  <TextField className={classes.formControl} value={values.miscellaneous_labour} onChange={ChangeLabourHandler}  label="Miscellaneous Labour Charge"/>
                  <TextField className={classes.formControl} value={values.miscellaneous_airlines} onChange={ChangeAirlinesHandler}  label="Miscellaneous Airlines Charge"/>
                  <TextField className={classes.formControl} value={values.miscellaneous_gatepass} onChange={ChangeGatepassHandler}  label="Miscellaneous Gatepass Charge"/>
                  <TextField className={classes.formControl} value={values.miscellaneous_fine} onChange={ChangeFineHandler}  disabled label="Miscellaneous Fine"/>
                  </Col>
              </Row>
              <Row xs={1}>
                <ButtonGroup size="small" variant="outlined" color="primary" className={classes.buttongroup}>
                <Button >Insert</Button>
                <Button >update</Button>
                <Button >cancel</Button>
                </ButtonGroup>
              </Row>
              <Row xs={1}>
                <ButtonGroup size="small" variant="outlined" color="primary" className={classes.buttongroup}>
                <Button >HAWB Duty Charge</Button>
                <Button >UpdateClrCarton</Button>
                <Button >UploadShortlandCertificate</Button>
                </ButtonGroup>
              </Row>
            </Card>
            <Row xs={3} style={{ marginLeft: "2px" }}>
            <Paper elevation={15} className={classes.card}>
              <TableContainer className={classes.container}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Sl.No</TableCell>
                      <TableCell>Mawb.No</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {
                      TblMAWBNO.map((MAWB) => (
                        <TableRow hover key={MAWB.consigmentId} >
                          <TableCell >{MAWB.sl_no}</TableCell>
                          <TableCell>{MAWB.consigmentNo}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            <Paper elevation={15} className={classes.card}>
              <TableContainer className={classes.container}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Sl.No</TableCell>
                      <TableCell>Invoice.No</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow hover>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Row>
          </Container>
            </div>
    )
}

export default MAWBclearanceEntry
