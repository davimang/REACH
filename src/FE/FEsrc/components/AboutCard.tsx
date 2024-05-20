import React from 'react';
import styled from '@emotion/styled';

const AboutCardBox = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    width: 300px;
    margin: 10px;
    text-align: center;
    font-family: math;
    border-radius: 15px;
    overflow: hidden;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 0.9);
`;

const ContactUsText = styled.div`
    color: black;
    font-size: 20px;
    font-family: math;
`;

const CardTitle = styled.div`
    background-color: #039D5F;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    font-size: 25px;
    min-height: 36px;
`;

interface AboutCardProps {
    name: string;
    email: string;
}

const AboutCard: React.FC<AboutCardProps> = ({ name, email }) => {
    return (
        <AboutCardBox>
            <CardTitle>
                <span> {name} </span>
            </CardTitle>
            <ContactUsText>
                <p>Email: {email}</p>
            </ContactUsText>
        </AboutCardBox>
    );
};

export default AboutCard;