import { Button,  Container, Divider, makeStyles,
   Paper, Table, TableBody, TableCell, TableContainer, 
   TableHead, TablePagination, TableRow, TextField, Typography } from '@material-ui/core'
import {React, useState } from 'react';
import { Card, Form, Row,Col } from 'react-bootstrap'
import MasterService from '../../services/masterservices/MasterService';
import Sidebar from '../home/Sidebar';

const useStyles = makeStyles((theme) => ({
    formcontrol:{
      marginTop: theme.spacing(-1),
      marginLeft: theme.spacing(-12),
      margin: theme.spacing(1),
      height:"2vh"
    },
    radio:{
      marginTop: theme.spacing(1),
      marginRight:theme.spacing(-1),
      height:"2vh"
    },
    titele:{
       textAlign:"center"
    },
    buttonUG:{
        margin: theme.spacing(1),
        marginLeft:theme.spacing(50),
        marginRight:theme.spacing(3),
    },
    buttonR:{
        margin: theme.spacing(1),
    },
    card:{
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(2),
        height:"78vh"
    },
    container:{
        marginTop: theme.spacing(1),
    },
    card2:{
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3), 
        height:"10vh"
    },
    tableContainer: {
        margin: theme.spacing(0),
        minHeight:500,
        maxHeight: 500,
      },
  }))
