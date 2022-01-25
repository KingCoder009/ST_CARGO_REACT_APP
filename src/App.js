import './App.css';
import Sidebar from './components/home/Sidebar';
import {BrowserRouter as Router,Route,Switch}from 'react-router-dom';
import LoginComponent from './components/logincmp/LoginComponent';
import Itemvalue from './components/master/Itemvalue';
import Kyc from './components/master/Kyc';
import MawbInvoice from './components/opration/MawbInvoice';
import IGMgenaretion from './components/opration/IGMgenaretion';
import InvoiceEntryUpdetion from './components/opration/InvoiceEntryUpdetion';
import DataCorrection from './components/opration/DataCorrection';
import ClearanceDacument from './components/reports_/ClearanceDacument'
import ClearanceRecord from './components/reports_/ClearanceRecord'
import KycUpdetion from './components/opration/KycUpdetion';
import KYCdownload from './components/reports_/KYCdownload';
import GSTclearanceRecord from './components/reports_/GSTclearanceRecord';
import IDproofDownloader from './components/reports_/IDproofDownloader'
import MAWBtracking from './components/reports_/MAWBtracking';
import DocumentDownload from './components/reports_/DocumentDownload';
import MAWBclearanceEntry from './components/opration/MAWBclearanceEntry';
import PodIdProofUpload from './components/opration/PodIdProofUpload';
import AirwayBillUpate from './components/opration/AirwayBillUpate';
import GSTentry from './components/opration/GSTentry';
import KycUpdationDelete from './components/opration/KycUpdationDelete';

function App() {
  return (
   <div>
     <Router basename={'/St_cargo_clearance'}>
                  <div >
                    <Switch>
                      <Route path="/" exact component={LoginComponent} ></Route>
                      <Route path="/home" component={Sidebar} ></Route>
                      {/* Master service */}
                      <Route path="/itemvalue" exact component={Itemvalue}></Route>
                      <Route path="/kyc" exact component={Kyc}></Route>
                     {/* operation */}
                      <Route path="/mawb_invoice" exact component={MawbInvoice}></Route>
                      <Route path="/kyc_updation" exact component={KycUpdetion}></Route>
                      <Route path="/operation/igm_genaretion" exact component={IGMgenaretion}></Route>
                      <Route path="/operation/invoic_updetion" exact component={InvoiceEntryUpdetion}></Route>
                      <Route path="/operation/data_crction" exact component={DataCorrection}></Route>
                      <Route path="/operation/kyc_updation_delete" exact component={KycUpdationDelete}></Route>
                      <Route path="/operation/mawb_clr_entry" exact component={MAWBclearanceEntry}></Route>
                      <Route path="/operation/pod_id_proof" exact component={PodIdProofUpload}></Route>
                      <Route path="/operation/air_way_bils" exact component={AirwayBillUpate}></Route>
                      <Route path="/operation/gst_entry" exact component={GSTentry}></Route>
                     {/* report Service*/}
                     <Route path="/reports/clearancedacument" exact component={ClearanceDacument}></Route>
                      <Route path="/reports/clr_record" exact component={ClearanceRecord}></Route>
                      <Route path="/reports/Kyc_downlode"  component={KYCdownload} ></Route>
                      <Route path="/reports/gst_clr_loc"  component={GSTclearanceRecord} ></Route>
                      <Route path="/reports/id_proof_dwnload"  component={IDproofDownloader} ></Route>
                      <Route path="/reports/mawb_tracking"  component={MAWBtracking} ></Route>
                      <Route path="/reports/document_download" exact component={DocumentDownload}></Route>
                   </Switch>
                  </div>
                  </Router>
   </div>
  );
}

