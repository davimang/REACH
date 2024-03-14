import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '..';
import UserProfileCard from '../components/UserProfileCard';
import styled from '@emotion/styled';
import { StyledButton } from '../components/ButtonStyle';
import { PatientInfo } from '../components/types';

const AccountProfilePageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; 
`;

const Header = styled.h1`
    color: white;
    text-align: center; /* Centering the header text */
`;

const ProfileListContainer = styled.div`
    display: grid;
    justify-content: center;
    width: 45%;
`;

const AddProfileButtonContainer = styled.div`
    margin-top: 20px;
`;

const SizedButton = styled(StyledButton)`
    height: 60px; 
    width: 200px; 
`;

const ListProfiles: React.FC = () => {

  const userId = localStorage.getItem('userId');
  const [profiles, setProfiles] = useState<PatientInfo[]>([]);
  const [authToken, setAuthToken] = useState(localStorage.getItem('accessToken'));

  const fetchProfilesList = async () => {
    try {
      const endpoint = `/patientinfo/?user=${userId}`;
      const requestOptions = {
        headers: { 'Authorization': `Bearer ${authToken}` }
      };
      await fetch(`${API_URL}${endpoint}`, requestOptions).then(response => response.json()).then(response => { setProfiles(response) });
      console.log(profiles)
    } catch (error) {
      console.error('Error fetching profiles:', error.message);
    }
  };

  useEffect(() => {
    setAuthToken(localStorage.getItem('accessToken'));
  }, [localStorage.getItem('accessToken')]);

  useEffect(() => {
    fetchProfilesList();
  }, []);

  return (

    <AccountProfilePageContainer>
      <Header>Profiles</Header>
      <ProfileListContainer>
        {profiles.map((profile, index) => (
          <UserProfileCard key={index} profile={profile} />
        ))}
      </ProfileListContainer>
      <AddProfileButtonContainer>
        <Link to='/createProfile'>
          <SizedButton>Add Profile</SizedButton>
        </Link>
      </AddProfileButtonContainer>
    </AccountProfilePageContainer>
  );
};
export default ListProfiles;