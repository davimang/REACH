import React from 'react';
import { Link } from 'react-router-dom';

interface UserProfileCardProps {
  name: string;
  condition: string;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ name, condition }) => {
  return (
    <div className='cards' style={cardStyle} >
      <div className='name-circle' style={circleStyle} >
        <span> {name} </span>
      </div>
      <div className='card-content' style={contentStyle}>
        <div className='profile-name' style={nameStyle}>
          Condition: {condition}
        </div>
        <Link to='/savedTrials'>
          <div className='saved-trails-link'>
            Edit Profile
          </div>
        </Link>
      </div>
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