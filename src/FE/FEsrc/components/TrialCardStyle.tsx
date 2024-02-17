import styled from '@emotion/styled';

export const TrialContainer = styled.div`
    width: 570px;
    background-color: #38569A;
    border-radius: 20px;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
`;

export const TrialTitle = styled.b`
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

export const TrialDescription = styled.div`
    width: 450px;
`;

export const RecruitingSpan = styled.span<{ recruiting: boolean }>`
    height: 10px;
    width: 10px;
    display: inline-block;
    background-color: ${props => props.recruiting ? '#039D5F' : 'white'};
    border-radius: 50%;
    margin-right: 5px;
`;

export const TrialSymbols = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
`;

export const TrialLocation = styled.div`
    display: flex;
`;

export const LocationText = styled.div`
    align-content: center;
    display: grid
`;

export const BookmarkImage = styled.img`
    cursor: pointer;
    height: 45px;
    width: 45px;
`;

export const LocationImage = styled.img`
    cursor: pointer;
    height: 40px; 
    width: 40px;
`;
