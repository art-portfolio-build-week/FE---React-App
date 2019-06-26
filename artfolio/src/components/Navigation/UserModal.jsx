import React from "react";

export default function UserModal({modal}) {
  console.log(modal)
  
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  return(
    <div>
      <button>Profile</button>
      <button onClick={logout}>Logout</button>
    </div>
  )
}