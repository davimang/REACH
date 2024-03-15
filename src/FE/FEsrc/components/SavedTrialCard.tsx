import { TrialContainer, TrialDescription, TrialTitle, TrialSymbols, BookmarkImage, TrialLocation, LocationImage, LocationText, RecruitingSpan } from './TrialCardStyle';
import { SavedTrial } from './types';

interface SavedTrialProps {
    trial: SavedTrial;
    handleDelete: (trial: SavedTrial) => void;
    setCurrentLocation: (location: Object) => void;
    setModalDetails: (details: Object) => void;
    handleModal: () => void;
    isSelected: Object;
    setIsSelected: (isSelected: Object) => void;
}

const SavedTrialCard: React.FC<SavedTrialProps> = ({ trial, handleDelete, setCurrentLocation, setModalDetails, handleModal, isSelected, setIsSelected }) => {
    return (
        <TrialContainer key={trial.id} style={{backgroundColor: isSelected[trial.nctid] ? '#021691': '#38569A'}}>
            <TrialDescription>
                <TrialTitle
                    onClick={() => {
                        setCurrentLocation({ latitude: trial.location["latitude"], longitude: trial.location["longitude"] });
                        setIsSelected({[trial.nctid]: true});
                    }
                    }
                >
                    {trial.title}
                </TrialTitle>
                <p><u style={{ color: 'white' }}><a onClick={() => {
                    handleModal();
                    setModalDetails({
                        title: trial.title,
                        description: trial.description,
                        url: trial.url,
                        principalInvestigator: trial.principal_investigator ? trial.principal_investigator : "N/A",
                        contactEmail: trial.contact_email ? trial.contact_email : "N/A"
                    });
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