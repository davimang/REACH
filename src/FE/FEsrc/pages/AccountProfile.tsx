import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '..';
import UserDataCard from '../components/UserDataCard';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { StyledButton } from '../components/ButtonStyle';
import { UserData } from '../components/types';

const AccountProfilePageContainer = styled.div`
    display: flex;
`;

const Header = styled.h1`
    color: white
`;

const ProfileListContainer = styled.div`
  display: grid;
  justify-content: center;
  width: 45%;
`;

const UserDataContainer = styled.div`
  padding: 25px;
  width: 45%;
  height: fit-content;
  justify-content: center;
  display: grid;
  color: #FFFFFF;
  font-size: 20px;
  font-family: math;
`;

const SizedButton = styled(StyledButton)`
    height: 65px;
    width: inherit;
    margin-left: 4em;
`;

const AccountProfilePage: React.FC = () => {
  const userId = localStorage.getItem('userId');
  const [userData, setUserData] = useState<UserData>({ first_name: "", last_name: "", created: "", is_clinician: false });
  const [authToken, setAuthToken] = useState(localStorage.getItem('accessToken'));

  const fetchUserData = () => {
    try {
      const endpoint = `/userdata/${userId}/`;
      const requestOptions = {
        headers: { 'Authorization': `Bearer ${authToken}` }
      };
      fetch(`${API_URL}${endpoint}`, requestOptions)
        .then(response => response.json())
        .then(response => { setUserData(response) });
    } catch (error) {
      console.error('Error fetching account info:', error.message);
    }
  }

  useEffect(() => {
    setAuthToken(localStorage.getItem('accessToken'));
  }, [localStorage.getItem('accessToken')]);

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <AccountProfilePageContainer>
      <UserDataContainer>
        <UserDataCard userData={userData} />
        <Link to={`/editProfile`}> {/* Link to the edit profile page */}
          <SizedButton>Edit Profile</SizedButton>
        </Link>
      </UserDataContainer>
      <ProfileListContainer>
        <Header>Profiles</Header>
        {/* Add a button here to add a new profile if needed */}
      </ProfileListContainer>
    </AccountProfilePageContainer>
  );
};

export default AccountProfilePage;
