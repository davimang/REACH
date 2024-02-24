import { TrialContainer, TrialDescription, TrialTitle, TrialSymbols, BookmarkImage, TrialLocation, LocationImage, LocationText, RecruitingSpan } from './TrialCardStyle';
import { SavedTrial } from './types';

interface SavedTrialProps {
    trial: SavedTrial;
    handleDelete: (trial: SavedTrial) => void;
    setCurrentLocation: (location: Object) => void;
    setModalDetails: (details: Object) => void;
    handleModal: () => void;
}

const SavedTrialCard: React.FC<SavedTrialProps> = ({ trial, handleDelete, setCurrentLocation, setModalDetails, handleModal }) => {
    return (
        <TrialContainer key={trial.id}>
            <TrialDescription>
                <TrialTitle
                    onClick={() => {
                        setCurrentLocation({latitude: trial.location["latitude"], longitude: trial.location["longitude"]});
                    }
                }
                >
                    {trial.title}
                </TrialTitle>
                <p><u style={{color: 'white'}}><a onClick={()=>{
                    handleModal(); 
                    setModalDetails({title: trial.title, description: trial.description, url: trial.url, principalInvestigator: trial.principal_investigator, contactEmail: trial.contact_email});
                    }
                } style={{ color: 'white', fontFamily: 'math', cursor: 'pointer' }}>
                    Learn More About This Study...
                </a></u></p>
                <div style={{ color: '#BDBDBD', display: 'flex', alignItems: 'center' }}>
                    <RecruitingSpan recruiting={trial.status == 'Recruiting'} />
                    {trial.status}
                </div>
            </TrialDescription>
            <TrialSymbols>
                <BookmarkImage
                    src={require('../images/Saved.svg')}
                    onClick={() => handleDelete(trial)}
                />
                <TrialLocation>
                    <LocationImage src={require('../images/Location.svg')} />
                    <LocationText>
                        <b style={{ color: 'white' }}>{trial.distance} km</b>
                        <div style={{ fontSize: 14, color: '#BDBDBD' }}>from you</div>
                    </LocationText>
                </TrialLocation>
            </TrialSymbols>
        </TrialContainer>
    );
};

export default SavedTrialCard;