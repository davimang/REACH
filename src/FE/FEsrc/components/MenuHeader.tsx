import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useAuth } from '../contexts/AuthContext';
import { StyledButton } from './Button';

const Header = styled.div`
    padding: 25px;
    background-color: #1D366F;
    height: 100px;
    min-width: fit-content;
    position: sticky;
    top: 0;
    z-index: 1;
`;

const HeaderComponents = styled.div`
    display: inline-flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
`;

const HeaderButton = styled(StyledButton)`
    height: 65px;
    width: inherit;
    border-radius: inherit;
    font-size: 22px;
    font-family: math;
`;

const MenuButtons = styled.div`
    display: inline-flex;
`;

const MenuHeader: React.FC = () => {
    const { isAuthenticated, userId, login, logout, register } = useAuth();

    return (
        <Header>
            <HeaderComponents>
                <Link to="/">
                    <img
                        src={require("../images/Logo.svg")}
                        height={100}
                        style={{ paddingRight: 20, cursor: 'pointer' }}
                    />
                </Link>
                <MenuButtons>
                    <Link to='/faq'>
                        <div style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}><HeaderButton>FAQs</HeaderButton></div>
                    </Link>
                    <Link to="/contact">
                        <div style={{ paddingLeft: 2, paddingRight: 2, backgroundColor: '#FFFFFF' }}><HeaderButton>Contact Us</HeaderButton></div>
                    </Link>
                    <Link to="/about">
                        <div style={{ borderTopRightRadius: 10, borderBottomRightRadius: 10 }}><HeaderButton>About Us</HeaderButton></div>
                    </Link>
                </MenuButtons>
                {!isAuthenticated ? (
                    <Link to="/login">
                        <div style={{ borderRadius: 10, width: 125, paddingLeft: 20 }}><HeaderButton>Sign In</HeaderButton></div>
                    </Link>
                ) : (
                    <Link to="/listprofiles">
                        <div style={{ borderRadius: 10, width: 125, paddingLeft: 20 }}><HeaderButton>Profiles</HeaderButton></div>
                    </Link>
                )}
            </HeaderComponents >
        </Header >
    );
};

export default MenuHeader;
