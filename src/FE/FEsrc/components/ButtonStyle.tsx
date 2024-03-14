import styled from '@emotion/styled';

export const StyledButton = styled.button`
    padding: 0 15px;
    background-color: #039D5F;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    color: #FFFFFF;
    font-size: 22px;
    font-family: math;
`;

export const StyledButtonDisabled = styled(StyledButton)`
    background-color: #A5A5A5;
    cursor: default;
`;