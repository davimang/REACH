import React from "react";

interface UserProfileCardProps{
    name: string;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({name}) => {
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