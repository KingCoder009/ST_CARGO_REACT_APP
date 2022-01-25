import { Button, Card, Container, FormControl, FormControlLabel,
     InputLabel, makeStyles, Paper, Radio, Select, Table, TableBody, TableCell,
      TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core'
import {React ,useState } from 'react'
import { Row } from 'react-bootstrap'
import Sidebar from '../home/Sidebar'

const useStyles = makeStyles((theme) => ({
    formControll: {
        marginLeft: theme.spacing(60),
        minWidth:160,
       maxWidth:160
    },
    radio:{
      marginLeft:theme.spacing(65)
    },
    export: {
        margin: theme.spacing(3),
        marginLeft: theme.spacing(40)
    },
    tableContainer: {
        margin: theme.spacing(0),
        minHeight: 500,
        maxHeight: 500,
      },
      TextField:{
        marginLeft:theme.spacing(4),
        minWidth:160,
       maxWidth:160
      },
      title:{
        margin: theme.spacing(1),
        textAlign:"center",
        backgroundColor:"gray",
        fontWeight:"bold"
      },
}));
function KYCdownload() {
    const classes = useStyles();
    const [selectedValue , setSelectedValue] = useState('sender')

    const ChangeRadioHandler=(event)=>{
        setSelectedValue(event.target.value)
    }

    return (
        <div>
            <div><Sidebar/></div>
            <div style={{marginTop:"5%"}}/>
            <Container>
            <Paper>
                <Typography className={classes.title}>Sender Reciver Details</Typography>
                <FormControlLabel className={classes.radio} control={<Radio checked={selectedValue==='sender'} 
                onChange={ChangeRadioHandler} value="sender" />} label="Sender"  />
                <FormControlLabel control={<Radio checked={selectedValue==='reciver'}
                 onChange={ChangeRadioHandler} value="reciver" />} label="Reciver"  />
                
                 <Row xs={2}>
                     <FormControl className={classes.formControll}>
                         <InputLabel>Country</InputLabel>
                         <Select>
                             <option>
                                ten
                             </option>
                         </Select>
                     </FormControl>
                     <TextField className={classes.TextField} label="No Of Sender"/>
                 </Row>
                 <Row xs={5} className={classes.export}>
                     <Button variant="outlined" size="small" color="primary">Show</Button>
                    <Button variant="outlined" size="small" color="primary">Export</Button>
                    <Button variant="outlined" size="small" color="primary">Clear</Button>
                 </Row>
                 <Card>
                     <TableContainer className={classes.tableContainer}>
                         <Table stickyHeader>
                             <TableHead>
                                 <TableRow>
                                     <TableCell>Sl.No</TableCell>
                                     <TableCell>Sender Name</TableCell>
                                     <TableCell>Sender Address</TableCell>
                                     <TableCell>Sender Mobile</TableCell>
                                     <TableCell>Sender Iqama</TableCell>
                                 </TableRow>
                             </TableHead>
                             <TableBody>
                                 <TableRow hover>
                                     <TableCell>Sl.No</TableCell>
                                     <TableCell>Sender Name</TableCell>
                                     <TableCell>Sender Address</TableCell>
                                     <TableCell>Sender Mobile</TableCell>
                                     <TableCell>Sender Iqama</TableCell>
                                 </TableRow>
                             </TableBody>
                         </Table>
                     </TableContainer>
                 </Card>
            </Paper>
            </Container>
        </div>
    )
}

export default KYCdownload
