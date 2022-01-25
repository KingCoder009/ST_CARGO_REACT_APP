import { Button, Card, Container, FormControl, InputLabel, makeStyles, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Sidebar from '../home/Sidebar'

const useStyles = makeStyles((theme) => ({

    container: {
        minHeight: 500,
        maxHeight: 500,
    },
    table: {
        backgroundColor: "gray"
    },
    formOption: {
        margin: theme.spacing(2),
        minWidth: 200,
        maxWidth: 200,
    },
    tbltitele: {
        textAlign: "left",
        fontWeight: "bold",
        color: "Black",
    },
    titele: {
        textAlign: "center",
        fontWeight: "bold",
        color: "red",
    },
    card: {
        minWidth: 345,
        maxWidth: 345,
        minHeight: 760,
        maxHeight: 760,
        border:"2px 2px solid black"
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop:theme.spacing(2),
        width: 200,
      },
    Formcard: {
        marginTop:theme.spacing(3)
    },
    paper: {
        minWidth:700,
        maxWidth:700,
    },
    containerbody:{
        marginLeft: theme.spacing(2),
       
    },
    buttonGroup:{
        marginLeft: theme.spacing(6),
        marginTop: theme.spacing(6),
    },
}));
function MAWBtracking() {
    const classes = useStyles();

    return (
        <div>
            <Sidebar />
            <div style={{ marginTop: "5%" }} />
            <Container className={classes.containerbody}>
                <div className='navbarss'>
                    <Typography className={classes.titele}>MAWB Tracking</Typography>
                    <Typography className={classes.tbltitele}>MAWB.NO</Typography>
                </div>
                <Row xs={2}>
                    <Paper className={classes.card}> 
                        <TableContainer className={classes.container}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Sl.No</TableCell>
                                        <TableCell>Mawb.No</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* {
                      TblMAWBNO.map((MAWB) => (
                        <TableRow hover key={MAWB.consigmentId} >
                          <TableCell >{MAWB.sl_no}</TableCell>
                          <TableCell>{MAWB.consigmentNo}</TableCell>
                        </TableRow>
                      ))} */}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                    <Paper className={classes.paper}>
                        <Container>
                            <Card className={classes.Formcard}>
                                <Typography>Filter By</Typography>
                                <FormControl className={classes.formOption}>
                                    <InputLabel>Shipment Company</InputLabel>
                                    <Select>
                                        <option>
                                            ten
                                        </option>
                                    </Select>
                                </FormControl>
                                <TextField
                                    id="date"
                                    label="Expacted Arrivel Date"
                                    type="date"
                                    defaultValue="2017-05-24"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Card>
                        </Container>
                        <Row xs={3}>
                            <Col>
                            <TextField label="MAWB.No" className={classes.textField}/>
                          <FormControl className={classes.textField}>
                              <InputLabel>Origin Cargo Company</InputLabel>
                              <Select>
                                  <option>
                                      ten
                                  </option>
                              </Select>
                          </FormControl>
                            <TextField label="Exchange Rate" className={classes.textField}/>
                            <TextField label="Total Invoice" className={classes.textField}/>
                            <TextField
                                    id="date"
                                    label="Expacted Arrivel Date&time"
                                    type="date"
                                    defaultValue="2017-05-24"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Col>
                            <Col>
                            <TextField label="CM.No" className={classes.textField}/>
                          <FormControl className={classes.textField}>
                              <InputLabel>Destinetion</InputLabel>
                              <Select>
                                  <option>
                                      ten
                                  </option>
                              </Select>
                          </FormControl>
                            <TextField label="CETH No" className={classes.textField}/>
                            <TextField label="Total Invoice" className={classes.textField}/>
                            <TextField label="Total Pcs" className={classes.textField} />
                            </Col>
                            <Col>
                          <FormControl className={classes.textField}>
                              <InputLabel>Transit Type</InputLabel>
                              <Select>
                                  <option>
                                      ten
                                  </option>
                              </Select>
                          </FormControl>
                          <TextField
                                    id="date"
                                    label="Transit Date"
                                    type="date"
                                    defaultValue="2017-05-24"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            <FormControl className={classes.textField}>
                              <InputLabel>Clearance Oranizetion</InputLabel>
                              <Select>
                                  <option>
                                      ten
                                  </option>
                              </Select>
                          </FormControl>
                            <TextField label="Total Wight" className={classes.textField} />
                            </Col>
                        </Row>
                        <Row xs={3} className={classes.buttonGroup}>
                            <Button variant='outlined' color="primary" size='sm'>MAWB-Tracking</Button>
                            <Button variant='outlined' color="primary" size='sm'>Cancel</Button>
                        </Row>
                    </Paper>
                </Row>
            </Container>
        </div>
    )
}

export default MAWBtracking
