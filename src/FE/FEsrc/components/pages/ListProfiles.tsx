import React, { useState, useEffect} from 'react';
import {UserProfileCard} from './UserProfileCard';

interface PatientProfile {
    user_data: {
      first_name: string;
      last_name: string;
    };
}

const ListProfiles: React.FC = () => {
    const [profiles, setProfiles] = useState<PatientProfile[]>([]);

    useEffect(() => {
        fetch('http://localhost:8000/patientinfo/?user=1')
        .then(response => response.json())
        .then(data => setProfiles(data)).catch(error => (console.error('Error fetching data:', error)));
    }, []);

    return (
        <div>
            <h1>Profiles</h1>
            <div>
                {profiles.map((profile, index) => (
                    <UserProfileCard 
                        key={index} 
                        name={profile.user_data.first_name} />
                ))}
            </div>
        </div>
    );
}

export default ListProfiles;