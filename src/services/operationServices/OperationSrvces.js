import axios from 'axios';
import { getUserId } from '../../components/Utils/Common';

const operation_ABI_BASE_URL = "http://localhost:8080/st_cargo/sit/private/v1/prelogin";
class OprationServices {
    getWarehouse() {
        return axios.get(operation_ABI_BASE_URL + '/mawb_invoice_entry/getWarehouse')
    }
    getTransiteType() {
        return axios.get(operation_ABI_BASE_URL + '/mawb_invoice_entry/getTransiteType')
    }
    getOrganizetion() {
        return axios.get(operation_ABI_BASE_URL + '/mawb_invoice_entry/getOrganizetion')
    }
    //get Shipment
    getShipment() {
        return axios.get(operation_ABI_BASE_URL + '/mawb_invoice_entry/getShipment')
    }
    // getConsigmentBasedOnShipment
    getConsigmentBasedOnShipment(shipment_id) {
        return axios.get(operation_ABI_BASE_URL + '/mawb_invoice_entry/getConsigmentBasedOnShipment?Shipment_id=' + shipment_id)
    }

    /*MAWB Invoice Entry Module Services*/
    getMAWBNOdata(origin_id) {
        return axios.get(operation_ABI_BASE_URL + '/mawb_invoice_entry/getMawb?originWhare_houese_id=' + origin_id);
    }
    updateMAWB(update_invoice) {
        return axios.put(operation_ABI_BASE_URL + "/mawb_invoice_entry/updateConsigment", update_invoice);
    }
    //load invoice number
    loadInvoice(consigment_no) {
        return axios.get(operation_ABI_BASE_URL + '/mawb_invoice_entry/loadInvoice?consigment_no=' + consigment_no + "&created_by=" + getUserId());
    }
    /* --Invoice-Entry-Updetion-- */
    //getInvoiceBasedConsignment
    getInvoiceNO(consignment) {
        return axios.get(operation_ABI_BASE_URL + '/mawb_invoice_entry/getInvoiceBasedOnConsignment?consigment_no=' + consignment);
    }
    //getInvoiceBasedConsignment
    updateInvoice(InvoiceDetails) {
        return axios.put(operation_ABI_BASE_URL + '/mawb_invoice_entry/updateInvoice', InvoiceDetails);
    }
    /*
            KycImageUpload
    */
    //getKycIdProof
    getKycIdProof(invoice_id) {
        return axios.get(operation_ABI_BASE_URL + '/mawb_invoice_entry/getKycIdProof?InvoiceId=' + invoice_id);
    }

    //getKycIdProof
    UpdateKycIdProof(image_id_details) {
        return axios.put(operation_ABI_BASE_URL + '/mawb_invoice_entry/uploadKycIdProof', image_id_details);
    }

