import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../..';
import UserProfileCard from '../UserProfileCard';

interface PatientProfile {
    user_data: {
      first_name: string;
      last_name: string;
    };
}


const ListProfiles: React.FC = () => {
    const [profiles, setProfiles] = useState<PatientProfile[]>([]);
    const fetchProfilesList = async () => {
      try {
          const endpoint = `/patientinfo/?user=1`;  // set it to 1 for now
          const response = await fetch(`${API_URL}${endpoint}`);
          if (!response.ok) {
              throw new Error(`Failed to fetch profiles. Status: ${response.status}`);
          }
          const data = await response.json();
          setProfiles(JSON.parse(data));
      } catch (error) {
          console.error('Error fetching profiles:', error.message);
      }
  };
    useEffect(() => {
      fetchProfilesList();
    }, []);
  
    return (
      <div>
        <h1>Profiles</h1>
        <div>
          {profiles.map((profile, index) => (
            <UserProfileCard key={index} name={`${profile.user_data.first_name} ${profile.user_data.last_name}`} />
          ))}
        </div>
      </div>
    );
  };

// const ListProfiles: React.FC = () => {
//     const [profiles, setProfiles] = useState<PatientProfile[]>([]);

//     useEffect(() => {
//         fetch('http://localhost:8000/patientinfo/?user=1')
//         .then(response => response.json())
//         .then(data => setProfiles(data)).catch(error => (console.error('Error fetching data:', error)));
//     }, []);

//     return (
//         <div>
//             <h1>Profiles</h1>
//             <div>
//                 {profiles.map((profile, index) => (
//                     <UserProfileCard 
//                         key={index} 
//                         name={profile.user_data.first_name} />
//                 ))}
//             </div>
//         </div>
//     );
// }

export default ListProfiles;