import { React, useState } from 'react'
import {
    Button, Card, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText
    , DialogTitle, FormControlLabel, FormGroup, makeStyles, Paper, TextField ,Radio} from '@material-ui/core';
import {Row} from 'react-bootstrap'
import Draggable from 'react-draggable';
import Sidebar from '../home/Sidebar'

function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

  
const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    radio: {
        marginLeft: theme.spacing(5),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    formControll: {
        margin: theme.spacing(3),
    },
    formControl: {
        margin: theme.spacing(1),
        marginLeft: theme.spacing(14),
        minWidth:150,
        maxWidth:150,
    },
    export: {
        margin: theme.spacing(1),
        marginLeft: theme.spacing(25)
    },
    tableContainer: {
        margin: theme.spacing(0),
        minHeight: 300,
        maxHeight: 300,
      },
      TextField:{
        marginLeft:theme.spacing(4),
        minWidth:160,
       maxWidth:160
      },
      ButtonGroup:{
        margin: theme.spacing(1),
        marginLeft: theme.spacing(20),
      },
}));
function IDproofDownloader() {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const [inputSelect, setInputSelect] = useState('a')
    const [selctedValue, setSelectedValue] = useState('')
    const [values, setValues] = useState({
        ip_mawb_no: '',
        ip_invoice_no: ''
    })

    const handleClose = () => {
        setOpen(false)
        window.location.replace('/home')
    };
    const Changehandler = (event) => {
        setSelectedValue(event.target.value)
    }

    const ChangeInputHandler = (event) => {
        setInputSelect(event.target.value)
    }
    const inputChangeHandler = () => {
        if (inputSelect === 'a') {
            return ChangeMawbHandler
        }
        if (inputSelect === 'b') {
            return ChangeInvoiceHandler
        }
    }
    const ChangeMawbHandler = (event) => {
        setValues({
            ...values, ip_mawb_no: event.target.value,
            ip_invoice_no: ''
        })
    }
    const ChangeInvoiceHandler = (event) => {
        setValues({
            ...values, ip_invoice_no: event.target.value,
            ip_mawb_no: ''
        })
    }

    const inputField = () => {
        if (inputSelect === 'a') {
            return values.ip_mawb_no
        }
        else if (inputSelect === 'b') {
            return values.ip_invoice_no
        }
    }
    const inputLabel = () => {
        if (inputSelect  === 'a') {
            return 'Mawb.No'
        }
        else if (inputSelect === 'b') {
            return 'Invoice.No'
        }
    }
    return (
        <div>
        <Sidebar />
<Dialog fullWidth={true}
maxWidth="sm"
open={open}
onClose={handleClose}
PaperComponent={PaperComponent}>
<DialogActions>
    <Button  onClick={handleClose} color="primary">
        Close
    </Button>
</DialogActions>
<DialogTitle style={{ cursor: 'move', marginTop: "-5%" }} id="draggable-dialog-title">
    Clearance Documents
</DialogTitle>
<DialogContent>
    <DialogContentText>
        <Card >
            
            <FormGroup row className={classes.formControll}>
                <FormControlLabel control={<Checkbox checked={selctedValue === 'cochinbarcode'} onChange={Changehandler} value="cochinbarcode" />}
                    label="COCHIN BARCODE" />
                <FormControlLabel control={<Checkbox checked={selctedValue === 'pigeOnOldBarcode'} onChange={Changehandler} value="pigeOnOldBarcode" />}
                    label="PIGEON OLD BARCODE" />
                <FormControlLabel control={<Checkbox checked={selctedValue === 'pigeonNewBarcode'} onChange={Changehandler} value="pigeonNewBarcode" />}
                    label="PIGEON NEW BARCODE" />
            </FormGroup>
           <Row xs={3}>
           <FormControlLabel control={<Radio checked={inputSelect === 'a'} onChange={ChangeInputHandler} value="a" />}
                    label="Consigment.No" className={classes.radio}/>
                <FormControlLabel control={<Radio checked={inputSelect === 'b'} onChange={ChangeInputHandler} value="b" />}
                    label="Invoice.No"  />
           </Row>
               <Row>
            <TextField label={inputLabel()} value={inputField()} onChange={inputChangeHandler()}
                className={classes.formControl} />
                </Row>
        </Card>
        <Button variant="outlined" size="small" color="primary" className={classes.export}>
            Export
        </Button>
    </DialogContentText>
</DialogContent>

</Dialog>
           
       </div> 
    )
}

export default IDproofDownloader
