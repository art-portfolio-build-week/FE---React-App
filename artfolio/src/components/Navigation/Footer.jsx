import React from "react";
import styled from "styled-components";

const Footer = styled.footer`
  padding: 1.5rem;
  background-color: #071622;
  color: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  div{
    flex-direction: column;
    width: 50%;
  }
 h4,p{
  cursor: pointer;
  font-style: normal;
  text-align: center;
 }
 
 h4 {
  font-weight: bold;
  font-family: "Lato", sans-serif;
  text-decoration-color: yellow;
  font-size: 15px;
 }
 
 p {
  font-family: "Lato", sans-serif;
  font-size: 13px;
 }
 .copyright{
   align-self: flex-end;
 }
`;

export default function () {
  return (
    <Footer>
      <div>
        <h4>Company</h4>
        <p>Privacy Policy</p>
      </div>
      <div>
        <h4>Site Map</h4>
        <p>Create Account</p>
        <p>Sign In</p>
      </div>
      <p className="copyright">Copyright Artista</p>
    </Footer>
  );
}
