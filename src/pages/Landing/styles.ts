import styled from 'styled-components';
import {colors} from '../../assets/color-palette';
import landingImg from '../../assets/images/landing.svg'
export const Landing = styled.div`
    width:100vw;
    height: 100vh;
    background: linear-gradient(329.54deg, ${colors.prin1} 0%,  ${colors.prin2} 100%);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const CotentWrapper = styled.div`
    position: relative;
    width: 100%;
    max-width: 1100px;
    height: 100%;
    max-height: 680px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: space-between;
    background-image: url(${landingImg});
    background-repeat: no-repeat;
    background-position: 80% center;
    main{
        max-width: 350px;
    }
    main h1{
        font-size: 76px;
        font-weight: 900;
        line-height: 70px;
    }
    main p{
        margin-top: 40px;
        font-size:24px;
        line-height: 34px;
    }
    a{
        position: absolute;
        right:0;
        bottom:0;

        width: 80px;
        height: 80px;
        background: ${colors.sec1};
        border-radius: 30px;

        display: flex;
        align-items: center;
        justify-content: center;
        transition: .2s;
    }
    a:hover{
        background: ${colors.terc1};

    }
`;
export const Location = styled.div`
    position: absolute;
    right:0;
    top:0;
    font-size:24px;
    line-height:34px;
    display: flex;
    flex-direction: column;
    text-align: right;
    strong{
        font-weight: 800px;
    }
`;