import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PatientInfo } from './types';
import { Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from '@emotion/styled';
import DeleteProfileModal from './DeleteProfileModal';

interface UserProfileCardProps {
  profile: PatientInfo;
  profileList: PatientInfo[];
  setProfileList: (profileLife: Object) => void;
}

const DeleteIconStyled = styled(DeleteIcon)`
  color: #039D5F;
  font-size: 35px;
  cursor: pointer;
`;

const UserProfileCard: React.FC<UserProfileCardProps> = ({ profile, profileList, setProfileList}) => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='cards' style={cardStyle} >
      <div className='name-circle' style={circleStyle} >
        <span> {profile.title} </span>
      </div>
      <div className='card-content' style={contentStyle}>
        <div className='profile-name' style={nameStyle}>
          Condition: {profile.condition}
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Link to='/editProfile' state={{
            defaultProfileName: profile.title, 
            defaultStreet: profile.address.street,
            defaultCity: profile.address.city,
            defaultPostalCode: profile.address.postalCode,
            defaultProvince: profile.address.province, 
            defaultGender: profile.gender,
            defaultCondition: profile.condition,
            defaultDateOfBirth: profile.date_of_birth, 
            defaultAdvancedInfo: profile.advanced_info,
            profileId: profile.id}
          }
          >
            <div className='saved-trails-link'>
              Edit Profile
            </div>
          </Link>
          <Tooltip title={"Delete Profile"} placement='top' arrow>
            <DeleteIconStyled onClick={() => setIsOpen(true)} />
          </Tooltip> 
        </div>
      </div>

      <DeleteProfileModal
        isOpen={isOpen}
        handleModal={() => setIsOpen(false)}
        profile={profile}
        profileList={profileList}
        setProfileList={setProfileList}
      />
    </div>
  );
};


export default UserProfileCard;


const cardStyle: React.CSSProperties = {
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
  width: '300px',
  margin: '10px',
  textAlign: 'center',
  fontFamily: 'arial',
  borderRadius: '15px',
  overflow: 'hidden',
  flexDirection: 'column',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
};

const circleStyle: React.CSSProperties = {
  backgroundColor: '#039D5F',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 8,
  fontSize: '25px',
  minHeight: 36,
};

const contentStyle: React.CSSProperties = {
  flex: 1,
  padding: '20px',
  textAlign: 'left',
  overflow: 'hidden',
};

const nameStyle: React.CSSProperties = {
  fontSize: '18px',
  paddingBottom: 15,
  color: 'black'
};