export default function Itemvalue() {
    const classes = useStyles();
    // const [selected, setSelected] = useState([]);
    // const [selected1, setSelected1] = useState([]);
    // const [selected2, setSelected2] = useState([]);
    const [itemdetails, setItemdetails] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(100);
    const [filterValue , setFilterValue] = useState(true);
    const [hideinput ,setHideinput] = useState(true);
    const [radiovalue , setRadioValue] = useState({
        rdio_Mawb:"MAWB.No",
        rdio_invoice:"",
        rdio_All:""
    });
    const [values , setValues] = useState({
      iteme_id:0,
        MAWB_NO:"",
        Invoice_no:""
    });
    // const [itemeValueFields ,setItemeValueFields] = useState({
    //   tbl_totalValue:"",
    //   tbl_banned_item:""
    // })

    const getItemData =()=>{
      console.log("Mawb = "+(values.MAWB_NO)+"invoice = "+(values.Invoice_no));
      MasterService.getItemValue(values.MAWB_NO,values.Invoice_no).then(res=>{
        setItemdetails(res.data);
        setValues({MAWB_NO:"",
        Invoice_no:""
      })
      })
    };


    
    // const UpdateItemValues =()=>{
    //  var iteme_id = []; var total_value = [];var baned_item = [];
    //    const tabl_itemDetails = itemdetails.map((itemValue=>itemValue));
       
    //    for (let i=0;i<selected.length;i++){
    //     iteme_id = iteme_id.concat(tabl_itemDetails[selected].item_id); 
    //     total_value = total_value.concat(tabl_itemDetails[selected].total_value); 
    //     baned_item = baned_item.concat(tabl_itemDetails[selected].baned_item); 
    //    }
    //    console.log("iteme_id = "+(iteme_id))
    //    console.log("iteme_id = "+(total_value))
    //    console.log("iteme_id = "+(baned_item))
    //    let Iteme_details = {item_idString:iteme_id,total_valueString:total_value,banedItem_String:baned_item}
    //    console.log("concat = "+JSON.stringify(Iteme_details))
    //   //  MasterService.addItemValue(Iteme_details).then((res)=>{
    //   //    console.log(JSON.stringify(res.data));
    //   //  })
    // }

  //   const ChangeTblTotalValueHandler = (event) => {
  //     var itemtotalvalue = [];
  //     // console.log("id & pkgkitem - "+JSON.stringify(event.target.value));
  //     // console.log("index name- "+JSON.stringify(event.target.name));
  //     //add logic 
  //     var Temp_tblPkglist = itemdetails;
  //     var index = event.target.name;

  //     Temp_tblPkglist[index].total_value=event.target.value; 
  //     var tempvalue =Temp_tblPkglist[index];
  //     // var item = itemdetails.map(i_v=>i_v)
  //     // itemtotalvalue = itemtotalvalue.concat( Temp_tblPkglist[index].total_value);
  //     // console.log("value "+itemtotalvalue)
  //      setItemeValueFields({...itemeValueFields,tbl_totalValue:tempvalue})
  // };

    const ChangeMawbHandler =(event)=>{
        setValues({...values,MAWB_NO:event.target.value});
    }
    const ChangeRedioMAWBHandler = (event) => {
      setFilterValue(true)
      setHideinput(true)
        setItemdetails([]);
        setRadioValue({ ...radiovalue, rdio_Mawb: event.target.value,
        rdio_All:"",rdio_invoice:"" })
        setValues({...values,Invoice_no:"-1"})
    };
    const ChangeRedioInvoiceHandler = (event) => {
      setFilterValue(false);
      setHideinput(true)
        setItemdetails([]);
        setRadioValue({ ...radiovalue, rdio_invoice: event.target.value,
            rdio_Mawb:"",rdio_All:"" })
            setValues({...values,MAWB_NO:"-1"})
    };
    const ChangeRedioAllHandler = (event) => {
      setHideinput(false)
        setRadioValue({ ...radiovalue, rdio_All: event.target.value,
            rdio_Mawb:"",rdio_invoice:"" })
            let mawb = "-1";
            let invoice ="-1"
            MasterService.getItemValue(mawb,invoice).then(res=>{
              console.log(JSON.stringify(res.data))
              setItemdetails(res.data);
              setValues({
                iteme_id:0,
                MAWB_NO:"",
              Invoice_no:""})
            })
    };
    const handleChangePage = (event, newPage) => {
      console.log("changePage "+newPage)
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      console.log("ChangeRowsPerPage "+(+event.target.value))
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    // const SlectedItemClick = (event, i) => {
    //   var slectedI =[];
      
    //   for(let j=0;j<i.length;j++){
    //     slectedI = slectedI.concat(i)
        
    //   }
    //   console.log("event "+slectedI)
    //   // setSelected(i)
    // }
    //   const selectedIndex = selected.indexOf(itemvalue.item_id);
    //   const selectedIndex1 = selected1.indexOf(itemvalue.total_value);
    //   const selectedIndex2 = selected2.indexOf(itemvalue.baned_item);
    //   let SelectedItemId = [];
    //   let SelectedTotalValue = [];
    //   let SelectedBannedItem = [];
  
    //   if (selectedIndex === -1 && selectedIndex1 === -1 && selectedIndex2 === -1) {
    //     SelectedItemId = SelectedItemId.concat(selected, itemvalue.item_id);
    //     SelectedTotalValue = SelectedTotalValue.concat(selected1, itemvalue.total_value);
    //     SelectedBannedItem = SelectedBannedItem.concat(selected2, itemvalue.baned_item);
    //     console.log("itemid -1 = " + SelectedItemId)
    //     console.log("t_value -1 = " + SelectedTotalValue)
    //     console.log("banned_item -1 = " + SelectedBannedItem)
    //     setValues({...values,iteme_id:SelectedItemId})
    //     setItemeValueFields({tbl_totalValue:SelectedTotalValue,
    //     tbl_banned_item:SelectedBannedItem})
    //   }
    //   else if (selectedIndex === 0 && selectedIndex1 === 0 && selectedIndex2 === 0) {
    //     SelectedItemId = SelectedItemId.concat(selected.slice(1));
    //     SelectedTotalValue = SelectedTotalValue.concat(selected1.slice(1));
    //     SelectedBannedItem = SelectedBannedItem.concat(selected2.slice(1));
    //     console.log("itemid 0 = " + SelectedItemId)
    //     console.log("t_value 0 = " + SelectedTotalValue)
    //     console.log("banned_item 0 = " + SelectedBannedItem)
    //     setValues({...values,iteme_id:SelectedItemId})
    //     setItemeValueFields({tbl_totalValue:SelectedTotalValue,
    //     tbl_banned_item:SelectedBannedItem})
    //   }
    //   else if (selectedIndex === selected.length - 1 && selectedIndex1 === selected1.length-1 && selectedIndex2 === selected2.length-1) {
    //     SelectedItemId = SelectedItemId.concat(selected.slice(0, -1));
    //     SelectedTotalValue = SelectedTotalValue.concat(selected1.slice(0, -1));
    //     SelectedBannedItem = SelectedBannedItem.concat(selected2.slice(0, -1));
    //     console.log("itemid len-1 = " + SelectedItemId)
    //     console.log("t_value len-1 = " + SelectedTotalValue)
    //     console.log("banned_item -1 = " + SelectedBannedItem)
    //     setValues({...values,iteme_id:SelectedItemId})
    //     setItemeValueFields({tbl_totalValue:SelectedTotalValue,
    //     tbl_banned_item:SelectedBannedItem})
    //   }
    //   else if (selectedIndex > 0 && selectedIndex1 >0 && selectedIndex2 >0) {
    //     SelectedItemId = SelectedItemId.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1),);
    //     SelectedTotalValue = SelectedTotalValue.concat(selected1.slice(0, selectedIndex1), selected1.slice(selectedIndex1 + 1),);
    //     SelectedBannedItem = SelectedBannedItem.concat(selected2.slice(0, selectedIndex2), selected2.slice(selectedIndex2 + 1),);
    //     console.log("itemid >0 = " + SelectedItemId)
    //     console.log("t_value >0 = " + SelectedTotalValue)
    //     console.log("banned_item >0 = " + SelectedBannedItem)
    //     setValues({...values,iteme_id:SelectedItemId})
    //     setItemeValueFields({tbl_totalValue:SelectedTotalValue,
    //     tbl_banned_item:SelectedBannedItem})
    //   }
  
    //   setSelected(SelectedItemId);
    //   setSelected1(SelectedTotalValue);
    //   setSelected2(SelectedBannedItem);
    // };
    // const isItemSelected = (itemValue) => (selected.indexOf(itemValue.item_id) ||
    //                                       selected1.indexOf(itemValue.total_value) ||
    //                                       selected2.indexOf(itemValue.baned_item) )!== -1;
    return (
        <div>
            <Sidebar/>
            <div style={{marginTop:"5%"}}/>

            <Paper className={classes.card}  elevation={7}>
                <Typography className={classes.titele}>Item Details</Typography>
                <Card className={classes.card2}>
                  <Row xs={7} style={{margin:"10px",marginLeft:"10%"}}>
                    <Col>
                    <Form.Check inline label="MAWB.NO" className={classes.radio} value="MAWB.No" checked={radiovalue.rdio_Mawb === "MAWB.No"}
                     type="radio" name="rediovalues" onChange={ChangeRedioMAWBHandler} />
                    </Col>
                    <Col>
                    <Form.Check inline label="Invoice.NO" className={classes.radio} value="Invoice.No" checked={radiovalue.rdio_invoice === "Invoice.No"}
                     type="radio" name="rediovalues" onChange={ChangeRedioInvoiceHandler} />
                    </Col>
                    <Col>
                    <Form.Check inline label="All" className={classes.radio} value="All" checked={radiovalue.rdio_All === "All"}
                     type="radio" name="rediovalues" onChange={ChangeRedioAllHandler} />
                    </Col>
                  {hideinput?  <Col>
               {filterValue? <TextField label="MAWB.No" placeholder="MAWB.No" className={classes.formcontrol}
                value={values.MAWB_NO} onChange={ChangeMawbHandler}
                />:
                <TextField label="Invoice.No" placeholder="invoice.No" className={classes.formcontrol}
                value={values.Invoice_no} onChange={ChangeMawbHandler}
                />}
               </Col> : null} 
               {hideinput?<Col>
               <Button onClick={getItemData} variant="outlined" color="primary" size="small">Search</Button> 
               </Col> :null}
                </Row></Card>
                <Container className={classes.container} >
                <Paper>
                <TableContainer className={classes.tableContainer}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                      {/* <TableCell padding="checkbox">
                          <Checkbox
                            indeterminate={selected.length}
                            checked={selected.length}
                            onChange={AllMAWBHandle}
                            inputProps={{ 'aria-label': 'select all desserts' }}
                          />
                        </TableCell> */}
                        <TableCell align="left">Sl.no</TableCell>
                        <TableCell align="left">ItemName</TableCell>
                        <TableCell align="left">ItemValue</TableCell>
                        <TableCell align="left">BannedItem</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody >
                      {itemdetails.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((itemvalue,i) =>{
                      // const checkSelcted = isItemSelected(itemvalue);
                      return(
                        <TableRow hover key={itemvalue.item_id}
                        // onClick={(event) => SlectedItemClick(event,i)}
                        // role="checkbox"
                        // aria-checked={checkSelcted}
                        // tabIndex={-1}
                        // selected={checkSelcted}
                        >
                            {/* <TableCell padding="checkbox">
                            <Checkbox
                              checked={checkSelcted}
                            /></TableCell> */}
                          <TableCell align="left">{itemvalue.sl_No}</TableCell>
                          <TableCell align="left">{itemvalue.item_description}</TableCell>
                          <TableCell align="left">{itemvalue.total_value} </TableCell>
                          <TableCell align="left">{itemvalue.baned_item}</TableCell>
                        </TableRow>
                      )
                      })}
                    </TableBody>
                  </Table>
                  </TableContainer>
                  <Divider/>
                  <TablePagination
        component="div"
        count={itemdetails.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
                </Paper>
                </Container>
                {/* <div >
                    <Button variant="outlined" color="primary" size="small" className={classes.buttonUG} onClick={UpdateItemValues}>update</Button>
                    <Button variant="outlined" color="primary" size="small" className={classes.buttonR}>Refresh</Button>
                </div> */}
            </Paper>
        </div>
    )
}
