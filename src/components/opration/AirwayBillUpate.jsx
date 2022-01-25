import { Button, ButtonGroup, Card, Container, FormControl, InputAdornment, InputLabel, makeStyles, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap';
import MasterService from '../../services/masterservices/MasterService';
import Sidebar from '../home/Sidebar'
import OperationSrvces from '../../services/operationServices/OperationSrvces';

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
    height: "7vh",
    minWidth: 180,
    maxWidth: 200,
  },
  formControlTWO: {
    marginLeft: theme.spacing(1),
    margin: theme.spacing(1),
    height: "7vh",
    minWidth: 180,
    maxWidth: 200,
  },
  formMAwb: {
    marginLeft: theme.spacing(5),
    marginTop: theme.spacing(4),
    height: "4vh",
    minWidth: 80,
    maxWidth: 80,
  },
  selectControl: {
    marginLeft: theme.spacing(3),
    marginBottom:theme.spacing(-2),
    minWidth: 150,
    maxWidth: 250,
  },
  container: {
    minHeight: 500,
    maxHeight: 500,
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
    fontWeight: "bold"
  },
  card: {
    minWidth: 345,
    maxWidth: 345,
    minHeight: 760,
    maxHeight: 760,
  },
  Formcard: {
    minWidth: 530,
    maxWidth: 530
  },
}));
function AirwayBillUpate() {
    const classes = useStyles();
    const [drpOrigin, setOrigin] = useState([]);
    const [TblMAWBNO, setTblMAWBNO] = useState([]);
    const [values, setValues] = useState({
      drp_countryId:0,
      slct_shipmentCompany: "",
      mawb_no:"",
      shipmentCode:"",
      Mawb_booking_Date: "2017-05-24"
    });
    const drpData = async()=>{
      //countryData
      MasterService.getOrigineCountry().then((res) => {
        setOrigin(res.data);
      }).catch(() => {
      })
    }
    useEffect(() => {
      drpData();
    }, []);
  
        //get filter by origin services
    const handleOriginChange = (event) => {
      setValues({ ...values, drp_countryId: event.target.value });
      console.log('changes countryId  =>' + JSON.stringify(event.target.value));
      if (event.target.value !== 0) {
        OperationSrvces.getMAWBNOdata(event.target.value).then((res) => {
          setTblMAWBNO(res.data);
        }).catch((error) => {
          setTblMAWBNO([])
          console.log('catch block  =>' + JSON.stringify(error));
        })
      }
      else {
        setTblMAWBNO([])
        console.log('else block  =>');
      }
    };
    const ChangeShipmentCompanyHandler = (event) => {
      setValues({ ...values, slct_shipmentCompany: event.target.value })
    }
    return (
        <div>
        <Sidebar />
        <div style={{ marginTop: "5%" }} />
        <body className="responsive box-content border-4">
        <Container>
          <Paper elevation={4 }>
          <div className="navbarss">
            <FormControl focused className={classes.selectControl} >
              <InputLabel>Origin WareHouse</InputLabel>
              <Select  className={classes.formOption}
                    value={values.drp_countryId}
                    onChange={handleOriginChange} autoComplete="off">
                    {
                      drpOrigin.map((countrys) =>(
                        <option key={countrys.countryId} value={countrys.countryId}>
                          {countrys.countryName}
                        </option>
                      ))}
              </Select>
            </FormControl>
            <Typography className={classes.titele}>Mawb-Invoice Entry</Typography>
         </div>
            <Row xs={3} style={{ marginLeft: "2px" }}>
              <Card className={classes.card}>
                <TableContainer className={classes.container}>
                  <Table>
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
              </Card>
              <Card className={classes.Formcard}>
                <Row xs={2}>
                  <FormControl focused className={classes.formControl}>
                    <InputLabel value={values.slct_shipmentCompany} onChange={ChangeShipmentCompanyHandler}>Shipment Compeny</InputLabel>
                    <Select >
                      <option value="1">
                        ten
                    </option>
                    </Select>
                  </FormControl>
                  {/* <Form.Control readOnly className={classes.formMAwb} /> */}
                  <TextField label="Mawb.No" className={classes.formControl2} value={values.mawb_no}  focused
                   InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                       {values.shipmentCode}
                      </InputAdornment>
                    ),
                  }}
                  />
                </Row>
                <Row xs={2}>
                  <TextField focused label="Consigment.No" className={classes.formControl} />
                  <FormControl focused className={classes.formControl2}>
                    <InputLabel value={values.slct_shipmentCompany} onChange={ChangeShipmentCompanyHandler}>Transit Type Id</InputLabel>
                    <Select>
                      <option value="1">
                        ten
                    </option>
                    </Select>
                  </FormControl>
                </Row>
                <Row>
                  <FormControl focused className={classes.formControl}>
                    <InputLabel value={values.slct_shipmentCompany} onChange={ChangeShipmentCompanyHandler}>OriginCargo Company</InputLabel>
                    <Select>
                      <option value="1">
                        ten
                    </option>
                    </Select>
                  </FormControl>
                  <FormControl focused className={classes.formControl2}>
                    <InputLabel value={values.slct_shipmentCompany} onChange={ChangeShipmentCompanyHandler}>Destinetion</InputLabel>
                    <Select>
                      <option value="1">
                        ten
                    </option>
                    </Select>
                  </FormControl>
                </Row>
                <Row>
                  <TextField focused
                    label="Mawb Booking Date"
                    type="date"
                    value={values.Mawb_booking_Date}
                    className={classes.formControl}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField focused
                    className={classes.formControl2}
                    label="Exchange Rate"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          INR
                        </InputAdornment>
                      ),
                    }}
                  />
                </Row>
                <Row>
                  <TextField focused label="CETH NO" className={classes.formControl}/>
                  <FormControl focused className={classes.formControl2}>
                    <InputLabel  value={values.slct_shipmentCompany} onChange={ChangeShipmentCompanyHandler}>Clearance Organizetion</InputLabel>
                    <Select >
                      <option value="1">
                        ten
                    </option>
                    </Select>
                  </FormControl>
                </Row>
                <Row>
                <TextField focused
          label="Expect Arrivel Date&Time"
          type="datetime-local"
          Value="2017-05-24T10:30"
          className={classes.formControl}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField focused label="Total Invoice" className={classes.formControl2}/>
                </Row>
                <Row>
                <TextField focused label="Total Pcs" className={classes.formControl}/>
                <TextField focused label="Total Wight" className={classes.formControl2}/>
                </Row>
                <br/>
                <Row xs={1}>
                  <ButtonGroup size="small" variant="text" color="primary">
                  <Button >Load Invoice</Button>
                  <Button >update</Button>
                  <Button >cancel</Button>
                  <Button >MAWB Scan Copy</Button>
                  </ButtonGroup>
                </Row>
              </Card>
              <Card className={classes.card}>
                <TableContainer className={classes.container}>
                  <Table>
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
              </Card>
            </Row>
          </Paper>
        </Container>
        </body>
      </div>
    )
}

export default AirwayBillUpate
