import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useAuth } from '../contexts/AuthContext';
import { StyledButton } from './ButtonStyle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import { Tooltip } from '@mui/material';


const ProfileIcon = styled(AccountCircleIcon)`
    color: #039D5F;
    fill: white;
    font-size: 60px;
`;

const AccountIcon = styled(AccountCircleIcon)`
    color: white;
    background-color: white;
    border-radius: 50%;
    cursor: pointer;
    fill: #039D5F;
    font-size: 60px;
`;

const Header = styled.div`
    padding: 25px;
    background-color: #1D366F;
    height: 90px;
    min-width: fit-content;
    position: sticky;
    top: 0;
    z-index: 1;
`;

const FilledBookmarkIcon = styled(BookmarkIcon)`
    color: white;
    font-size: 60px;
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
`;

const MenuButtons = styled.div`
    display: inline-flex;
`;

const ListIcon = styled(ListAltIcon)`
    color: white;
    font-size: 60px;
`;

const LogoutIconStyled = styled(LogoutIcon)`
    color: white;
    font-size: 60px;
`;

const DropDownInput = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #039D5F;
    outline: 1px solid white;
`;

const DropdownText = styled.p`
    color: white;
    margin-left: 10px;
    margin-right: 10px;
    font-size: 22px;
    font-family: math;
`;

const AccountDropdown = styled.ul<AccountDropdownProps>`
    position: absolute;
    padding: 0;
    top: 80px;
    right: 40px;
    display: none;
    background-color: #fff;
    box-shadow: 0px 5px 10px rgba(0,0,0,0.2); 
    cursor: pointer;
    border-radius: 10px;

  ${({ isopen }) => isopen && `
    display: grid;
  `}
`;

const DropdownLink = styled(Link)`
    text-decoration: none;
`;

interface AccountDropdownProps {
    isopen: boolean;
}

const MenuHeader: React.FC = () => {
    const navigate = useNavigate();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dropdownListRef = useRef<HTMLUListElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, userId, login, logout, register } = useAuth();



    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownListRef.current && dropdownListRef.current.contains(event.target as Node)) {
                setTimeout(() => { setIsOpen(false); }, 250);
            } else if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef, isOpen]);

    const handleDropdownToggle = (event: React.MouseEvent) => {
        event.stopPropagation();

        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Header>
            <HeaderComponents>
                <Link to='/'>
                    <img
                        src={require('../images/Logo.svg')}
                        height={100}
                        style={{ paddingRight: 20, cursor: 'pointer' }}
                    />
                </Link>
                <MenuButtons>
                    <Link to='/faq'>
                        <div style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}><HeaderButton>FAQs</HeaderButton></div>
                    </Link>
                    <Link to='/search'>
                        <div style={{ paddingLeft: 2, paddingRight: 2, backgroundColor: '#FFFFFF' }}><HeaderButton>Search</HeaderButton></div>
                    </Link>
                    <Link to='/contact'>
                        <div style={{ paddingRight: 2, backgroundColor: '#FFFFFF' }}><HeaderButton>Contact Us</HeaderButton></div>
                    </Link>
                    <Link to='/about'>
                        <div style={{ borderTopRightRadius: 10, borderBottomRightRadius: 10 }}><HeaderButton>About Us</HeaderButton></div>
                    </Link>
                </MenuButtons>
                {!isAuthenticated ? (
                    <Link to='/login'>
                        <div style={{ borderRadius: 10, width: 125, paddingLeft: 20, marginRight: 10 }}><HeaderButton>Sign In</HeaderButton></div>
                    </Link>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div onClick={handleDropdownToggle} ref={dropdownRef}>
                            <AccountIcon />
                        </div>
                        <AccountDropdown isopen={isOpen} ref={dropdownListRef}>
                            <DropdownLink to='/savedTrials'>
                                <Tooltip title='Saved Trials'>
                                    <DropDownInput>
                                        <FilledBookmarkIcon />
                                        <DropdownText>Saved Trials</DropdownText>
                                    </DropDownInput>
                                </Tooltip>
                            </DropdownLink>
                            <DropdownLink to='/listprofiles'>
                                <Tooltip title='Profiles'>
                                    <DropDownInput>
                                        <ListIcon />
                                        <DropdownText>Profiles</DropdownText>
                                    </DropDownInput>
                                </Tooltip>
                            </DropdownLink>
                            <DropdownLink to='/accountProfile'>
                                <Tooltip title='Account'>
                                    <DropDownInput>
                                        <ProfileIcon />
                                        <DropdownText>Account</DropdownText>
                                    </DropDownInput>
                                </Tooltip>
                            </DropdownLink>
                            <DropDownInput onClick={handleLogout}>
                                <LogoutIconStyled />
                                <DropdownText>Sign Out</DropdownText>
                            </DropDownInput>
                        </AccountDropdown>
                    </div>
                )}
            </HeaderComponents >
        </Header >
    );
};

export default MenuHeader;
