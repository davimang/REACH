import React from 'react';
import styled from '@emotion/styled';

const Header = styled.div`
    padding: 25px;
    background-color: #1D366F;
    height: 100px;
    
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
    cursor: pointer;
    padding: 0 15px;
`;

const MenuButtons = styled.div`
display: inline-flex;
`;


const LandingPage = () => {
    
    return (
        <Header>
            <HeaderComponents>
                <img src={require("../images/Logo.svg")} height={100} />
                <MenuButtons>
                    <div style={{borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}><StyledButton>FAQs</StyledButton></div>
                    <div><StyledButton>Contact Us</StyledButton></div>
                    <div style={{borderTopRightRadius: 10, borderBottomRightRadius: 10}}><StyledButton>About Us</StyledButton></div>
                </MenuButtons>
                <div style={{borderRadius: 10, width: 125, paddingLeft: 5}}><StyledButton>Sign In</StyledButton></div>
            </HeaderComponents>
        </Header>
    );
}

export default LandingPage;
