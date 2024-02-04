import React from "react";

interface UserProfileCardProps{
    name: string;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({name}) => {
    return (
        <div className="cards">
            <div className="namecircle">
                <span>{name.charAt(0)} {name.split(" ").pop().charAt(0)}</span>
            </div>
            <div className="card-content">    
                <h1>{name}</h1>
            </div>
        </div>
    );
}





export default UserProfileCard;