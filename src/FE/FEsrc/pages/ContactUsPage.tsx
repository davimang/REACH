import React from 'react';
import styled from '@emotion/styled';
import AboutCard from '../components/AboutCard';

const ContactUsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr); 
    justify-content: center;
    @media (max-width: 1536px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
    }
`;

const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; 
`;

const ContactUsPage = () => {

    return (
        <FlexContainer>
            <ContactUsContainer>
                <AboutCard name="Aamina Hussain" email="hussaa54@mcmaster.ca" />
                <AboutCard name="Alan Scott" email="scotta30@mcmaster.ca" />
                <AboutCard name="Anika Peer" email="peera1@mcmaster.ca" />
                <AboutCard name="David Moroniti" email="moronitd@mcmaster.ca" />
                <AboutCard name="Deep Raj" email="rajd@mcmaster.ca" />
                <AboutCard name="Dr. Terence Ho" email="hot4@mcmaster.ca" />
                <AboutCard name="Dr. Ciaran Scallan" email="scallc@mcmaster.ca" />
            </ContactUsContainer>
        </FlexContainer>
    );
}

export default ContactUsPage;
