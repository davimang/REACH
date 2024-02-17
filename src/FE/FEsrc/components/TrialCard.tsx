import styled from '@emotion/styled';
import { TrialInfo } from './types';

const TrialContainer = styled.div`
    width: 570px;
    background-color: #38569A;
    border-radius: 20px;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
`;

const TrialTitle = styled.b`
    color: white;
    font-size: 20px;
    font-family: math;
    max-width: 450px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: block;
    cursor: pointer;
`;

const TrialDescription = styled.div`
    width: 450px;
`;

const RecruitingSpan = styled.span<{ recruiting: boolean }>`
    height: 10px;
    width: 10px;
    display: inline-block;
    background-color: ${props => props.recruiting ? '#039D5F' : 'white'};
    border-radius: 50%;
    margin-right: 5px;
`;

const TrialSymbols = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
`;

const TrialLocation = styled.div`
    display: flex;
`;

const LocationText = styled.div`
    align-content: center;
    display: grid
`;

const BookmarkImage = styled.img`
    cursor: pointer;
    height: 45px;
    width: 45px;
`;

const LocationImage = styled.img`
    cursor: pointer;
    height: 40px; 
    width: 40px;
`;

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
                    <RecruitingSpan recruiting={trial.OverallStatus == "Recruiting"} />
                    {trial.OverallStatus}
                </div>
            </TrialDescription>

            <TrialSymbols>
                <BookmarkImage
                    src={trialSaved[trial.NCTId] ? require("../images/Saved.svg") : require("../images/Bookmark.svg")}
                    onClick={() => handleSave(trial)}
                />

                <TrialLocation>
                    <LocationImage src={require("../images/Location.svg")} />
                    <LocationText>
                        <b style={{ color: "white" }}>{trial.Distance} km</b>
                        <div style={{ fontSize: 14, color: '#BDBDBD' }}>from you</div>
                    </LocationText>
                </TrialLocation>
            </TrialSymbols>
        </TrialContainer>
    );
};

export default TrialCard;