import React, { useState } from 'react';
import styled from 'styled-components';
import {FiLogOut}from 'react-icons/fi';
import {AiFillCaretRight }from 'react-icons/ai';
import { Navbar } from 'react-bootstrap';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import {  Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert'
import { getDate, getUser } from '../Utils/Common';
// import { getUser,getDate,removeUserSession} from '../Utils/Common';


const SidebarNav = styled.nav`
  background:rgb(31, 28, 241);
  width: 200px;
  height: 92.4vh;
  display: flex;
  margin-top:74px;
  justify-content: center;
  position: fixed;
  
    top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;
const BackgroundTransperent = styled.nav`
background-color: #4CAF50;
 opacity:0.5;
`;
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const Sidebar = () => {
  const [menuBar , setMenubar] = useState(true)
  const [sidebar, setSidebar] = useState(false);
  const [open ,setOpen] = useState(false);
  const handleLogout = () => {
    // removeUserSession();
    window.location.replace("/St_cargo_clearance");  
  }
  const showSidebar = () =>{ 
    setSidebar(!sidebar)
    setMenubar(!menuBar)
  };
  const handleClose =()=>{
    setOpen(false);
  }

  return (
    <>
<div >
        <Navbar fixed="top" bg="primary" variant="dark" expand="" className="p-3 font-bold font-serif">
                <div style={{fontSize:"13px"}}>
                 <div style={{color:"rgb(245, 241, 241)"}} >
                <b>Welcome:  </b><b className="username">{getUser()} </b>
                {/* <label >{getUser()}</label> */}
                  <br/>
                 <b>Date: </b><b className="username">{getDate()}</b>
                 {/* <label >{getDate()}</label> */}
                 </div>
                 </div>
                        <b><h3 style={{color:"red",fontWeight:"bolder",fontFamily:"Monospace"}}>ST Cargo Clearance</h3></b>
                      <Button className="p-1 w-20" onClick={handleLogout} >LOGOUT<FiLogOut style={{marginLeft:"2rem"}} size="20"/></Button>
                    </Navbar>
                    <div className="sidenav">
             {menuBar ? <span onMouseEnter={showSidebar} className="MenuBar"><AiFillCaretRight   style={{marginTop:"45vh"}} size="20px"/>
                 </span> : null }</div>
                    <br/>                    
              <SidebarNav sidebar={sidebar} onMouseLeave={showSidebar} >
                <div className="scrollbar scrollbar-primary" style={{width:"100%"}}>
            {/* <SidebarWrap > */}
            <span  className="about">
             </span>
             {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          {/* </SidebarWrap> */}
          </div>
        </SidebarNav>
        <BackgroundTransperent sidebar={sidebar} />
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
        <Alert onClose={handleClose} severity="success">
          Login success!
        </Alert>
      </Snackbar>
      </div>
    </>
  );
};

export default Sidebar;
/**/