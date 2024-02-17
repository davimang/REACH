import { TrialContainer, TrialDescription, TrialTitle, TrialSymbols, BookmarkImage, RecruitingSpan, TrialLocation, LocationImage, LocationText } from './TrialCardStyle';
import { TrialInfo } from './types';

interface TrialProps {
    trial: TrialInfo;
    setCurrentDescription: (description: string) => void;
    trialSaved: { [key: string]: boolean };
    handleSave: (trial: TrialInfo) => void;
}

const TrialCard: React.FC<TrialProps> = ({ trial, setCurrentDescription, trialSaved, handleSave }) => {
    return (
        <TrialContainer key={trial.NCTId}>
            <TrialDescription>
                <TrialTitle
                    onClick={() => setCurrentDescription(trial.DetailedDescription)}
                >
                    {trial.BriefTitle}
                </TrialTitle>

                <p><u><a href={trial.url} target='__blank' style={{ color: 'white', fontFamily: 'math' }}>
                    Learn More About This Study...
                </a></u></p>

                <div style={{ color: '#BDBDBD', display: 'flex', alignItems: 'center' }}>
                    <RecruitingSpan recruiting={trial.OverallStatus == 'Recruiting'} />
                    {trial.OverallStatus}
                </div>
            </TrialDescription>

            <TrialSymbols>
                <BookmarkImage
                    src={trialSaved[trial.NCTId] ? require('../images/Saved.svg') : require('../images/Bookmark.svg')}
                    onClick={() => handleSave(trial)}
                />

                <TrialLocation>
                    <LocationImage src={require('../images/Location.svg')} />
                    <LocationText>
                        <b style={{ color: 'white' }}>{trial.Distance} km</b>
                        <div style={{ fontSize: 14, color: '#BDBDBD' }}>from you</div>
                    </LocationText>
                </TrialLocation>
            </TrialSymbols>
        </TrialContainer>
    );
};

export default TrialCard;