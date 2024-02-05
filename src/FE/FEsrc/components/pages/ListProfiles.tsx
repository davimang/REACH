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
  
    useEffect(() => {
      // Simulating fetching data from the API
      const fakeData: PatientProfile[] = [
        { user_data: { first_name: 'John', last_name: 'Doe' } },
        { user_data: { first_name: 'Jane', last_name: 'Smith' } },
        { user_data: { first_name: 'Bob', last_name: 'Johnson' } },
        // Add more fake profiles as needed
      ];
  
      setProfiles(fakeData);
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