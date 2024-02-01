import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const Header = styled.div`
    padding: 25px;
    background-color: #1D366F;
    height: 100px;
    min-width: fit-content;
`;

const HeaderComponents = styled.div`
    display: inline-flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
`;

const StyledButton = styled.button`
    height: 65px;
    width: inherit;
    border-radius: inherit;
    background-color: #039D5F;
    border: inherit;
    color: #FFFFFF;
    font-size: 22px;
    font-family: math;
    cursor: pointer;
    padding: 0 15px;
`;

const MenuButtons = styled.div`
    display: inline-flex;
`;

const MenuHeader = () => {
    
    return (
        <Header>
            <HeaderComponents>
                <Link to="/">
                    <img 
                    src={require("../images/Logo.svg")}
                    height={100}
                    style={{paddingRight: 20, cursor: 'pointer'}}
                    />
                </Link>
                <MenuButtons>
                    <div style={{borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}><StyledButton>FAQs</StyledButton></div>
                    <div style={{paddingLeft: 2, paddingRight: 2, backgroundColor: '#FFFFFF'}}><StyledButton>Contact Us</StyledButton></div>
                    <div style={{borderTopRightRadius: 10, borderBottomRightRadius: 10}}><StyledButton>About Us</StyledButton></div>
                </MenuButtons>
                <Link to="/login">
                    <div style={{borderRadius: 10, width: 125, paddingLeft: 20}}><StyledButton>Sign In</StyledButton></div>
                </Link>
            </HeaderComponents>
        </Header>
    );
}

export default MenuHeader;
