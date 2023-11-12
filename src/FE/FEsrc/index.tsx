import React from "react";
import ReactDOM from "react-dom";
import App from './components/App';

ReactDOM.render(<App message="REACH by reach" />, document.getElementById('root'));

interface ClinicalTrial {
  Rank: number;
  Condition: string;
  BriefTitle: string;
  DetailedDescription: string;
  MinimumAge: number;
  MaximumAge: number;
  LocationCountry: string;
  LocationState: string;
  LocationCity: string;
  LocationZip: string;
  LocationFacility: string;
  FullAddress: string;
  Distance: number;
}

interface ClinicalTrialsData {
  [key: string]: ClinicalTrial;
}

async function fetchData(endpoint: string) {
    try {
      const response = await fetch(`http://127.0.0.1:8000${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
  
      const data = await response.json();
    
      const clinicalTrials: ClinicalTrialsData = JSON.parse(data);
      const container = document.getElementById('result-container');

      for (const key in clinicalTrials) {
        if (clinicalTrials.hasOwnProperty(key)) {
          const trial: ClinicalTrial = clinicalTrials[key];
          const trialDiv = document.createElement('div');
          trialDiv.innerHTML = `
            <h2>${trial.BriefTitle}</h2>
            <p>Condition: ${trial.Condition}</p>
            <p>Age Range: ${trial.MinimumAge} - ${trial.MaximumAge}</p>
            <p>Full Address: ${trial.FullAddress}</p>
            <hr>
          `;
          if (container){
            container.appendChild(trialDiv);
          }  
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  const endpoint = '/trials/?address=463+rue+levy&age=19&condition=leukemia';
  fetchData(endpoint);
