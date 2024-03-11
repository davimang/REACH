import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '..';
import styled from '@emotion/styled';

const AccountProfilePageContainer = styled.div`
    display: flex;
`;

const Header = styled.h1`
    color: white;
`;

const AccountInfoContainer = styled.div`
    padding: 25px;
    width: 45%;
    height: fit-content;
    justify-content: center;
    display: grid;
    color: #FFFFFF;
    font-size: 20px;
    font-family: math;
`;

const EditButton = styled.button`
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    margin-top: 20px;
`;

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  clinician_account: boolean;
}

const AccountProfile: React.FC = () => {

  const userId = localStorage.getItem('userId');
  const [userData, setUserData] = useState<UserData>({ first_name: '', last_name: '', email: '', clinician_account: false });
  const [authToken, setAuthToken] = useState(localStorage.getItem('accessToken'));

  const fetchUserData = () => {
    try {
      const endpoint = `/userdata/${userId}/`;
      const requestOptions = {
        headers: { 'Authorization': `Bearer ${authToken}` }
      };
      fetch(`${API_URL}${endpoint}`, requestOptions).then(response => response.json()).then(response => { setUserData(response) });
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
      <AccountInfoContainer>
        <Header>Account Information</Header>
        <p>Name: {`${userData.first_name} ${userData.last_name}`}</p>
        <p>Email: {`${userData.email}`}</p>
        <p>Clinician Account: {userData.clinician_account ? 'Yes' : 'No'}</p>
        <Link to="/editAccount">
          <EditButton>Edit Account Information</EditButton>
        </Link>
      </AccountInfoContainer>
    </AccountProfilePageContainer>
  );
};

export default AccountProfile;
