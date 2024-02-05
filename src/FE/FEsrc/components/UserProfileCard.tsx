import React from "react";

interface UserProfileCardProps{
    name: string;   
}

const UserProfileCard: React.FC<{ name: string }>= ({name}) => {
    return (
        <div className="cards">
            <div className="name-circle">
                <span>{name.charAt(0)}</span>
            </div>
            <div className="card-content">    
                <h1 className="profile-name" >{name}</h1>
                <a href="saved-trials.html" className="saved-trials-link">See saved trials</a>
            </div>
        </div>
    );
}


export default UserProfileCard;



const cardStyle: React.CSSProperties = {
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    width: '280px',
    margin: '10px',
    textAlign: 'center',
    fontFamily: 'arial',
    borderRadius: '15px',
    overflow: 'hidden',
    flexDirection: 'column',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  };
  
  const circleStyle: React.CSSProperties = {
    backgroundColor: '#4CAF50',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '36px',
    height: '80px',
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
  };