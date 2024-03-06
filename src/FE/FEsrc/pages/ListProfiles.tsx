import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '..';
import UserProfileCard from '../components/UserProfileCard';
import UserDataCard from '../components/UserDataCard';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { StyledButton } from '../components/ButtonStyle';

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


interface PatientProfile {
  title: string;
  condition: string;
}

interface UserData {
  first_name: string;
  last_name: string;
  created: string;
}

const ListProfiles: React.FC = () => {

  const userId = localStorage.getItem('userId');
  const [profiles, setProfiles] = useState<PatientProfile[]>([]);
  const [userData, setUserData] = useState<UserData>({ first_name: 'name', last_name: 'name', created: 'date' });
  const [authToken, setAuthToken] = useState(localStorage.getItem('accessToken'));

  const fetchProfilesList = () => {
    try {
      const endpoint = `/patientinfo/?user=${userId}`;
      const requestOptions = {
        headers: { 'Authorization': `Bearer ${authToken}` }
      };
      fetch(`${API_URL}${endpoint}`, requestOptions).then(response => response.json()).then(response => { setProfiles(response) });
      console.log(profiles)
    } catch (error) {
      console.error('Error fetching profiles:', error.message);
    }
  };

  const fetchUserData = () => {
    try {
      const endpoint = `/userdata/${userId}/`;
      const requestOptions = {
        headers: { 'Authorization': `Bearer ${authToken}` }
      };
      fetch(`${API_URL}${endpoint}`, requestOptions).then(response => response.json()).then(response => { setUserData(response) });
      console.log(userData)
    } catch (error) {
      console.error('Error fetching account info:', error.message);
    }
  }

  useEffect(() => {
    setAuthToken(localStorage.getItem('accessToken'));
  }, [localStorage.getItem('accessToken')]);

  useEffect(() => {
    fetchProfilesList();
    fetchUserData();
  }, []);

  return (

    <AccountProfilePageContainer>
      <UserDataContainer>
        <UserDataCard firstName={`${userData.first_name}`} lastName={`${userData.last_name}`} createdDate={`${userData.created}`} />
      </UserDataContainer>
      <ProfileListContainer>
        <Header>Profiles</Header>
        {profiles.map((profile, index) => (
          <UserProfileCard key={index} name={`${profile.title}`} condition={`${profile.condition}`} />
        ))}
        <Link to='/createProfile'>
          <SizedButton>Add Profile</SizedButton>
        </Link>
      </ProfileListContainer>
    </AccountProfilePageContainer>
  );
};

export default ListProfiles;