    /*
         ---Igm Genaretion-----
    */
    //getIGMno
    getIGMNo(mawb_no) {
        console.log("igm genaretion")
        return axios.get(operation_ABI_BASE_URL + "/igm_genaration/getIGMdetails?MAWBNo=" + mawb_no);
    }
    //insertIGMno
    addIgmNO(igm_details) {
        return axios.post(operation_ABI_BASE_URL + "/igm_genaration/addIGMdetails", igm_details);
    }
    //updateIGMno
    updateIGM(igm_id, igm_details) {
        return axios.put(operation_ABI_BASE_URL + "/igm_genaration/updateIGM?IGM_Id=" + igm_id, igm_details);
    }
    //deleteIGMno
    deleteIGMno(igm_id) {
        return axios.delete(operation_ABI_BASE_URL + "/igm_genaration/DeleteIGM?IGM_Id=" + igm_id);
    }
    //getInvoice Based on MAWB
    getUnUpdatedIGM_invoice(mawb_no){
        return axios.get(operation_ABI_BASE_URL+"/igm_genaration/getUnUpdatedIGM_invoice?MAWB_NO="+mawb_no);
    }
    //Assign Invoice Based on Igm
    assignInvoiceBasedIgm(assign_igm) {
        // console.log("assign = "+JSON.stringify(Assign_IGM))
        return axios.post(operation_ABI_BASE_URL + "/igm_genaration/AssignInvoice", assign_igm);
    }
    //viewIGM
    getInvoiceBasedIgm(igm_id) {
        return axios.get(operation_ABI_BASE_URL + "/igm_genaration/getInvoiceBasedIgm?IGM_ID=" + igm_id);
    }
    //removeIGM
    removeIgm(invoice_id, igm_id) {
        return axios.delete(operation_ABI_BASE_URL + "/igm_genaration/removeIGM?Invoice_id=" + invoice_id + "," + igm_id);
    }
    //get IGM BASED IGM NO
    getIGMdetailsSelected(igm_no) {
        return axios.get(operation_ABI_BASE_URL + "/igm_genaration/getIGMdetailsBasedIGMNo?IGM_No=" + igm_no)
    }
    /*
    
    
       //updateInvoice
       UpdateInvoice(invoice_id,invoice_details){
           return axios.post(operation_ABI_BASE_URL+"//updateInvoice?Invoice_ID="+invoice_id,invoice_details);
       }*/

    /*
     -----DataCorraction------
    */

    //getPkgeList
    getPackagList(invice_id) {
        return axios.get(operation_ABI_BASE_URL + "/datacorrection/getPkgList?Invoiceid=" + invice_id);
    }
    //updatePkgList
    updatePackageList(invice_id, invoice_packgedata) {
        return axios.put(operation_ABI_BASE_URL + "/datacorrection/updatePkgList?Invoice_ID=" + invice_id, invoice_packgedata);
    }
    //getDataCorrectionForWight
    getDataCorrectionForWight(consigment_no, filter_value) {
        return axios.get(operation_ABI_BASE_URL + "/datacorrection/getWight?ConsimentNo=" + consigment_no + "&FilterValue=" + filter_value);
    }
    //getDataCorrectionForItemValue
    getDataCorrectionForItemValue(invice_data_to) {
        return axios.post(operation_ABI_BASE_URL + "/datacorrection/getItemValue", invice_data_to);
    }
    //getDataCorrectionpkgList
    getDataCorrectionpkgList(consigment_no, filter_value) {
        return axios.get(operation_ABI_BASE_URL + "/datacorrection/getDataCorrectionPkgList?ConsimentNo=" + consigment_no + "&FilterValue=" + filter_value);
    }
    //getDataCorrectionBannedIteme
    getDataCorrectionBannedIteme(consigment_no, filter_value) {
        return axios.get(operation_ABI_BASE_URL + "/datacorrection/getBannedItems?ConsimentNo=" + consigment_no + "&FilterValue=" + filter_value);
    }
    getSUMMARY(consigment) {
        return axios.get(operation_ABI_BASE_URL + "/datacorrection/getSummary?ConsigmentNo=" + consigment);
    }
    updateDatacorrectionWight(Invoice_ID, Wight) {
        return axios.put(operation_ABI_BASE_URL + "/datacorrection/updateWight?Invoice_ID=" + Invoice_ID + "&Wight=" + Wight);
    }
    UpdateDataCorrectionItemValue(InvoiceDataDetails) {
        return axios.put(operation_ABI_BASE_URL + "/datacorrection/updateItemValue", InvoiceDataDetails);
    }
    updateDataCorrectionPkgList(InvoiceDataDetails) {
        return axios.put(operation_ABI_BASE_URL + "/datacorrection/updatePkgListCorrection", InvoiceDataDetails);
    }
    deleteBannedItems(InvoiceId, ItemeId) {
        return axios.put(operation_ABI_BASE_URL + "/datacorrection/deleteBannedItems?InvoiceId=" + InvoiceId + "&ItemeId" + ItemeId);
    }
}
export default new OprationServices();