import { Button, ButtonGroup, Card, Container, FormControl, IconButton, InputLabel, makeStyles, Paper, Select, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import React, { useState ,useEffect} from 'react'
import { Form, Row } from 'react-bootstrap';
import OperationSrvces from '../../services/operationServices/OperationSrvces';
import Sidebar from '../home/Sidebar';
import profile from '../img/user.svg'
import CloseIcon from '@material-ui/icons/Close';


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
function KycUpdetion() {
const classes = useStyles();
const [processing ,setProcessing ] = useState(false);
const [drpOrigin , setDrpOrigin] = useState([]);
const [message, setMessage] = useState('')
const [notefy, setNotedfy] = useState(false);
const [TblMAWBNO , setTblMAWBNO] = useState([]);
const [tablInvoice , setTablInvoice] = useState([]);
const [values , setValues ] = useState({
    drp_countryId:0,
    ip_invoiceId:"",
    ip_invoice:'',
    ip_sender_id_proof:profile,
    ip_reciver_Id_front:profile,
    ip_reciver_Id_back:profile,
});
const drpData = async()=>{
    //countryData
    OperationSrvces.getWarehouse().then((res) => {
      setDrpOrigin(res.data);
    }).catch(() => {
    })
  }
  useEffect(() => {
    drpData();
  }, []);
      //get filter by origin services
      const editMawb = (mawb) => {
      
          OperationSrvces.getInvoiceNO(mawb.consigment_no).then((res) => {
            setTablInvoice(res.data);
          }).catch((error) => {
            setTablInvoice([])
            console.log('catch block  =>' + JSON.stringify(error));
          })
        
      };
      //get Invoice
      const editInvoice = (invoice) => {
      
          OperationSrvces.getKycIdProof(invoice.invoice_id).then((res) => {
            let kycAllData = res.data;
            const KycImagedetails = kycAllData.map((Kyc)=>Kyc);
            console.log("invoice_id => "+KycImagedetails.invoice_id)
            setValues({
              ip_invoice:invoice.invoice_no,
              ip_invoiceId:invoice.invoice_id,
              ip_sender_id_proof:KycImagedetails.senderId_proof,
              ip_reciver_Id_front:KycImagedetails.reciverId_proof_front,
              ip_reciver_Id_back:KycImagedetails.reciverId_proof_back,
            })
          }).catch((error) => {
            setTablInvoice([])
            console.log('catch block  => ' + JSON.stringify(error));
          })
        
      };
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
    //   invoice handler
    const ChangeInvoiveHandler = (event) => {
        setValues({...values,ip_invoice:event.target.value})
      }
    //   idproof handler
    const ChangeSenderIdProof = (event) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setValues({ ...values, ip_sender_id_proof: reader.result })
          }
        }
        reader.readAsDataURL(event.target.files[0])
      }
    //   idproof handler
    const ChangeReciverFrontProof = (event) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setValues({ ...values, ip_reciver_Id_front: reader.result })
          }
        }
        reader.readAsDataURL(event.target.files[0])
      }
    //   idproof handler
    const ChangeReciverBackProof = (event) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setValues({ ...values, ip_reciver_Id_back: reader.result })
          }
        }
        reader.readAsDataURL(event.target.files[0])
      }
      //uplodeProof
     const uploadSener_proof =()=>{
         setProcessing(true)
         let img_detaile = {invoice_id: values.ip_invoiceId,
           senderId_proof: values.ip_sender_id_proof,reciverId_proof_front: values.ip_reciver_Id_front,
          reciverId_proof_back: values.ip_reciver_Id_back}
         if(!values.ip_invoiceId){
           setMessage(values.ip_invoiceId)
           setNotedfy(true)
             setProcessing(false);
         }
         else{
           OperationSrvces.UpdateKycIdProof(img_detaile).then(res=>{
            setNotedfy(true)
            setMessage(res.data.message)
           }).catch(error=>{
             setMessage(error.message)
             setNotedfy(true)
           })
        }
     }
     const cancel =()=>{
      setValues({ip_sender_id_proof:profile,
    ip_reciver_Id_front:profile,ip_reciver_Id_back:profile})
     }
 // notificetion controller  
 const notefyClose = () => {
  setNotedfy(false);
};

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
                    drpOrigin.map((origin) =>(
                      <option key={origin.warehouse_id} value={origin.warehouse_id}>
                        {origin.warehouse_name}
                      </option>
                    ))}
            </Select>
          </FormControl>
          <Typography className={classes.titele}>KYC-UPLOAD</Typography>
          </div>
       {/* 1stTabel */}
          <Row xs={3} style={{ marginLeft: "2px" }}>
            <Card className={classes.card}>
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
                        <TableRow hover key={MAWB.consigment_id} onClick={()=>editMawb(MAWB)}>
                          <TableCell >{MAWB.sl_No}</TableCell>
                          <TableCell>{MAWB.consigment_no}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
            <Card className={classes.Formcard}>
              <Row xs={2}>
                  <TextField label="Invoice.No" value={values.ip_invoice} onChange={ChangeInvoiveHandler} className={classes.formControl}/>
              </Row>
              <ButtonGroup size="small" variant="outlined" color="primary">
                <Button disabled={processing} onClick={uploadSener_proof}>{processing ? 'processing..': "Upload"}</Button>
                <Button onClick={cancel}>cancel</Button>
                </ButtonGroup>
                <label  className="btn btn-outline-primary p-1 w-1 h-1 " >
                <input hidden={true} type="file" onChange={ChangeSenderIdProof} id="input" accept="image/*" />
                Upload Sender Proof</label>
                <label  className="btn btn-outline-primary p-1 w-1 h-1 " >
                <input hidden={true} type="file" onChange={ChangeReciverFrontProof} id="input" accept="image/*" />
                Upload Reciver Proof Front</label>
                <label  className="btn btn-outline-primary p-1 w-1 h-1 " >
                <input hidden={true} type="file" onChange={ChangeReciverBackProof} id="input" accept="image/*" />
                Upload Reciver Proof Back</label>
                <hr />
                    <Row xs={1}>
                      <Form.Label column="lg" lg={5}>SenderId Proof</Form.Label>
                    </Row>
                    <Row>
                    <img src={values.ip_sender_id_proof} alt="" className="img" />
                    </Row>
                    <hr/>
                    <Row style={{marginLeft:"10%"}}>
                      <Form.Label column="lg" lg={5}>Reciver Front Proof</Form.Label>
                    
                      <Form.Label column="lg" lg={5}>Reciver Back Proof</Form.Label>
                    </Row>
                    <Row xs={2}>
                    
                    <img src={values.ip_reciver_Id_front} alt="" className="img" />
                   
                    <img src={values.ip_reciver_Id_back} alt="" className="img" />
                    </Row>
                    <hr/>
            </Card>
            <Snackbar
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
                  open={notefy} autoHideDuration={6000} message={message}
                  action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={notefyClose}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  } />
            {/* second Table */}
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
                   { tablInvoice.map((invoice)=>(
                   <TableRow hover kry={invoice.invoice_id} onClick={()=>editInvoice(invoice)}>
                      <TableCell>{invoice.sl_no}</TableCell>
                      <TableCell>{invoice.invoice_no}</TableCell>
                    </TableRow>))}
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

export default KycUpdetion
