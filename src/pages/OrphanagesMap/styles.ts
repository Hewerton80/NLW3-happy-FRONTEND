import styled from "styled-components";
import { colors } from '../../assets/color-palette';

export const Container = styled.div`
    width:100vw;
    height:100vh;
    
    position: relative;
    display: flex;
    a{
        position: absolute;
        right: 40px;
        bottom: 40px;

        width:64px;
        height: 64px;
        background: ${colors.prin3};
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: .2s;
        z-index:100;
    }
    a:hover{
        background: ${colors.prin4};

    }
`;

export const Aside = styled.div`
    width: 440px;
    background: linear-gradient(329.54deg, ${colors.prin1} 0%,  ${colors.prin2} 100%);
    padding: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;


`;

export const Header = styled.header`
    h2{
        font-size: 48px;
        font-weight: 800;
        line-height: 42px; 
        margin-top: 64px;
    }
    p{
        line-height: 28px;
        margin-top: 24px;
    }
`;
export const Footer = styled.div`
    display: flex;
    flex-direction: column;
    line-height: 24px;
    strong{
        font-weight: 800;
    }

`;


