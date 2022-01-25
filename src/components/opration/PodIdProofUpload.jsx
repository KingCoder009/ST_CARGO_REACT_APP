import { Button, ButtonGroup, Card, Container, FormControl, InputLabel, makeStyles, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import React, { useState ,useEffect} from 'react'
import { Form, Row } from 'react-bootstrap';
import MasterService from '../../services/masterservices/MasterService';
import OperationSrvces from '../../services/operationServices/OperationSrvces';
import Sidebar from '../home/Sidebar';
import profile from '../img/user.svg'

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
function PodIdProofUpload() {
const classes = useStyles();
const [processing ,setProcessing ] = useState(false);
const [drpOrigin , setDrpOrigin] = useState([]);
const [TblMAWBNO , setTblMAWBNO] = useState([]);
const [tablInvoice , setTablInvoice] = useState([]);
const [values , setValues ] = useState({
    drp_countryId:0,
    ip_invoice:'',
    ip_pod:profile,
    ip_id_proof:profile,
});
const drpData = async()=>{
    //countryData
    MasterService.getOrigineCountry().then((res) => {
        setDrpOrigin(res.data);
    }).catch(() => {
    })
  }
  useEffect(() => {
    drpData();
  }, []);
      //get filter by origin services
      const editMawb = (mawb) => {
      
          OperationSrvces.loadInvoice(mawb.invoiceid).then((res) => {
            setTablInvoice(res.data);
          }).catch((error) => {
            setTablInvoice([])
            console.log('catch block  =>' + JSON.stringify(error));
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
    const ChangePODHandlere = (event) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setValues({ ...values, ip_pod: reader.result })
          }
        }
        reader.readAsDataURL(event.target.files[0])
      }
    //   idproof handler
    const ChangeIdProofHandler = (event) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setValues({ ...values, ip_id_proof: reader.result })
          }
        }
        reader.readAsDataURL(event.target.files[0])
      }
      //uplodeProof
     const uploadSener_proof =()=>{
         setProcessing(true)
         if(values.ip_sender_id_proof === profile){
             setProcessing(false);
         }
         else{
            setProcessing(false);
        }
     }
     const cancel =()=>{
      setValues({ip_sender_id_proof:profile,
    ip_reciver_Id_front:profile,ip_reciver_Id_back:profile})
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
            <Typography className={classes.titele}>POD-ID PROOF UPLOAD</Typography>
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
                          <TableRow hover key={MAWB.consigmentId} onClick={()=>editMawb(MAWB)}>
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
                    <TextField label="Invoice.No" value={values.ip_invoice} onChange={ChangeInvoiveHandler} className={classes.formControl}/>
                </Row>
                <ButtonGroup size="small" variant="outlined" color="primary">
                  <Button disabled={processing} onClick={uploadSener_proof}>{processing ? 'processing..': "Upload"}</Button>
                  <Button onClick={cancel}>cancel</Button>
                  </ButtonGroup>
                  <label  className="btn btn-outline-primary p-1 w-1 h-1 " >
                  <input hidden={true} type="file" onChange={ChangePODHandlere} id="input" accept="image/*" />
                  Upload POD</label>
                  <label  className="btn btn-outline-primary p-1 w-1 h-1 " >
                  <input hidden={true} type="file" onChange={ChangeIdProofHandler} id="input" accept="image/*" />
                  Upload ID Proof</label>
                      <hr/>
                      <Row style={{marginLeft:"10%"}}>
                        <Form.Label column="lg" lg={5}>POD</Form.Label>
                      
                        <Form.Label column="lg" lg={5}>ID Proof</Form.Label>
                      </Row>
                      <Row xs={2}>
                      
                      <img src={values.ip_pod} alt="" className="img" />
                     
                      <img src={values.ip_id_proof} alt="" className="img" />
                      </Row>
                      <hr/>
              </Card>
             
              {/* second Table */}
              <Card className={classes.card}>
                <TableContainer className={classes.container}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>Sl.No</TableCell>
                        <TableCell>Invoice.No</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                     { tablInvoice.map((invoice)=>(
                     <TableRow hover kry={invoice.invoiceid}>
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

export default PodIdProofUpload
