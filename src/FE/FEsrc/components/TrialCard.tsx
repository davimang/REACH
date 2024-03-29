import { TrialContainer, TrialDescription, TrialTitle, TrialSymbols, BookmarkImage, RecruitingSpan, TrialLocation, LocationImage, LocationText } from './TrialCardStyle';
import { TrialInfo } from './types';

interface TrialProps {
    trial: TrialInfo;
    trialSaved: { [key: string]: boolean };
    handleSave: (trial: TrialInfo) => void;
    setCurrentLocation: (location: Object) => void;
    handleModal: () => void;
    setModalDetails: (details: Object) => void;
    trialNumber: number;
    isSelected: Object;
    setIsSelected: (isSelected: Object) => void;
}

const TrialCard: React.FC<TrialProps> = ({ trial, trialSaved, handleSave, setCurrentLocation, handleModal, setModalDetails, trialNumber, isSelected, setIsSelected }) => {
    return (
        <TrialContainer key={trial.NCTId} style={{backgroundColor: isSelected[trial.NCTId] ? '#021691': '#38569A'}}>
            <TrialDescription>
                <TrialTitle
                    onClick={(e) => {
                        e.preventDefault();
                        setCurrentLocation({ latitude: trial.LocationLatitude, longitude: trial.LocationLongitude, address: trial.FullAddress});
                        setIsSelected({[trial.NCTId]: true});
                    }
                    }
                >
                    {trialNumber + '. ' + trial.BriefTitle}
                </TrialTitle>

                <p><u style={{ color: 'white' }}><a onClick={() => {
                    handleModal();
                    setModalDetails({
                        title: trial.BriefTitle,
                        description: trial.DetailedDescription ? trial.DetailedDescription : "N/A",
                        url: trial.url,
                        contactEmail: trial.PointOfContactEMail ? trial.PointOfContactEMail : (trial.CentralContactEMail ? trial.CentralContactEMail : "N/A"),
                        principalInvestigator: trial.OverallOfficialName ? trial.OverallOfficialName : (trial.LocationContactName ? trial.LocationContactName : "N/A")
                    });
                }
                } style={{ color: 'white', fontFamily: 'math', cursor: 'pointer' }}>
                    Learn More About This Study...
                </a></u></p>

                <div style={{ color: '#BDBDBD', display: 'flex', alignItems: 'center' }}>
                    <RecruitingSpan recruiting={true} />
                    {"Recruiting"}
                </div>
            </TrialDescription>

            <TrialSymbols>
                <BookmarkImage
                    src={trial.saved || trialSaved[trial.NCTId] ? require('../images/Saved.svg') : require('../images/Bookmark.svg')}
                    onClick={() => handleSave(trial)}
                />

                <TrialLocation>
                    <LocationImage src={require('../images/Location.svg')} />
                    <LocationText>
                        <b style={{ color: 'white' }}>{trial.Distance} Km</b>
                        <div style={{ fontSize: 14, color: '#BDBDBD' }}>from you</div>
                    </LocationText>
                </TrialLocation>
            </TrialSymbols>
        </TrialContainer>
    );
};

export default TrialCard;