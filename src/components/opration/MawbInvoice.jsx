import {
  Button, ButtonGroup,  Container, FormControl, InputAdornment,
  InputLabel, makeStyles, Paper, Select, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TextField, Typography, withStyles, Snackbar, IconButton
} from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Row ,Card, CardGroup} from 'react-bootstrap';
import CloseIcon from '@material-ui/icons/Close';
import Sidebar from '../home/Sidebar'
import OperationSrvces from '../../services/operationServices/OperationSrvces';
import { getUserId } from '../Utils/Common'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer - 1,
    color: '#fff',
  },
  formControl: {
    marginLeft: theme.spacing(5),
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
    marginBottom: theme.spacing(-2),
    minWidth: 150,
    maxWidth: 250,
  },
  container: {
    minHeight: 760,
    maxHeight: 760,
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
    minWidth: 335,
    maxWidth: 335,
    minHeight: 760,
    maxHeight: 760,
  },
  Formcard: {
    marginLeft: theme.spacing(3),
    minWidth: 520,
    maxWidth: 520
  },
  cardGroup: {
    marginLeft: theme.spacing(2.5),
    width: "100%",
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    width: 700
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


export default function MawbInvoice() {
  const classes = useStyles();
  const [drpOrigin, setOrigin] = useState([]);
  const [TblMAWBNO, setTblMAWBNO] = useState([]);
  const [TblInvoice, setTblInvoice] = useState([]);
  const [drpOrganizetion, setdrpOrganizetion] = useState([])
  const [drpShipment, setdrpShipment] = useState([]);
  const [message, setMessage] = useState('')
  const [notefy, setNotedfy] = useState(false);
  const [whareHouseId , setWhareHouse ] = useState(0)
  const [values, setValues] = useState({
    drp_countryId: 0,
    slct_shipmentCompany: "",
    slct_clearance_org: '',
    slct_transit_id: "",
    slct_transit_name: "",
    slct_origin_companyid: "",
    slct_origin_company: "",
    slct_destinetionid: "",
    slct_destinetion: "",
    mawb_no: "",
    consigmentno: "",
    consigmentid: "",
    shipmentCode: "",
    Mawb_booking_Date: "2017-05-24",
    ex_change_rate: "",
    ceth_no: "",
    expact_arrival_date_time: "2017-05-24T10:30",
    total_invoice: "",
    total_pcs: "",
    total_wight: "",
    way_bill_no: "",
  });
  const drpData = async () => {
    //countryData
    OperationSrvces.getWarehouse().then((res) => {
      setOrigin(res.data);
    }).catch(() => {
    })
    OperationSrvces.getOrganizetion().then(res => {
      setdrpOrganizetion(res.data)
    })
    OperationSrvces.getShipment().then(res => {
      setdrpShipment(res.data)
    })
  }
  useEffect(() => {
    drpData();
  }, []);

  const loadInvoice = () => {
    OperationSrvces.loadInvoice(values.consigmentno).then(res => {
    OperationSrvces.getInvoiceNO(values.consigmentno).then(res => {
      setTblInvoice(res.data)
    })
    setMessage(res.data.message)
    setNotedfy(true);
  }).catch(error=>{
    setMessage(error.message);
    setNotedfy(true);
  })
  }
  const updateMawb = () => {
    let mawbDetails = {
      consigment_no: values.consigmentno, transit_type_id: values.slct_transit_id,
      transit_date: values.Mawb_booking_Date, way_bill_no: values.way_bill_no, clearance_org_id: values.slct_clearance_org, destination_id: values.slct_destinetionid,
      exachange_rate: values.ex_change_rate, createdby: getUserId(), ceth_no: values.ceth_no, consigment_id: values.consigmentid, origin_id: values.slct_origin_companyid,
      expactedArrivelDateAndTime: values.expact_arrival_date_time, total_carton: values.total_pcs, totalWight: values.total_wight, total_invoice: values.total_invoice, shipmentCompanyid: values.slct_shipmentCompany
    }
    OperationSrvces.updateMAWB(mawbDetails).then(res => {
      OperationSrvces.getMAWBNOdata(whareHouseId).then((res) => {
        setTblMAWBNO(res.data);
      }).catch((error) => {
        setTblMAWBNO([])
        console.log('catch block  =>' + JSON.stringify(error));
      })
      console.log(JSON.stringify("MAWB-Updated " + res.data));
      setMessage(res.data.message)
      setNotedfy(true);
      setTblInvoice([])
      setValues({
        drp_countryId: 0,
        slct_shipmentCompany: "",
        slct_clearance_org: '',
        slct_transit_id: "",
        slct_transit_name: "",
        slct_origin_companyid: "",
        slct_origin_company: "",
        slct_destinetionid: "",
        slct_destinetion: "",
        mawb_no: "",
        consigmentno: "",
        consigmentid: "",
        shipmentCode: "",
        Mawb_booking_Date: "2017-05-24",
        ex_change_rate: "",
        ceth_no: "",
        expact_arrival_date_time: "2017-05-24T10:30",
        total_invoice: "",
        total_pcs: "",
        total_wight: "",
        way_bill_no: "",
      })
    })
  }
  const getInvoice = (MAWB) => {
    let Updat_Mawbno = MAWB.way_bill_no;
    const SplitMawbno = Updat_Mawbno.split("-")
    setValues({
      consigmentid: MAWB.consigment_id,
      consigmentno: MAWB.consigment_no,
      mawb_no:SplitMawbno[1],
      slct_shipmentCompany: MAWB.shipmentCompanyid,
      shipmentCode:SplitMawbno[0],
      slct_transit_id: MAWB.transit_type_id,
      slct_transit_name: MAWB.transit_type_name,
      slct_origin_companyid: MAWB.origin_id,
      slct_origin_company: MAWB.origin_name,
      slct_destinetionid: MAWB.destination_id,
      slct_destinetion: MAWB.custom_point_name,
      Mawb_booking_Date: MAWB.transit_date,
      ex_change_rate: MAWB.exachange_rate,
      ceth_no: MAWB.ceth_no,
      slct_clearance_org: MAWB.clearance_org_id,
      expact_arrival_date_time: MAWB.expactedArrivelDateAndTime,
      total_invoice: MAWB.total_invoice,
      total_pcs: MAWB.total_carton,
      total_wight: MAWB.total_wight,
      way_bill_no: MAWB.way_bill_no
    })
    OperationSrvces.getInvoiceNO(MAWB.consigment_no).then(res => {
      setTblInvoice(res.data)
    })
  }
  const EditMawb = ( MAWB) => {
    let Updat_Mawbno = MAWB.way_bill_no;
    const SplitMawbno = Updat_Mawbno.split("-")
        setValues({
      drp_countryId:MAWB,
      mawb_no:SplitMawbno[1],
      consigmentid: MAWB.consigment_id,
      consigmentno: MAWB.consigment_no,
      slct_shipmentCompany: MAWB.shipmentCompanyid,
      shipmentCode:SplitMawbno[0],
      slct_transit_id: MAWB.transit_type_id,
      slct_transit_name: MAWB.transit_type_name,
      slct_origin_companyid: MAWB.origin_id,
      slct_origin_company: MAWB.origin_name,
      slct_destinetionid: MAWB.destination_id,
      slct_destinetion: MAWB.custom_point_name,
      Mawb_booking_Date: MAWB.transit_date,
      ex_change_rate: MAWB.exachange_rate,
      ceth_no: MAWB.ceth_no,
      slct_clearance_org: MAWB.clearance_org_id,
      expact_arrival_date_time: MAWB.expactedArrivelDateAndTime,
      total_invoice: MAWB.total_invoice,
      total_pcs: MAWB.total_carton,
      total_wight: MAWB.total_wight,
      way_bill_no: MAWB.way_bill_no
    })
  }

  //get filter by origin services
  const handleOriginChange = (event) => {
    setWhareHouse(event.target.value)
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
      console.log('else block  =>')
    }
  }

    // notificetion controller  
    const notefyClose = () => {
      setNotedfy(false);
    };

  const ChangeShipmentCompanyHandler = (event) => {
    const filteredValue = drpShipment.find((node) => node.shipment_company_id === event.target.value);
    setValues({ ...values, slct_shipmentCompany: event.target.value, shipmentCode: filteredValue.s_company_code })
  }
  const ChangeConsignmentNoHanler = (event) => {
    setValues({ ...values, consigmentno: event.target.value })
  }
  const ChangeMawbNoHandler = (event) => {
    setValues({ ...values, mawb_no: event.target.value })
  }
  const ChangeMawbBookingDateHandler = (event) => {
    setValues({ ...values, Mawb_booking_Date: event.target.value })
  }
  const ChangeExchangeRateHandler = (event) => {
    setValues({ ...values, ex_change_rate: event.target.value })
  }
  const ChangeCethNoHanler = (event) => {
    setValues({ ...values, ceth_no: event.target.value })
  }
  const ChangeClearanceOrgHandler = (event) => {
    setValues({ ...values, slct_clearance_org: event.target.value })
  }
  const ChangeExpactArrivalDateTimeHandler = (event) => {
    setValues({ ...values, expact_arrival_date_time: event.target.value })
  }
  const ChangeTotalInvoviceHandler = (event) => {
    setValues({ ...values, total_invoice: event.target.value })
  }
  const ChangeTotalPcsHandler = (event) => {
    setValues({ ...values, total_pcs: event.target.value })
  }
  const ChangeTotalWightHandler = (event) => {
    setValues({ ...values, total_wight: event.target.value })
  }
  const cancel = ()=>{
    setTblInvoice([])
    setValues({
      drp_countryId: 0,
      slct_shipmentCompany: "",
      slct_clearance_org: '',
      slct_transit_id: "",
      slct_transit_name: "",
      slct_origin_companyid: "",
      slct_origin_company: "",
      slct_destinetionid: "",
      slct_destinetion: "",
      mawb_no: "",
      consigmentno: "",
      consigmentid: "",
      shipmentCode: "",
      Mawb_booking_Date: "2017-05-24",
      ex_change_rate: "",
      ceth_no: "",
      expact_arrival_date_time: "2017-05-24T10:30",
      total_invoice: "",
      total_pcs: "",
      total_wight: "",
      way_bill_no: "",
    })
  }
  return (
    <div>
      <Sidebar />
      <div style={{ marginTop: "5%" }} />
      <body className="responsive box-content border-4">
        <Container>
          <Paper elevation={4}>
            <div className="navbarss">
              <FormControl  className={classes.selectControl} >
                <InputLabel>Origin WareHouse</InputLabel>
                <Select className={classes.formOption}
                  value={whareHouseId} 
                  onChange={handleOriginChange} autoComplete="off">
                  {
                    drpOrigin.map((origin) => (
                      <option key={origin.warehouse_id} value={origin.warehouse_id}>
                        {origin.warehouse_name}
                      </option>
                    ))}
                </Select>
              </FormControl>
              <Typography className={classes.titele}>Mawb-Invoice Entry</Typography>
            </div>
            {/* table */}
            {/* <Row xs={3} style={{ marginLeft: "2px" }}> */}
            <CardGroup className={classes.cardGroup}>
              <Card border="dark" className={classes.card}>
              <TableContainer className={classes.container}>
                  <Table stickyHeader >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Sl.No</StyledTableCell>
                        <StyledTableCell>Mawb.No</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        TblMAWBNO.map((MAWB) => (
                          <StyledTableRow hover key={MAWB.consigment_id} onClick={() => EditMawb(MAWB)} onDoubleClick={() => getInvoice(MAWB)}>
                            <TableCell style={{fontWeight:"bold",color:"blue"}}>{MAWB.sl_No}</TableCell>
                            <TableCell style={{fontWeight:"bold",color:"blue"}}>{MAWB.consigment_no}</TableCell>
                          </StyledTableRow>
                        ))}
                    </TableBody>
                  </Table>
                  </TableContainer>
              </Card>
              {/* inputfileds */}
              <Card border="dark" className={classes.Formcard}>
                <Row xs={2}>
                  {/* shipmentCompany */}
                  <FormControl  className={classes.formControl}>
                    <InputLabel >Shipment Compeny</InputLabel>
                    <Select  value={values.slct_shipmentCompany} onChange={ChangeShipmentCompanyHandler}>
                      {drpShipment.map((shipmnt, index) => (
                        <option value={shipmnt.shipment_company_id} key={index} data-index={index}>
                          {shipmnt.s_company_name}
                        </option>))}
                    </Select>
                  </FormControl>
                  {/* <Form.Control readOnly className={classes.formMAwb} /> */}
                  <TextField label="Mawb.No" className={classes.formControl2} value={values.mawb_no} 
                    onChange={ChangeMawbNoHandler}
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
                  <TextField disabled label="Consigment.No" value={values.consigmentno} onChange={ChangeConsignmentNoHanler} className={classes.formControl} />
                  <FormControl  className={classes.formControl2}>
                    <InputLabel >Transit Type Id</InputLabel>
                    <Select value={values.slct_transit_id} >
                      <option value={values.slct_transit_id}>
                        {values.slct_transit_name}
                      </option>
                    </Select>
                  </FormControl>
                </Row>
                <Row>
                  <FormControl  className={classes.formControl}>
                    <InputLabel>OriginCargo Company</InputLabel>
                    <Select value={values.slct_origin_companyid}>
                      <option value={values.slct_origin_companyid}>
                        {values.slct_origin_company}
                      </option>
                    </Select>
                  </FormControl>
                  <FormControl  className={classes.formControl2}>
                    <InputLabel >Destinetion</InputLabel>
                    <Select value={values.slct_destinetionid} >
                      <option value={values.slct_destinetionid}>
                        {values.slct_destinetion}
                      </option>
                    </Select>
                  </FormControl>
                </Row>
                <Row>
                  <TextField 
                    label="Mawb Booking Date"
                    type="date"
                    value={values.Mawb_booking_Date}
                    onChange={ChangeMawbBookingDateHandler}
                    className={classes.formControl}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField 
                    className={classes.formControl2}
                    value={values.ex_change_rate}
                    onChange={ChangeExchangeRateHandler}
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
                  <TextField  label="CETH NO" value={values.ceth_no} onChange={ChangeCethNoHanler} className={classes.formControl} />
                  <FormControl  className={classes.formControl2}>
                    <InputLabel  >Clearance Organizetion</InputLabel>
                    <Select value={values.slct_clearance_org} onChange={ChangeClearanceOrgHandler}>
                      {drpOrganizetion.map((orgs) => (
                        <option value={orgs.organizationId} key={orgs.organizationId}>
                          {orgs.organizationName}
                        </option>))}
                    </Select>
                  </FormControl>
                </Row>
                <Row>
                  <TextField 
                    label="Expect Arrivel Date&Time"
                    type="datetime-local"
                    value={values.expact_arrival_date_time}
                    onChange={ChangeExpactArrivalDateTimeHandler}
                    className={classes.formControl}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField  value={values.total_invoice} onChange={ChangeTotalInvoviceHandler} label="Total Invoice" className={classes.formControl2} />
                </Row>
                <Row>
                  <TextField  label="Total Pcs" value={values.total_pcs} onChange={ChangeTotalPcsHandler} className={classes.formControl} />
                  <TextField  label="Total Wight" value={values.total_wight} onChange={ChangeTotalWightHandler} className={classes.formControl2} />
                </Row>
                <br />
                <Snackbar
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
                  open={notefy} autoHideDuration={6000} message={message}
                  action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={notefyClose}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  } />
                  <ButtonGroup size="small" variant="contained"  style={{marginLeft:"10%"}}>
                    <Button className='btn btn-success' onClick={loadInvoice}>Load Invoice</Button>
                    <Button className='btn btn-danger' onClick={updateMawb}>update</Button>
                    <Button className='btn btn-primary' onClick={cancel}>cancel</Button>
                    <Button className='btn btn-info' >MAWB Scan Copy</Button>
                  </ButtonGroup>
              </Card>
              <Card border="dark" className={classes.card}>
                <TableContainer className={classes.container}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Sl.No</StyledTableCell>
                        <StyledTableCell>Invoice.No</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {TblInvoice.map((invoice) => (
                        <StyledTableRow hover key={invoice.invoice_id}>
                          <TableCell style={{fontWeight:"bold",color:"blue"}}>{invoice.sl_no}</TableCell>
                          <TableCell style={{fontWeight:"bold",color:"blue"}}>{invoice.invoice_no}</TableCell>
                        </StyledTableRow>))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </CardGroup>
          </Paper>
        </Container>
      </body>
    </div>
  )
}
