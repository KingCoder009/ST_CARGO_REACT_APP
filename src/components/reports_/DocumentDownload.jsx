import { Button, Container, FormControlLabel, FormGroup, makeStyles, Paper, Radio, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { Card, Row } from 'react-bootstrap';
import Sidebar from '../home/Sidebar'
  const useStyles = makeStyles((theme)=>({
      titele:{
          textAlign:"center"
      },
      export: {
        margin: theme.spacing(1),
        marginLeft: theme.spacing(25)
    },
    card:{
        margin:theme.spacing(3),
        marginLeft:theme.spacing(15),
        minWidth:900,
        maxWidth:900,
    },
    formControll1:{
        marginLeft:theme.spacing(35),
    },
    formControll2:{
        marginLeft:theme.spacing(35),
    },
    formControll3:{
        marginLeft:theme.spacing(5),
    },
  }));
function DocumentDownload() {
    const classes = useStyles();
    const [selctedValue, setSelectedValue] = useState('')

    const Changehandler = (event) => {
        setSelectedValue(event.target.value)
    }

    return (
        <div>
            <Sidebar/>
            <div style={{marginTop:"5%"}}/>
            <Container>
            <Paper elevation={15}>
             <Typography className={classes.titele}>KYC/ID PROOF/MAWB DOCUMENTS DOWNLOAD</Typography>
             <Container>
             <Row>
                 <center>
                     <TextField label="Consigment.No"/>
                 </center>
             </Row>
             <Row>
                 <Card className={classes.card}>
                 <FormGroup row className={classes.formControll1}>
                                <FormControlLabel control={<Radio checked={selctedValue === 'po_id_proof'} onChange={Changehandler} value="po_id_proof" />}
                                    label="POD/ID PROOF" />
                                <FormControlLabel control={<Radio checked={selctedValue === 'mawb_document'} onChange={Changehandler} value="mawb_document" />}
                                    label="MAWB DOCUMENT" />

                </FormGroup>
                 </Card>
             </Row>
             <Row>
                 <Card className={classes.card}>
                 <FormGroup  row className={classes.formControll2}>
                                <FormControlLabel disabled control={<Radio checked={selctedValue === 'pod'} onChange={Changehandler} value="pod" />}
                                    label="POD" />
                                <FormControlLabel disabled control={<Radio checked={selctedValue === 'id_proof'} onChange={Changehandler} value="id_proof" />}
                                    label="ID PROOF" />
                                <FormControlLabel disabled control={<Radio checked={selctedValue === 'all'} onChange={Changehandler} value="all" />}
                                    label="ALL" />

                </FormGroup>
                 </Card>
             </Row>
             <Row>
                 <Card className={classes.card}>
                 <FormGroup  row className={classes.formControll3}>
                                <FormControlLabel disabled control={<Radio checked={selctedValue === 'mawb_scan_copy'} onChange={Changehandler} value="mawb_scan_copy" />}
                                    label="MAWB SCAN COPY" />
                                <FormControlLabel disabled control={<Radio checked={selctedValue === 'duty_certificate'} onChange={Changehandler} value="duty_certificate" />}
                                    label="DUTY CERTIFICATE" />
                                <FormControlLabel disabled control={<Radio checked={selctedValue === 'short_land_certificate'} onChange={Changehandler} value="short_land_certificate" />}
                                    label="SHORT LAND CERTIFICATE" />
                                <FormControlLabel disabled control={<Radio checked={selctedValue === 'bill_entry'} onChange={Changehandler} value="bill_entry" />}
                                    label="BILL OF ENTRY" />

                </FormGroup>
                 </Card>
             </Row>
             </Container>
             <Button variant="outlined" size="small" color="primary" className={classes.export}>Download</Button>
            </Paper>
            </Container>
        </div>
    )
}

export default DocumentDownload
