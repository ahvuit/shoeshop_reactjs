import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const Profile = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
  
    if (!currentUser) {
      return <Navigate to="/login" />;
    }  
    return (
      <div >
       <h1>Login success and this is a page Profile</h1>
      </div>
    );
  };
  
  export default Profile;