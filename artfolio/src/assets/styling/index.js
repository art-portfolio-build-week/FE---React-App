import styled from "styled-components";

const paleYellow = "#e9db7b";
const polishedGold = "#e3cf4d";
const seaBlue = "#405768";
const deepSeaBlue = "#153d5b";
const deepSeaBlueDarker = "#071522";
const white = "#ebedef";
export const sadBlue = "#7b969c";
export const sadBabyBlue = "#153d5b66";
export const navyBlue = "#081826";

export const headerButton = paleYellow;
export const headerButtonHover = polishedGold;
export const HeaderBgColor = deepSeaBlueDarker;
export const navLinks = white;
export const navInput = seaBlue;
export const activeLink = polishedGold;
export const navInputBorder = deepSeaBlue;

export const Button = styled.button`
    align-self: center;
    width: 60%;
    color: white;
    font-size: 2.2rem;
    padding: 1rem;
    background-color: #153D5B;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.5);
    border-radius: 1.5rem;
    border: 3px solid #153D5B;
    margin-top: 0.5rem;
    transition: 0.2s;
    margin-bottom: 3.5rem;
    cursor: pointer;
    &:hover{
      transition: 0.2s;
      background-color: ${deepSeaBlueDarker};
      border: 3px solid #171D21;
    }
`;