export default App;
/*
  <div >
                  <Router basename={'/St_cargo_clearance'}>
                  <div >
                    <Switch>
                      <Route path="/" exact component={LoginComponent} ></Route>
                      <Route path="/home" component={Sidebar} ></Route>
                      {/* Master service 
                      <Route path="/itemvalue" exact component={Itemvalue}></Route>
                      <Route path="/kyc" exact component={Kyc}></Route>
                      // 
                      <Route path="/mawb_invoice" exact component={MawbInvoice}></Route>
                      <Route path="/kyc_updation" exact component={KycUpdetion}></Route>
                      <Route path="/operation/igm_genaretion" exact component={IGMgenaretion}></Route>
                      <Route path="/operation/invoic_updetion" exact component={InvoiceEntryUpdetion}></Route>
                      <Route path="/operation/data_crction" exact component={DataCorrection}></Route>
                      <Route path="/operation/kyc_updation_delete" exact component={KycUpdationDelete}></Route>
                      <Route path="/operation/mawb_clr_entry" exact component={MAWBclearanceEntry}></Route>
                      <Route path="/operation/pod_id_proof" exact component={PodIdProofUpload}></Route>
                      <Route path="/operation/air_way_bils" exact component={AirwayBillUpate}></Route>
                      <Route path="/operation/gst_entry" exact component={GSTentry}></Route>
                     {/* report Service*///}
                  /*   <Route path="/reports/clearancedacument" exact component={ClearanceDacument}></Route>
                      <Route path="/reports/clr_record" exact component={ClearanceRecord}></Route>
                      <Route path="/reports/Kyc_downlode"  component={KYCdownload} ></Route>
                      <Route path="/reports/gst_clr_loc"  component={GSTclearanceRecord} ></Route>
                      <Route path="/reports/id_proof_dwnload"  component={IDproofDownloader} ></Route>
                      <Route path="/reports/mawb_tracking"  component={MAWBtracking} ></Route>
                      
                      <Route path="/reports/document_download" exact component={EDI_DOCUMENTS}></Route>
                   </Switch>
                  </div>
                  </Router>
                  </div>

    //                <BrowserRouter basename={'/St_cargo_clearance'}>
    //   <Routes >
    //     <Route exact path="/" element={<LoginComponent />} />
    //     <Route path="/home" element={<Sidebar />} />
    //     {/* master */
    //     <Route path="/itemvalue" element={<Itemvalue />} />
    //     <Route path="/kyc" element={<Kyc />} />
    //     {/* operration */}
    //     <Route path="/mawb_invoice" element={<MawbInvoice />} />
    //     <Route path="/kyc_updation" element={<KycUpdetion />} />
    //     <Route path="/operation/igm_genaretion" element={<IGMgenaretion/>} />
    //     <Route path="/operation/invoic_updetion" element={<InvoiceEntryUpdetion/>} />
    //     <Route path="/operation/data_crction" element={<DataCorrection/>} />
    //     <Route path="/operation/kyc_updation_delete" element={<KycUpdationDelete/>} />
    //     <Route path="/operation/mawb_clr_entry" element={<MAWBclearanceEntry/>} />
    //     <Route path="/operation/pod_id_proof" element={<PodIdProofUpload/>} />
    //     <Route path="/operation/air_way_bils" element={<AirwayBillUpate/>} />
    //     <Route path="/operation/gst_entry" element={<GSTentry/>} />
    //     {/* reports */}
    //     <Route path="/reports/clearancedacument" element={<ClearanceDacument/>} />
    //     <Route path="/reports/clr_record" element={<ClearanceRecord/>} />
    //     <Route path="/reports/Kyc_downlode" element={<KYCdownload/>} />
    //     <Route path="/reports/gst_clr_loc" element={<GSTclearanceRecord/>} />
    //     <Route path="/reports/id_proof_dwnload" element={<IDproofDownloader/>} />
    //     <Route path="/reports/mawb_tracking" element={<MAWBtracking/>} />
    //     <Route path="/reports/document_download" element={<DocumentDownload/>} />
    //   </Routes>
    // </BrowserRouter>
