import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '..';
import UserProfileCard from '../components/UserProfileCard';
import styled from '@emotion/styled';
import { StyledButton } from '../components/ButtonStyle';

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
    width: 80%; /* Adjust the width as needed */
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
    gap: 20px; 
    margin-bottom: 20px; 
`;

const AddProfileButtonContainer = styled.div`
    margin-top: 20px; /* Add margin top to create space between header and button */
`;

const SizedButton = styled(StyledButton)`
    height: 60px; 
    width: 200px; 
`;

interface PatientProfile {
    title: string;
    condition: string;
}

const ListProfiles: React.FC = () => {
    const userId = localStorage.getItem('userId') ? localStorage.getItem('userId') : '1';
    const [profiles, setProfiles] = useState<PatientProfile[]>([]);

    useEffect(() => {
        const fetchProfilesList = async () => {
            try {
                const endpoint = `/patientinfo/?user=${userId}`;
                const response = await fetch(`${API_URL}${endpoint}`);
                const data = await response.json();
                setProfiles(data);
            } catch (error) {
                console.error('Error fetching profiles:', error.message);
            }
        };

        fetchProfilesList();
    }, [userId]);

    return (
        <AccountProfilePageContainer>
            <Header>Profiles</Header>
            <ProfileListContainer>
                {profiles.map((profile, index) => (
                    <UserProfileCard key={index} name={profile.title} condition={profile.condition} />
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
