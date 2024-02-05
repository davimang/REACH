import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../..';
import UserProfileCard from '../UserProfileCard';
import UserDataCard from '../UserDataCard';
import styled from '@emotion/styled';
import { Button } from '@mui/material';

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

const StyledButton = styled.button`
    height: 65px;
    width: inherit;
    border-radius: 10px;
    background-color: #039D5F;
    border: inherit;
    margin-left: 4em;
    color: #FFFFFF;
    font-size: 22px;
    font-family: math;
    cursor: pointer;
    padding: 0 15px;
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

  const userId = localStorage.getItem("userId") ? localStorage.getItem("userId") : 1;
  const [profiles, setProfiles] = useState<PatientProfile[]>([]);
  const [userData, setUserData] = useState<UserData>({ first_name: "name", last_name: "name", created: "date" });

  const fetchProfilesList = () => {
    try {
      const endpoint = `/patientinfo/?user=${userId}`;
      fetch(`${API_URL}${endpoint}`).then(response => response.json()).then(response => { setProfiles(response) });
      console.log(profiles)
    } catch (error) {
      console.error('Error fetching profiles:', error.message);
    }
  };

  const fetchUserData = () => {
    try {
      const endpoint = `/userdata/${userId}/`;
      fetch(`${API_URL}${endpoint}`).then(response => response.json()).then(response => { setUserData(response) });
      console.log(userData)
    } catch (error) {
      console.error('Error fetching account info:', error.message);
    }
  }

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
          <StyledButton>Add Profile</StyledButton>
        </Link>
      </ProfileListContainer>
    </AccountProfilePageContainer>
  );
};

export default ListProfiles;