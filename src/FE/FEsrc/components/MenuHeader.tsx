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
import MenuIcon from '@mui/icons-material/Menu';
import { Tooltip } from '@mui/material';


const ProfileIcon = styled(AccountCircleIcon)`
    color: #039D5F;
    fill: white;
    font-size: 60px;
`;

const StyledMenuIcon = styled(MenuIcon)`
    color: white;
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
`;

const HeaderButton = styled(StyledButton)`
    height: 65px;
    width: inherit;
    border-radius: inherit;
`;

const MenuButton = styled(HeaderButton)`
    width: 200px;
    border-radius: 10px;
`;

const MenuButtons = styled.div`
    display: inline-flex;
    @media (min-width: 1400px) {
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        top: 45px;
    }
`;

const MenuContainer = styled.div`
    position: fixed;
    top: 45px;
    left: 50%;
    transform: translateX(-50%);
    @media (max-width: 550px) {
        position: inherit;
        transform: translateX(0);
    }
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
`;

const DropdownText = styled.p`
    color: white;
    margin-left: 10px;
    margin-right: 10px;
    font-size: 22px;
    font-family: math;
`;

const AccountDropdown = styled.ul<AccountDropdownProps>`
    position: fixed;
    padding: 0;
    top: 80px;
    right: 40px;
    display: none;
    background-color: #039D5F;
    box-shadow: 0px 5px 10px rgba(0,0,0,0.2); 
    cursor: pointer;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid white;

  ${({ isopen }) => isopen && `
    display: grid;
  `}
`;

const MenuDropdown = styled.ul<AccountDropdownProps>`
    position: absolute;
    padding: 0;
    display: none;
    background-color: #039D5F;
    box-shadow: 0px 5px 10px rgba(0,0,0,0.2); 
    cursor: pointer;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid white;

  ${({ isopen }) => isopen && `
    display: grid;
  `}
`;

const AccountCircle = styled.div`
    position: fixed;
    right: 10px;
    top: 45px;
    @media (max-width: 480px) {
        margin-left: 10px;
        position: inherit;
    }
`;

const DropdownLink = styled(Link)`
    text-decoration: none;
`;

const SignInContainer = styled.div`
    position: fixed;
    right: 10px;
    top: 45px;
    border-radius: 10px;
    width: 125px;
    padding-left: 20px;
    margin-right: 10px;
    @media (max-width: 550px) {
        position: inherit;
    }
`;

interface AccountDropdownProps {
    isopen: boolean;
}

const MenuHeader: React.FC = () => {
    const navigate = useNavigate();
    const dropdownRefAcc = useRef<HTMLDivElement>(null);
    const dropdownListRefAcc = useRef<HTMLUListElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dropdownListRef = useRef<HTMLUListElement>(null);
    const [isOpenAcc, setIsOpenAcc] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, userId, login, logout, register } = useAuth();
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const checkScreenSize = () => {
        if (window.innerWidth <= 1100) {
            setIsSmallScreen(true);
        } else {
            setIsSmallScreen(false);
        }
    };

    useEffect(() => {
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownListRefAcc.current && dropdownListRefAcc.current.contains(event.target as Node)) {
                setTimeout(() => { setIsOpenAcc(false); }, 250);
            } else if (dropdownRefAcc.current && !dropdownRefAcc.current.contains(event.target as Node)) {
                setIsOpenAcc(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRefAcc, isOpenAcc]);

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

    const handleDropdownToggleAcc = (event: React.MouseEvent) => {
        event.stopPropagation();

        setIsOpenAcc(!isOpenAcc);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Header>
            <HeaderComponents>
                <Link to='/'>
                    {isSmallScreen ? (
                        <img
                            src={require('../images/MiniLogo.svg')}
                            height={90}
                            style={{ paddingRight: 20, cursor: 'pointer' }}
                        />
                    ) : (
                        <img
                            src={require('../images/Logo.svg')}
                            height={100}
                            style={{ paddingRight: 20, cursor: 'pointer' }}
                        />
                    )}
                </Link>

                <div>
                    {isSmallScreen ? (
                        <MenuContainer onClick={handleDropdownToggle} ref={dropdownRef} >
                            <MenuButton>
                                <StyledMenuIcon />
                            </MenuButton>
                            <MenuDropdown isopen={isOpen} ref={dropdownListRef}>
                                <DropdownLink to='/faq'>
                                    <Tooltip title='FAQs'>
                                        <DropDownInput>
                                            <HeaderButton>FAQs</HeaderButton>
                                        </DropDownInput>
                                    </Tooltip>
                                </DropdownLink>
                                <DropdownLink to={isAuthenticated ? '/search' : '/login'}>
                                    <Tooltip title='Search'>
                                        <DropDownInput>
                                            <HeaderButton>Search</HeaderButton>
                                        </DropDownInput>
                                    </Tooltip>
                                </DropdownLink>
                                <DropdownLink to='/contact'>
                                    <Tooltip title='Contact Us'>
                                        <DropDownInput>
                                            <HeaderButton>Contact Us</HeaderButton>
                                        </DropDownInput>
                                    </Tooltip>
                                </DropdownLink>
                                <DropdownLink to='/about'>
                                    <Tooltip title='About Us'>
                                        <DropDownInput>
                                            <HeaderButton>About Us</HeaderButton>
                                        </DropDownInput>
                                    </Tooltip>
                                </DropdownLink>
                            </MenuDropdown >
                        </MenuContainer>

                    ) : (
                        <MenuButtons>
                            <Link to='/faq'>
                                <div style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}><HeaderButton>FAQs</HeaderButton></div>
                            </Link>
                            <Link to={isAuthenticated ? '/search' : '/login'}>
                                <div style={{ paddingLeft: 2, paddingRight: 2, backgroundColor: '#FFFFFF' }}><HeaderButton>Search</HeaderButton></div>
                            </Link>
                            <Link to='/contact'>
                                <div style={{ paddingRight: 2, backgroundColor: '#FFFFFF' }}><HeaderButton>Contact Us</HeaderButton></div>
                            </Link>
                            <Link to='/about'>
                                <div style={{ borderTopRightRadius: 10, borderBottomRightRadius: 10 }}><HeaderButton>About Us</HeaderButton></div>
                            </Link>
                        </MenuButtons>
                    )
                    }
                </div >
                {!isAuthenticated ? (
                    <Link to='/login'>
                        <SignInContainer><HeaderButton>Sign In</HeaderButton></SignInContainer>
                    </Link>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <AccountCircle onClick={handleDropdownToggleAcc} ref={dropdownRefAcc}>
                            <AccountIcon />
                        </AccountCircle>
                        <AccountDropdown isopen={isOpenAcc} ref={dropdownListRefAcc}>
                            <DropdownLink to='/savedStudies'>
                                <Tooltip title='Saved Trials'>
                                    <DropDownInput>
                                        <FilledBookmarkIcon />
                                        <DropdownText>Saved Studies</DropdownText>
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
