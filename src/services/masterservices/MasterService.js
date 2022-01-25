import axios from "axios";

const Base_ApI_url ="http://localhost:8080/st_cargo_clearance_v1/st_cargo/sit/private/v1/prelogin/master";

class MasterService{
   getItemValue(Mawb_no,Invoice_no){
       console.log(Mawb_no+" && "+Invoice_no)
       return axios.get(Base_ApI_url+"/getitemvalues?MAWB_NO="+Mawb_no+"&Invoice_NO="+Invoice_no);
   }
   addItemValue(item_details){
       return axios.put(Base_ApI_url+"/updateItemValue",item_details);
   }
   /* kyc */
   //getCustomsbill
   getCustomerBill(){
       return axios.get(Base_ApI_url+"/getCustomBillType");
   }
   //getCustomerType
   getCustomerType(){
       return axios.get(Base_ApI_url+"/getCustomerType");
   }
   //getOrigineCountry
   getOrigineCountry(){
       return axios.get(Base_ApI_url+"/getOriginCountry");
   }
   //getState
   getState(){
       return axios.get(Base_ApI_url+"/getReciverState");
   }
   //getCustomerKycConfiguretion
   getCustomerKycConfiguretion(){
       return axios.get(Base_ApI_url+"/getKycConfiguretionDto");
   }
   //getCustomerDetails
   getCustomerDetails(){
       return axios.get(Base_ApI_url+"/getCustomer");
   }
   addCustomerDetails(customers){
       return axios.post(Base_ApI_url+"/addCustomerDetails",customers);
   }
}
 
export default new MasterService();