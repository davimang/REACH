import React from 'react';
import styled from '@emotion/styled';

const ContactUsContainer = styled.div`
    display: grid;
    justify-content: center;
    padding: 25px;
`;

const ContactUsText = styled.div`
    color: #FFFFFF;
    font-size: 20px;
    font-family: math;
`;


const ContactUsPage = () => {
    
    return (
        <ContactUsContainer>
            <ContactUsText>
                <h1>Aamina Hussain</h1>
                <p>Email: hussaa54@mcmaster.ca</p>
                <p>Linkedin: link to linkedin</p>
                <p>Phone: 905-523-9145</p>
            </ContactUsText>
            <ContactUsText>
                <h1>Alan Scott</h1>
                <p>Email: scotta30@mcmaster.ca</p>
                <p>Linkedin: link to linkedin</p>
                <p>Phone: 905-489-8472</p>
            </ContactUsText>
            <ContactUsText>
                <h1>Anika Peer</h1>
                <p>Email: peera1@mcmaster.ca</p>
                <p>Linkedin: link to linkedin</p>
                <p>Phone: 416-689-2923</p>
            </ContactUsText>
            <ContactUsText>
                <h1>David Moroniti</h1>
                <p>Email: moronitd@mcmaster.ca</p>
                <p>Linkedin: link to linkedin</p>
                <p>Phone: 905-843-1763</p>
            </ContactUsText>
            <ContactUsText>
                <h1>Deep Raj</h1>
                <p>Email: rajd@mcmaster.ca</p>
                <p>Linkedin: link to linkedin</p>
                <p>Phone: 647-926-7093</p>
            </ContactUsText>
        </ContactUsContainer>
    );
}

export default ContactUsPage;
