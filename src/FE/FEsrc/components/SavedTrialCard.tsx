import { TrialContainer, TrialDescription, TrialTitle, TrialSymbols, BookmarkImage } from './TrialCardStyle';
import { SavedTrial } from "./types";

interface SavedTrialProps {
    trial: SavedTrial;
    setCurrentDescription: (description: string) => void;
    handleDelete: (trial: SavedTrial) => void;
}

const SavedTrialCard: React.FC<SavedTrialProps> = ({ trial, setCurrentDescription, handleDelete }) => {
    return (
        <TrialContainer key={trial.id}>
            <TrialDescription>
                <TrialTitle
                    onClick={() => setCurrentDescription(trial.description)}
                >
                    {trial.title}
                </TrialTitle>
                <p><u><a href={trial.url} target='__blank' style={{ color: 'white', fontFamily: 'math' }}>
                    Learn More About This Study...
                </a></u></p>
            </TrialDescription>
            <TrialSymbols>
                <BookmarkImage
                    src={require("../images/Saved.svg")}
                    onClick={() => handleDelete(trial)}
                />
            </TrialSymbols>
        </TrialContainer>
    );
};

export default SavedTrialCard;