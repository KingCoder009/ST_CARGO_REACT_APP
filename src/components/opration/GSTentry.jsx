import { Button, ButtonGroup, Card, Container, FormControl,  InputLabel, makeStyles, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap';
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
        marginLeft: theme.spacing(2),
        margin: theme.spacing(1),
        height: "6vh",
        minWidth: 260,
        maxWidth: 270,
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
        minWidth: 305,
        maxWidth: 305,
        minHeight: 760,
        maxHeight: 760,
    },
    Formcard: {
        minWidth: 600,
        maxWidth: 600
    },
}));
function GSTentry() {
    const classes = useStyles();
    const [drpOrigin, setOrigin] = useState([]);
    const [TblMAWBNO, setTblMAWBNO] = useState([]);
    const [values, setValues] = useState({
        drp_countryId: 0,
        slct_shipmentCompany: "",
        mawb_no: "",
        shipmentCode: "",
        Mawb_booking_Date: "2017-05-24"
    });
    const drpData = async () => {
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

    return (
        <div>
            <Sidebar />
            <div style={{ marginTop: "5%" }} />
            <body className="responsive box-content border-4">
                <Container>
                    <Paper elevation={4}>
                        <div className="navbarss">
                            <FormControl focused className={classes.selectControl} >
                                <InputLabel>Origin WareHouse</InputLabel>
                                <Select className={classes.formOption}
                                    value={values.drp_countryId}
                                    onChange={handleOriginChange} autoComplete="off">
                                    {
                                        drpOrigin.map((countrys) => (
                                            <option key={countrys.countryId} value={countrys.countryId}>
                                                {countrys.countryName}
                                            </option>
                                        ))}
                                </Select>
                            </FormControl>
                            <Typography className={classes.titele}>GST-Entry</Typography>
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
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Consigne</Form.Label>
                                        <Form.Control value={values.ip_consignee} as="textarea" rows={3} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Shipper</Form.Label>
                                        <Form.Control value={values.ip_shipper} as="textarea" rows={3} />
                                    </Form.Group>
                                </Row>
                                <TextField value={values.ip_section_value} label="Section Value Act 1975"/>
                                <Row xs={2}>
                                <TextField className={classes.formControl} value={values.ip_doller_value} label="DollerValue($)"/>
                                <TextField className={classes.formControl} value={values.ip_ex_rate} label="EX.Rate($)"/>
                                <TextField className={classes.formControl} value={values.ip_india_value} label="IndiaValue($)"/>
                                </Row>
                                <Row xs={2}>
                                    <Col>
                                    <TextField focused className={classes.formControl2} value={values.ip_additional_Duty_rate} label="Additional DutyRate(%)"/>
                                    <TextField focused className={classes.formControl2} value={values.ip_igst_rate} label="Igst Rate(%)"/>
                                    <TextField focused className={classes.formControl2} value={values.ip_gst_compensation_rate} label="GST Compensation Rate(%)"/>
                                    <TextField focused className={classes.formControl2} value={values.ip_igst_exemption_notifi} label="Igst Exemption Notification"/>
                                    </Col>
                                    <Col>
                                    <TextField focused className={classes.formControl2} value={values.ip_duty_amount} label="Additional DutyAmount(INR)"/>
                                    <TextField focused className={classes.formControl2} value={values.ip_igst_amount} label="Igst Amount(INR)"/>
                                    <TextField focused className={classes.formControl2} value={values.ip_gst_compensation_amount} label="Gst Compensation Cess Amount(INR)"/>
                                    <TextField focused className={classes.formControl2} value={values.ip_exemption_notifi} label="Gst Compensation Cess Exemption Notification"/>
                                    </Col>
                                </Row>
                                <Row xs={1}>
                                    <ButtonGroup size="small" variant="outlined" color="primary">
                                        <Button >save</Button>
                                        <Button >update</Button>
                                        <Button >cancel</Button>
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

export default GSTentry
