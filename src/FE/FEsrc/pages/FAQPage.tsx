import React from 'react';
import styled from '@emotion/styled';

const FAQPageContainer = styled.div`
    display: inline-flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
`;

const FAQPageText = styled.div`
    padding: 25px;
    line-height: 1.8;
    width: 90vw;
    color: #FFFFFF;
    font-size: 25px;
    font-family: math;
`;

const FAQPage = () => {

    return (
        <FAQPageContainer>
            <FAQPageText>
                <p><b>What is this site for?</b> <br></br> This site will allow you or your patient to find applicable medical trials.</p>
                <p><b>How can I sign up for a trial?</b> <br></br> Your search results will include a link to the trial itself, which contains the contact information of the trial organizer.</p>
                <p><b>Who is organizing these trials?</b> <br></br> These trials are organized by medical professionals both inside and outside of Canada. The trials
                    are compiled by the National Institute of Health, an American governmental agency.</p>
                <p><b>How is my data being used?</b> <br></br> Your data is only being used to match you with suitable trials. Your data is not sent to the trial organizers, or any
                    other third-parties.</p>
                <p><b>I'm a clinician. Can I search for trials on my patient's behalf?</b> <br></br> Yes. If you are a clinician, you have the ability to save multiple patients and search on their behalf.</p>
            </FAQPageText>
        </FAQPageContainer>
    );
}

export default FAQPage;