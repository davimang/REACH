import React from 'react';
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useAuth } from '../contexts/AuthContext';
import { StyledButton } from './ButtonStyle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const ProfileIcon = styled(AccountCircleIcon)`
    color: #039D5F;
    background-color: #039D5F;
    border-radius: 50%;
    padding: 0px;
    fill: white;
    cursor: pointer;
    font-size: 60px;
    margin-left: auto;
    margin-right: 10px;
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
    color: #039D5F;
    cursor: pointer;
    font-size: 60px;
    margin-left: 20px; /* Adjust the margin as needed */
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

const MenuHeader: React.FC = () => {
    const { isAuthenticated, userId, login, logout, register } = useAuth();
    // constant for going to create profile page
    const navigate = useNavigate();
    const navigateToProfileCreation = () => {
        navigate('/createProfile');
    }
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
                    <Link to='/contact'>
                        <div style={{ paddingLeft: 2, paddingRight: 2, backgroundColor: '#FFFFFF' }}><HeaderButton>Contact Us</HeaderButton></div>
                    </Link>
                    <Link to='/about'>
                        <div style={{ borderTopRightRadius: 10, borderBottomRightRadius: 10 }}><HeaderButton>About Us</HeaderButton></div>
                    </Link>
                </MenuButtons>
                { isAuthenticated ? (
                    <Link to='/login'>
                        <div style={{ borderRadius: 10, width: 125, paddingLeft: 20, marginRight: 10}}><HeaderButton>Sign In</HeaderButton></div>
                    </Link>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        {/* <Link to='/listprofiles'>
                            <div style={{ borderRadius: 10, width: 125, paddingLeft: 20, marginRight: 10 }}><HeaderButton>Profiles</HeaderButton></div>
                        </Link>  -- Remove this for the moment bc button is unappealing*/} 
                        <Link to='/savedTrials'>
                            <FilledBookmarkIcon /> 
                        </Link>
                        <Link to='/listprofiles'>
                            <ProfileIcon />
                        </Link>
                    </div>                    
                )}
            </HeaderComponents >
        </Header >
    );
};

export default MenuHeader;
