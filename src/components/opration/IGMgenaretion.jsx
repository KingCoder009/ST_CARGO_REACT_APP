import React, { useState, useEffect } from 'react';
import {getUserId} from '../../components/Utils/Common';
import {
  InputLabel, TextField, Typography, Toolbar, Divider,
  makeStyles, Table, TableBody, TableCell, TableHead, TableRow, TableContainer,
  FormControl, Select, Snackbar, IconButton, TablePagination, Checkbox, withStyles
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Sidebar from '../home/Sidebar'
import { Form, Card, Row, Button, ButtonGroup, CardGroup } from "react-bootstrap";
import { AiFillCloseSquare } from 'react-icons/ai';
import OperationSrvces from '../../services/operationServices/OperationSrvces';


const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer - 1,
    backgroundColor: "pink",
    color: '#fff',
  },
  formControl: {
    margin: theme.spacing(0),
    height: "7vh",
    minWidth: 10,
    maxWidth: 10,
  },
  textField: {
    margin: theme.spacing(0),
    height: "7vh",
    minWidth: "25vh",
    maxWidth: "25vh",
  },
  formMAwb: {
    height: "4vh",
    minWidth: 130,
    maxWidth: 150,
  },
  formSelect: {
    marginTop: theme.spacing(-2),
    marginLeft: theme.spacing(4),
    padding: theme.spacing(-3),
    minWidth: 150,
    maxWidth: 250,
  },
  container: {
    height: "80vh",
  },
  INVOICEcontainer: {

    height: "80vh",
  },
  ViweINVOICEcontainer: {

    height: "75vh",
  },
  igmtable: {
    margin: theme.spacing(0),
    width: "100%",
    minHeight: 290,
    maxHeight: 290,
  },
  viweIGM: {
    margin: theme.spacing(1),
    width: "90%",
    minHeight:290,
    maxHeight: 290,
  },
  ViewIGMtblCard: {
    zIndex: theme.zIndex.drawer - 1,
    marginTop: theme.spacing(-8),
    marginLeft: theme.spacing(-2),
    width: "104%",
    minHeight:"50vh",
    maxHeight: "100vh",
  },
  ViweINVOICEcard: {
    zIndex: theme.zIndex.drawer - 1,
  },
  formOption: {
    fontSize: "13px",
    padding: -5
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(9),
    textAlign: "left",
  },
  card: {
    minWidth: "10vh",
    maxWidth:"40vh"
  },
  CardForm: {
    minWidth: "60vh",
    maxWidth:"110vh"
  },
  cardGroup: {
    marginLeft: theme.spacing(4),
    width: "95%",
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

function IGMgenaretion(props) {
  const classes = useStyles();
  const [selectedInvoice, setSelectedInvoice] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [notefy, setNotedfy] = useState(false);
  const [validated, setValidated] = useState(false);
  const [drpShipment, setDrpShipment] = useState([]);
  // const [drpcountry, setDrpcountry] = useState([]);
  const [TblMAWBNO, setTblMAWBNO] = useState([]);
  const [tblIGM, setTBLigm] = useState([]);
  const [valide, setValide] = useState(false);
  const [tblInvoice, setInvoice] = useState([]);
  const [ showViweIGM ,setShowViweIgm] = useState(false);
  const [hideIgm , setHideIGm] = useState(true);
  const [ViewTblIGM, setViewTblIGM] = useState([]);
  const [ViweTblInvoice, setViweTblInvoice] = useState([]);
  const [MAWBno, setMAWB_No] = useState({
               MAWBNO:""
              });
  const [InvoceId, setInvoiceValue] = useState({
    InvoiceId:""
  });
  const [values, setValues] = useState({
    drp_shipment_id: "",
    txt_igm_id: 0,
    txt_igm_No: "",
    txt_Flight_Number: "",
    txt_Date_arrivel: "",
    txt_Infomsg: "",
  });

  // get all dropdown values services
  const getAlldata = async () => {
    //countryData
    OperationSrvces.getWarehouse().then(res=>{
      setDrpShipment(res.data);
    })
    
  };
  useEffect(() => {
    getAlldata();
  }, []);


  const viewIgmDetails =() =>{
    setShowViweIgm(true);
    setHideIGm(false);
    OperationSrvces.getIGMNo().then((res)=>{
      setViewTblIGM(res.data);
    })
  };
  
  const closeCard =() =>{
    setShowViweIgm(false);
    setHideIGm(true);
  };
  const AssignIgm =() =>{
    var invicId = InvoceId.carton_id;
    var Invic_id = invicId.toString();
    let Assign_igm = {invoiceId_And_MAWB_No: Invic_id ,igm_no:values.txt_igm_No};
    console.log("invoicId "+JSON.stringify(Invic_id));
    console.log("invoicId "+Invic_id);
    if(!InvoceId.InvoiceId){
      setValues({ 
        drp_shipment_id: "",
        txt_igm_id: 0,
        txt_igm_No: "",
        txt_Flight_Number: "",
        txt_Date_arrivel: "",
      txt_Infomsg:"Select a Invoice.No"})
      setNotedfy(true);
      setValidated(true);
    }
    else if(!values.txt_igm_No){
      setValues({
      drp_shipment_id: "",
      txt_igm_id: 0,
      txt_igm_No: "",
      txt_Flight_Number: "",
      txt_Date_arrivel: "",
      txt_Infomsg:"Select a IGM.No"})
      setNotedfy(true);
      setValidated(true);
    }
    else if(!MAWBno.MAWBNO){
      setValues({
        drp_shipment_id: "",
        txt_igm_id: 0,
        txt_igm_No: "",
        txt_Flight_Number: "",
        txt_Date_arrivel: "",
      txt_Infomsg:"Select a MAWB.No"})
      setNotedfy(true);
      setValidated(true);
    }
    else{
    OperationSrvces.assignInvoiceBasedIgm(Assign_igm).then((res)=>{
      // setValues({txt_Infomsg:res.data.message})
      // setNotedfy(true)
      OperationSrvces.loadInvoice(MAWBno.MAWBNO).then((res)=>{
        setInvoice(res.data);
      })
    }).catch(error=>{
      setValues({ 
      drp_shipment_id: "",
      txt_igm_id: 0,
      txt_igm_No: "",
      txt_Flight_Number: "",
      txt_Date_arrivel: "",
      txt_Infomsg:error.message})
      setNotedfy(true);
      setValidated(true);
    })
  }
  };
  const remove_igm =() =>{
    var invicId = InvoceId.InvoiceId;
    var Invic_id = invicId.toString();
    console.log("igm = "+values.txt_igm_id)
    console.log("Invoice = "+Invic_id)
    if(values.txt_igm_id===0 || !values.txt_igm_id){
      setValues({txt_Infomsg:"Select a IGM.No"})
      setViweTblInvoice([])
      setNotedfy(true);
    }
    else if(!InvoceId.InvoiceId){
      setValues({txt_Infomsg:"Select a Invoice.No"})
      setNotedfy(true);
    }
    else{
      OperationSrvces.removeIgm(Invic_id,values.txt_igm_id).then(res=>{
       OperationSrvces.getInvoiceBasedIgm(values.txt_igm_id).then(res =>{
         setViweTblInvoice(res.data);
         setNotedfy(false);
       }).catch(error=>{
         setValues({txt_Infomsg:error.message})
         setNotedfy(true);
       })
      })
     }
  };
  //Insert MAWB serveces and get MAWB services
  const IGMSave = () => {
    let IGMGenaretyion = {mawbNo: MAWBno.MAWBNO,
      igm_no: values.txt_igm_No, flightNo: values.txt_Flight_Number,
      dateOfArivel:  values.txt_Date_arrivel ,cratedBy:getUserId()};
    if(!values.txt_igm_No && !values.txt_Flight_Number && !values.txt_Date_arrivel ){
      setValues({
        drp_shipment_id: "",
        txt_igm_id: 0,
        txt_igm_No: "",
        txt_Flight_Number: "",
        txt_Date_arrivel: "",
      });
      setValidated(true);
      setNotedfy(false);
    }
    else{
    OperationSrvces.addIgmNO(IGMGenaretyion).then((res) => {
      setValues({
        drp_shipment_id: "",
        txt_igm_id: 0,
        txt_igm_No: "",
        txt_Flight_Number: "",
        txt_Date_arrivel: "",
        txt_Infomsg: res.data.message
      });
      setNotedfy(true);
      setValide(false);
      setValidated(false);
      OperationSrvces.getIGMNo().then((res) => {
        setTBLigm(res.data)
      })
    }).catch((error) => {
      if(!values.txt_igm_No && !values.txt_Flight_Number && !values.txt_Airport_arrival && !values.txt_Date_arrivel ){
        setValues({
          drp_shipment_id: "",
          txt_igm_id: 0,
          txt_igm_No: "",
          txt_Flight_Number: "",
          txt_Date_arrivel: "",
        });
        setValidated(true);
        setNotedfy(false);
        
      }
      else{
      setValues({
        drp_shipment_id: "",
        txt_igm_id: 0,
        txt_igm_No: "",
        txt_Flight_Number: "",
        txt_Date_arrivel: "",
        txt_Infomsg: error.message
      });
      setValidated(true);
      setNotedfy(true);
      setValide(true);
    }
    })
  }
  };
  //UPDATE MAWB and Get MAWB Services
  const IGM_update = () => {
    let updateInvoice = {mawbNo: MAWBno.MAWBNO,
      igm_no: values.txt_igm_No, flightNo: values.txt_Flight_Number,
      dateOfArivel:  values.txt_Date_arrivel,cratedBy:getUserId()};

    if(values.txt_igm_id === 0 && !values.txt_igm_No && !values.txt_Flight_Number && !values.txt_Date_arrivel ){
      setValues({
        drp_shipment_id: "",
        txt_igm_id: 0,
        txt_igm_No: "",
        txt_Flight_Number: "",
        txt_Date_arrivel: "",
        txt_First_port_of_Arrivel: "",
      });
      setValidated(true);
      setNotedfy(false);
    }
    else{
    OperationSrvces.updateIGM(values.txt_igm_id, updateInvoice).then((res) => {
      setValues({
        drp_shipment_id: "",
        txt_igm_id: 0,
        txt_igm_No: "",
        txt_Flight_Number: "",
        txt_Date_arrivel: "",
        txt_Infomsg: res.data.message
      });
      setValidated(false);
      setNotedfy(true);
      OperationSrvces.getIGMNo().then((res) => {
        setTBLigm(res.data);
      })
    }).catch((error) => {
      setValues({
        drp_shipment_id: "",
        txt_igm_id: 0,
        txt_igm_No: "",
        txt_Flight_Number: "",
        txt_Date_arrivel: "",
        txt_Infomsg: error.message
      })
      setNotedfy(true);
      setValidated(true);
    })
  }
  };
  //delete MAWB and get MAWB services
  const IGM_delete = () => {
    if(values.txt_igm_id === 0){
      setValues({
        drp_shipment_id: "",
        txt_igm_id: 0,
        txt_igm_No: "",
        txt_Flight_Number: "",
        txt_Date_arrivel: "",
        txt_Infomsg: "select a igm"
      })
      setNotedfy(true)
      setValidated(true);
    }
    else{
    OperationSrvces.deleteIGMno(values.txt_igm_id).then((res) => {
      setValues({
        drp_shipment_id: "",
        txt_igm_id: 0,
        txt_igm_No: "",
        txt_Flight_Number: "",
        txt_Date_arrivel: "",
        txt_Infomsg: res.data.message
      })
      setNotedfy(true)
      setValidated(false);
      OperationSrvces.getIGMNo().then((res) => {
        setTBLigm(res.data);
      })
    }).catch((e) => {
      if(values.txt_igm_id===0){
      setValues({
        drp_shipment_id: "",
        txt_igm_id: 0,
        txt_igm_No: "",
        txt_Flight_Number: "",
        txt_Date_arrivel: "",
        txt_Infomsg:"",
      });
      setValidated(true);
      setNotedfy(false);
    }else{
      setValues({
        drp_shipment_id: "",
        txt_igm_id: 0,
        txt_igm_No: "",
        txt_Flight_Number: "",
        txt_Date_arrivel: "",
        txt_Infomsg: e.message
      });
      setValidated(true);
      setNotedfy(true);
    }
    })
  }
  };
  // notificetion controller  
  const notefyClose = () => {
    setNotedfy(false);
  };

 
  //get MAWB_No services
  const ChangeShipmentHandler = (event) => {
    setValues({ ...values, drp_shipment_id: event.target.value })
    OperationSrvces.getMAWBNOdata(event.target.value).then((res) => {
      setTblMAWBNO(res.data);
    }).catch((error) => {
      setValues({ txt_Infomsg: error.message })
      setTblMAWBNO([]);
    })
  };
 
  const DateChangeHandler = (event) => {
    setValues({ ...values, txt_Date_arrivel: event.target.value });
  };
  const ChangeIGMHandle = (e) => {
    setValues({ ...values, txt_igm_No: e.target.value });
  }

  const ChangeFlightNumberHandle = (e) => {
    setValues({ ...values, txt_Flight_Number: e.target.value });
  }


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // const SelectedAllChangeHandler = (event) => {
  //   setCheckAll(event.target.checked)

  //   const AllMAWB = TblMAWBNO.map((mawb) => mawb.consigmentNo);

  //   console.log("MAWB ALL " + JSON.stringify(AllMAWB))

  // }
  // const SelectedChangeHandler=(event) =>{
  //   setSelected(event.target.checked)
  //   console.log("selected check = "+JSON.stringify());
  // }
  //To get to details parameterd and delete details then get invoice num
  const editIGM = (igm) => {
    setValues({
      txt_igm_id: igm.igm_id,
      txt_igm_No: igm.igm_no,
      txt_Airlines_name: igm.airlinesName,
      txt_Airport_shipment: igm.airPortofShipment,
      txt_Flight_Number: igm.flightNo,
      txt_Airport_arrival: igm.airPortofArrivel,
      txt_Date_arrivel: igm.dateOfArivel,
      txt_Time_arrival: igm.timeofArrivel,
      txt_First_port_of_Arrivel: igm.firstPortOfArrivel,
    })
  }
  const getInvoiceBasedIgm = (igm) => {
    setValues({txt_igm_id:igm.igm_id})
 if(igm.igm_id===0){
   setValues({txt_Infomsg:"Select a igm"})
   setNotedfy(true);
 }else{
    OperationSrvces.getInvoiceBasedIgm(igm.igm_id).then(res =>{
      setViweTblInvoice(res.data);
      setNotedfy(false);
    }).catch(error=>{
      setValues({txt_Infomsg:error.message})
      setNotedfy(true);
    })
  }
    // setValues({
    //   txt_igm_id: igm,
    //   txt_igm_No: igm,
    //   txt_Airlines_name: igm,
    //   txt_Airport_shipment: igm,
    //   txt_Flight_Number: igm,
    //   txt_Airport_arrival: igm,
    //   txt_Date_arrivel: igm,
    //   txt_Time_arrival: igm,
    //   txt_First_port_of_Arrivel: igm,
    // })
  }
  //reset all parameters
  const reset = () => {
    setValues({
      drp_countryId: "",
      drp_filtrBYorginID: "",
      drp_getAllOrigin: -1,
      drp_shipment_id: "",
      txt_igm_id: 0,
      txt_igm_No: "",
      txt_Airlines_name: "",
      txt_Flight_Number: "",
      txt_Airport_arrival: "",
      txt_Airport_shipment: "",
      txt_Date_arrivel: "",
      txt_Time_arrival: "",
      txt_First_port_of_Arrivel: "",
      txt_Infomsg: ""
    });
    setMAWB_No({MAWBNO:""})
    setDrpShipment([])
    setInvoice([]);
    setNotedfy(false);
    setValide(false);
    setValidated(false);
  }
  //isDisbale on igm id never pass 
  const isDisable = () => {
    if (values.txt_igm_id === 0 || !values.txt_igm_id) {
      return true
    } else {
      return false
    }
  };
  //is not Disable on igm id pass
  const submit = () => {
    if (values.txt_igm_id === 0 || !values.txt_igm_id) {
      return false
    } else {
      return true
    }
  };

  const SlectedMAWBClick = (MAWB) => {
    setMAWB_No({MAWBNO: MAWB.consigment_no})
    OperationSrvces.getUnUpdatedIGM_invoice(MAWB.consigment_no).then((res)=>{
      setInvoice(res.data);
    })
    OperationSrvces.getIGMNo(MAWB.consigment_no).then((res)=>{
      setTBLigm(res.data);
    })
 
  };
  const AllInvoiceHandle = (event) => {
    if (event.target.checked) {
      const ALLInvoice = tblInvoice.map((n) => n.carton_id);
      setSelectedInvoice(ALLInvoice);
      console.log("eeb = "+ALLInvoice);
      setInvoiceValue({InvoiceId:ALLInvoice})
      return;
    }
    setSelectedInvoice([]);
  };
  const AllInvoiceBasedIgmHandle = (event) => {
    if (event.target.checked) {
      const ALLInvoice = ViweTblInvoice.map((n) => n.carton_id);
      setSelectedInvoice(ALLInvoice);
      console.log("eeb = "+ALLInvoice);
      setInvoiceValue({InvoiceId:ALLInvoice})
      return;
    }
    setSelectedInvoice([]);
  };

  const SlectedInvoiClick = (event, carton_id) => {
    const selectedIndex = selectedInvoice.indexOf(carton_id);
    let SelectedInvc= [];

    if (selectedIndex === -1) {
      SelectedInvc = SelectedInvc.concat(selectedInvoice, carton_id);
      console.log("===-1 " + SelectedInvc)
      setInvoiceValue({InvoiceId:SelectedInvc})
    }
    else if (selectedIndex === 0) {
      SelectedInvc = SelectedInvc.concat(selectedInvoice.slice(1));
      console.log(" " + SelectedInvc)
      setInvoiceValue({InvoiceId:SelectedInvc})
    }
    else if (selectedIndex === selectedInvoice.length - 1) {
      SelectedInvc = SelectedInvc.concat(selectedInvoice.slice(0, -1));
      console.log("length-1 " + SelectedInvc)
      setInvoiceValue({InvoiceId:SelectedInvc})
    }
    else if (selectedIndex > 0) {
      SelectedInvc = SelectedInvc.concat(selectedInvoice.slice(0, selectedIndex), selectedInvoice.slice(selectedIndex + 1),);
      console.log(">0 " + SelectedInvc)
      setInvoiceValue({InvoiceId:SelectedInvc})
    }

    setSelectedInvoice(SelectedInvc);
  };
  const isInvoiceSelected = (carton_id) => selectedInvoice.indexOf(carton_id) !== -1;
  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div>
        <body className="responsive box-content border-4">
          <div className="navbarss">
            <Toolbar>
              <FormControl required className={classes.formSelect}>
                <InputLabel >Shipment Company</InputLabel>
                <Select error={valide} required className={classes.formOption}
                  value={values.drp_shipment_id}
                  onChange={ChangeShipmentHandler} autoComplete="off">
                  {
                    drpShipment.map((orgin) =>
                      <option key={orgin.warehouse_id}
                        value={orgin.warehouse_id} autoComplete="off">
                        {orgin.warehouse_name}
                      </option>
                    )
                  }
                </Select>
              </FormControl>
              <Typography className={classes.title} >
                IGM-GENERATION
              </Typography>
            </Toolbar>
          </div>
          <CardGroup className={classes.cardGroup}>
            {/*1st table */}
            <Card border="dark" className={classes.card}>
            {hideIgm ? <div> <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table" size="small">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Sl.no</StyledTableCell>
                      <StyledTableCell >MAWB.No</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      TblMAWBNO.map((MAWB) => {
                        return(
                        <StyledTableRow hover key={MAWB.consigment_id} onClick={() => SlectedMAWBClick(MAWB)}>
                          <StyledTableCell >{MAWB.sl_No}</StyledTableCell>
                          <StyledTableCell>{MAWB.consigment_no}</StyledTableCell>
                        </StyledTableRow>
                       ) })}
                  </TableBody>
                </Table>
              </TableContainer>
              </div> : null}
            </Card>
            {/* input values  */}
            <Card border="dark" className={classes.CardForm}>
              <Card.Body>
                <Form noValidate validated={validated} style={{marginTop:"-10px"}}>
                  <Row xs={1}>
                    <Form.Group md="1"  >
                      <Form.Label>IGM.NO*</Form.Label>
                      <Form.Control size="sm" required value={values.txt_igm_No} onChange={ChangeIGMHandle} />
                      <Form.Control.Feedback type="invalid" >
                        Please enter aIGM.NO
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row xs={1}>
                    <Form.Group md="3"   >
                      {/************************************ */}
                      <FormControl required className={classes.formControl}>
                        <TextField error={valide}   
                          label="Date of Arrivel"
                          type="datetime-local"
                          required
                          value={values.txt_Date_arrivel}
                          onChange={DateChangeHandler}
                          className={classes.textField}
                          InputLabelProps={{ shrink: true, }}
                        />
                      </FormControl>
                    </Form.Group>
                  </Row>
                  <Row xs={1}>
                    <Form.Group md="3"  >
                      {/************************************ */}
                      <Form.Label>FlightNumber*</Form.Label>
                      <Form.Control size="sm" required value={values.txt_Flight_Number} onChange={ChangeFlightNumberHandle} />
                      <Form.Control.Feedback type="invalid" >
                        Please enter a FlightNumber.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
                    open={notefy} autoHideDuration={6000} message={values.txt_Infomsg}
                    action={
                      <IconButton size="small" aria-label="close" color="inherit" onClick={notefyClose}>
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    } />
                 {hideIgm ? <div><ButtonGroup bsPrefix>
                    <Button className=" p-1" disabled={submit()} onClick={IGMSave}>Save IGM</Button>
                    <Button className=" p-1" onClick={reset}>Rest ALL</Button>
                    <Button className=" p-1" disabled={isDisable()} onClick={IGM_update}>Update IGM</Button>
                    <Button className="btn btn-danger p-1" disabled={isDisable()} onClick={IGM_delete}>Delet IGM</Button>
                    <Button className="btn-denger p-1" onClick={AssignIgm}>Assign igm.no for invoive</Button>
                  {/* */}
                </ButtonGroup> </div> :null}
                </Form>
      {/************** IGM Table ******************/}
                
      {hideIgm ? <Card> <TableContainer className={classes.igmtable}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <StyledTableRow>
                        <StyledTableCell align="left">Sl.no</StyledTableCell>
                        <StyledTableCell align="left">IGM.No</StyledTableCell>
                        <StyledTableCell align="left">Flight.No</StyledTableCell>
                        <StyledTableCell align="left">TimeOfArrivel</StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody >
                      {tblIGM.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((igm) =>(
                        <StyledTableRow hover key={igm.igm_id} onClick={() => editIGM(igm)}>
                          <StyledTableCell align="center">{igm.sl_No}</StyledTableCell>
                          <StyledTableCell align="center">{igm.igm_no}</StyledTableCell>
                          <StyledTableCell align="center">{igm.flightNo}</StyledTableCell>
                          <StyledTableCell align="center">{igm.timeofArrivel}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Divider />
                <Card.Footer className="form-inline">
                <TablePagination
                  rowsPerPageOptions={[10, 15]}
                  component="div"
                  count={tblIGM.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
                </Card.Footer>
                <Button className="p-1"  onClick={viewIgmDetails}>view igm details</Button> 
                </Card> :null}
                  {showViweIGM ? <Card className={classes.ViewIGMtblCard}>
                  <Card.Header>
                  <AiFillCloseSquare size="20" onClick={closeCard} />
                  </Card.Header> 
                <TableContainer className={classes.viweIGM}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <StyledTableRow>
                        <StyledTableCell align="left">Sl.no</StyledTableCell>
                        <StyledTableCell align="left">IGM.No</StyledTableCell>
                        <StyledTableCell align="left">Flight.No</StyledTableCell>
                        <StyledTableCell align="left">TimeOfArrivel</StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody >
                      {ViewTblIGM.map((igm) =>(
                        <StyledTableRow hover key={igm.igm_id} onClick={() => getInvoiceBasedIgm(igm)}>
                          <StyledTableCell align="center">{igm.sl_No}</StyledTableCell>
                          <StyledTableCell align="center">{igm.igm_no}</StyledTableCell>
                          <StyledTableCell align="center">{igm.flightNo}</StyledTableCell>
                          <StyledTableCell align="center">{igm.timeofArrivel}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Divider />
                <div className="form-inline">
                <Button className="p-1"  onClick={remove_igm}>remove igm</Button> 
                <TablePagination
                  rowsPerPageOptions={[10, 15]}
                  component="div"
                  count={tblIGM.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
                </div>
                </Card> :null}
              </Card.Body>
            </Card>
            {/* Invoice Table  */}
            <Card border="dark" className={classes.card}>
            {hideIgm ? <div>
              <TableContainer className={classes.INVOICEcontainer}>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                    <TableCell padding="checkbox">
                          <Checkbox
                            indeterminate={selectedInvoice.length}
                            checked={selectedInvoice.length}
                            onChange={AllInvoiceHandle}
                            inputProps={{ 'aria-label': 'select all desserts' }}
                          />
                        </TableCell>
                      <TableCell align="left">Sl.no</TableCell>
                      <TableCell align="left">Invoice.No</TableCell>
                      <TableCell align="left">MAWB.No</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody style={{ overflowY: "scroll" }}>
                    {tblInvoice.map((invoices) =>  {
                         const SelctedInvoice = isInvoiceSelected(invoices.carton_id);
                         return(
                      <TableRow hover key={invoices.carton_id}
                      onClick={(event) => SlectedInvoiClick(event, invoices.carton_id)}
                      role="checkbox"
                      aria-checked={SelctedInvoice}
                      tabIndex={-1}
                      selected={SelctedInvoice}
                      >
                         <TableCell padding="checkbox">
                            <Checkbox checked={SelctedInvoice}/>
                          </TableCell>
                        <TableCell align="left">{invoices.sl_No}</TableCell>
                        <TableCell align="left">{invoices.invoiceNumber}</TableCell>
                        <TableCell align="left">{invoices.carton_no}</TableCell>
                      </TableRow>
                    )})}
                  </TableBody>
                </Table>
              </TableContainer>
              </div> :null}
            {showViweIGM ? <Card className={classes.ViweINVOICEcard}>
              <TableContainer className={classes.ViweINVOICEcontainer}>
                <Table stickyHeader size="small">
                  <TableHead>
                    <StyledTableRow>
                    <StyledTableCell padding="checkbox">
                          <Checkbox
                            indeterminate={selectedInvoice.length}
                            checked={selectedInvoice.length}
                            onChange={AllInvoiceBasedIgmHandle}
                            inputProps={{ 'aria-label': 'select all desserts' }}
                          />
                        </StyledTableCell>
                      <StyledTableCell align="left">Sl.no</StyledTableCell>
                      <StyledTableCell align="left">Invoice.No</StyledTableCell>
                      <StyledTableCell align="left">Carton.No</StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody style={{ overflowY: "scroll" }}>
                    {ViweTblInvoice.map((invoices) =>  {
                         const SelctedInvoice = isInvoiceSelected(invoices.carton_id);
                         return(
                      <StyledTableRow hover key={invoices.carton_id}
                      onClick={(event) => SlectedInvoiClick(event, invoices.carton_id)}
                      role="checkbox"
                      aria-checked={SelctedInvoice}
                      tabIndex={-1}
                      selected={SelctedInvoice}
                      >
                         <StyledTableCell padding="checkbox">
                            <Checkbox checked={SelctedInvoice}/>
                          </StyledTableCell>
                        <StyledTableCell align="left">{invoices.sl_No}</StyledTableCell>
                        <StyledTableCell align="left">{invoices.invoiceNumber}</StyledTableCell>
                        <StyledTableCell align="left">{invoices.carton_no}</StyledTableCell>
                      </StyledTableRow>
                    )})}
                  </TableBody>
                </Table>
              </TableContainer>
              </Card> :null}
            </Card>
          </CardGroup>
        </body>
      </div>
    </div>
  );
}

export default IGMgenaretion;

/*
*/