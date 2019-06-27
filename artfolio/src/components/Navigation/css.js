import styled from "styled-components";
import * as colors from "../../assets/styling";

export const HeaderTag = styled.header`
  a, .user {
    text-decoration: none;
    color: ${colors.navLinks};
    font-size: 2.8rem;
    font-weight: bold;
    transition: 0.2s;
    margin: 0 2rem;
    padding-bottom: 0.2rem;
    &:hover{
      color: ${colors.sadBlue};
      transition: 0.2s;
    }
    @media (max-width: 760px){
        margin: 1rem;
      }
    &.active{
      border-bottom: 2px solid ${colors.activeLink}
    }
  }

  nav {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${colors.HeaderBgColor};
    padding: 2rem;
    box-shadow: 0 3px 4px 0 rgba(0,0,0,0.5);
    z-index: 0;
    @media (max-width: 1250px){
        flex-direction: column;
      }
    section{
      display: flex;
      justify-content: space-between;
      align-items: center;
      @media (max-width: 1250px){
        width: 100%;
      }
      @media (max-width: 760px){
        flex-direction: column;
      }
    }
    .user{
      display: flex;
      align-items: center;
      img{
      height: 6rem;
      margin: 0 1.25rem;
      @media (max-width: 760px){
        display: none;
      }
    }
  }
  h1 {
    font-family: "lobster", cursive;
    font-size: 5.5rem;
    letter-spacing: 0.2rem;
    color: ${colors.navLinks};
    margin: 0 1.8rem;
    @media (max-width: 1250px){
      font-size: 3.6rem;
      margin-bottom: 1rem;
      }
  }
  }
  input{
    background-color: ${colors.navInput};
    border: 1px solid ${colors.navInputBorder};
    border-radius: 0.5rem;
    height: 3rem;
    width: 30rem;
    padding: 0.2rem 0.5rem;
    color: ${colors.navLinks};
    @media (max-width: 1250px){
      font-size: 3.6rem;
      margin-bottom: 1rem;
      }
  }
`;

export default HeaderTag;
