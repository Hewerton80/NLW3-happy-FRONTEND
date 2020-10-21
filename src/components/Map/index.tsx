import styled from "styled-components";

export const Map = styled.div`
height: 100%;
width: 100%;
position: relative;
    .sidebarStyle {
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0;
        margin: 12px;
        background-color: #404040;
        color: #ffffff;
        z-index: 1 !important;
        padding: 6px;
        font-weight: bold;
    }
    
    .mapboxgl-popup {
        /* background-color: rgb(255,255,255,.8);
        border-radius: 20px;
        box-shadow: none;
        color: #0089a5;
        font-size: 20px;
        font-weight: bold;
        margin: 8px 12px;
        display: flex;
        justify-content: space-between;
        align-items: center; */
        max-width: 400px;
        font-size: 16px;
        color: #0089a5;
        font-weight: bold;
        /* a{
            width:40px;
            height: 40px;
            cursor: pointer;
            text-decoration: none;
            color: #fff;

        } */
    }
    /* .mapboxgl-popup-tip{
        display: none;
    } */
`