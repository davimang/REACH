import { TrialContainer, TrialDescription, TrialTitle, TrialSymbols, BookmarkImage, TrialLocation, LocationImage, LocationText, RecruitingSpan } from './TrialCardStyle';
import { SavedTrial } from './types';

interface SavedTrialProps {
    trial: SavedTrial;
    setCurrentDescription: (description: string) => void;
    handleDelete: (trial: SavedTrial) => void;
    setCurrentLocation: (location: Object) => void;
}

const SavedTrialCard: React.FC<SavedTrialProps> = ({ trial, setCurrentDescription, handleDelete, setCurrentLocation }) => {
    return (
        <TrialContainer key={trial.id}>
            <TrialDescription>
                <TrialTitle
                    onClick={() => {
                        setCurrentDescription(trial.description);
                        setCurrentLocation({latitude: trial.location["latitude"], longitude: trial.location["longitude"]});
                    }
                }
                >
                    {trial.title}
                </TrialTitle>
                <p><u><a href={trial.url} target='__blank' style={{ color: 'white', fontFamily: 'math' }}>
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