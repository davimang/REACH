import React from 'react';
import { Link } from 'react-router-dom';
import { UserData } from './types';

interface UserDataCardProps {
  userData: UserData;
}


const UserDataCard: React.FC<UserDataCardProps> = ({ userData }) => {
  return (
    <div className='cards' style={cardStyle} >
      <div className='name-circle' style={circleStyle} >
        <span> Account Info </span>
      </div>
      <div className='card-content' style={contentStyle}>
        <div className='profile-name' style={nameStyle}>
          First Name: {userData.first_name}
        </div>
        <div className='profile-name' style={nameStyle}>
          Last Name: {userData.last_name}
        </div>
        <div className='profile-name' style={nameStyle}>
          Account Created: {userData.created}
        </div>
        <Link to='/editAccount' state={{
          defaultFirstName: userData.first_name, 
          defaultLastName: userData.last_name,
          isClinician: userData.is_clinician
         }
        }>
          <div className='saved-trails-link'>
            Edit Account Info
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserDataCard;


const cardStyle: React.CSSProperties = {
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
  width: '360px',
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
  fontSize: '36px',
  height: '90px',
};

const contentStyle: React.CSSProperties = {
  flex: 1,
  padding: '20px',
  textAlign: 'left',
  overflow: 'hidden',
};

const nameStyle: React.CSSProperties = {
  fontSize: '18px',
  height: '40px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  color: 'black'
};