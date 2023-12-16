import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Nav(userType){
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    console.log('User type changed:', userType);
  }, [userType]);

  switch (userType.userType){
    case "admin":
      return(
        <>
          <div className="list-group p-3 text-primary">
            <Link to="/Homepage" className={`list-group-item ${currentPath === "/Homepage" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Home </Link> 
            <Link to="/Dashboard-Admin" className={`list-group-item ${currentPath === "/Dashboard-Admin" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Dashboard </Link> 
            <Link to="/Billing" className={`list-group-item ${currentPath === "/Billing" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Billing </Link> 
            <Link to="/Emergency" className={`list-group-item ${currentPath === "/Emergency" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Emergency </Link> 
            <Link to="/Emergency-Response" className={`list-group-item ${currentPath === "/Emergency-Response" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Emergency Response</Link> 
            <Link to="/UserManagement" className={`list-group-item ${currentPath === "/UserManagement" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> User Management </Link> 
            <Link to="/Profile" className={`list-group-item ${currentPath === "/Profile" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Profile </Link> 
            <Link to="/Login" className={`list-group-item ${currentPath === "/Login" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Login </Link> 
          </div>
        </>
      );
    case "temp":
      return(
        <>
          <div className="list-group p-3 text-primary">
            <Link to="/Homepage" className={`list-group-item ${currentPath === "/Homepage" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Home </Link> 
            <Link to="/Dashboard" className={`list-group-item ${currentPath === "/Dashboard" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Dashboard </Link> 
            <Link to="/DeviceControl" className={`list-group-item ${currentPath === "/DeviceControl" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Device Control </Link> 
            <Link to="/Energy-Suggestions" className={`list-group-item ${currentPath === "/Energy-Suggestions" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Energy Suggestions </Link> 
            <Link to="/Emergency" className={`list-group-item ${currentPath === "/Emergency" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Emergency </Link> 
            <Link to="/Profile" className={`list-group-item ${currentPath === "/Profile" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Profile </Link> 
            <Link to="/Login" className={`list-group-item ${currentPath === "/Login" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Login </Link> 
          </div>
        </>
      );
    case 'emergency':
      return(
        <>
          <div className="list-group p-3 text-primary">
            <Link to="/Homepage" className={`list-group-item ${currentPath === "/Homepage" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Home </Link> 
            <Link to="/Emergency" className={`list-group-item ${currentPath === "/Emergency" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Emergency </Link> 
            <Link to="/Emergency-Response" className={`list-group-item ${currentPath === "/Emergency-Response" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Emergency Response </Link> 
            <Link to="/Profile" className={`list-group-item ${currentPath === "/Profile" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Profile </Link> 
            <Link to="/Login" className={`list-group-item ${currentPath === "/Login" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Login </Link> 
          </div>
        </>
      );
    case 'energy':
      return(
        <>
          <div className="list-group p-3 text-primary">
            <Link to="/Homepage" className={`list-group-item ${currentPath === "/Homepage" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Home </Link> 
            <Link to="/Dashboard-Admin" className={`list-group-item ${currentPath === "/Dashboard-Admin" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Dashboard </Link> 
            <Link to="/Billing" className={`list-group-item ${currentPath === "/Billing" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Billing </Link> 
            <Link to="/Energy-Suggestions" className={`list-group-item ${currentPath === "/Energy-Suggestions" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Energy Suggestions </Link> 
            <Link to="/Suggestion-Provider" className={`list-group-item ${currentPath === "/Suggestion-Provider" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Energy Suggestion Provider </Link> 
            <Link to="/DeviceControl" className={`list-group-item ${currentPath === "/DeviceControl" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Device Control </Link> 
            <Link to="/Emergency" className={`list-group-item ${currentPath === "/Emergency" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Emergency </Link> 
            <Link to="/Profile" className={`list-group-item ${currentPath === "/Profile" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Profile </Link> 
            <Link to="/Login" className={`list-group-item ${currentPath === "/Login" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Login </Link> 
          </div>
        </>
      );
    case null:
      return(
        <>
          <div className="list-group p-3 text-primary">
            <Link to="/Homepage" className={`list-group-item ${currentPath === "/Homepage" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Home </Link> 
            <Link to="/Login" className={`list-group-item ${currentPath === "/Login" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Login </Link> 
          </div>
        </>
      );
    default:
      return(
        <>
          <div className="list-group p-3 text-primary">
            <Link to="/Homepage" className={`list-group-item ${currentPath === "/Homepage" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Home </Link> 
            <Link to="/Login" className={`list-group-item ${currentPath === "/Login" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Login </Link> 
          </div>
        </>
      );
  }
}

export default Nav;

/*function Nav({ active = 'Homepage' }) { 
  const location = useLocation();
  const currentPath = location.pathname;
  
  return ( 
    <div className="list-group p-3 text-primary">
      <Link to="/Homepage" className={`list-group-item ${currentPath === "/Homepage" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Home </Link> 
      <Link to="/Dashboard" className={`list-group-item ${currentPath === "/Dashboard" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Dashboard </Link> 
      <Link to="/Energy-Suggestions" className={`list-group-item ${currentPath === "/Energy-Suggestions" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Energy Suggestions </Link> 
      <Link to="/DeviceControl" className={`list-group-item ${currentPath === "/DeviceControl" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Device Control </Link> 
      <Link to="/Login" className={`list-group-item ${currentPath === "/Login" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Login </Link> 
      <Link to="/Emergency" className={`list-group-item ${currentPath === "/Emergency" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Emergency </Link> 
      <Link to="/Profile" className={`list-group-item ${currentPath === "/Profile" ? 'text-dark bg-light active' : 'text-light bg-dark'}`}> Profile </Link> 
    </div>
  );
} 
 
export default Nav;*/
