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
    width: 50vw;
    color: #FFFFFF;
    font-size: 25px;
    font-family: math;
    
    @media (max-width: 1536px) {
        font-size: 20px;
        width: 90vw;
    }
`;

const FAQPage = () => {

    return (
        <FAQPageContainer>
            <FAQPageText>
                <p><b>What is this site for?</b> <br></br> This site helps to "match" a patient to clinical trials or other research studies.</p>

                <p><b>Why did we create this website?</b> <br></br> Though there is often local cutting edge research being done and patients who are eager to participate, finding the right study can be hard for patients and their doctors. The purpose of this site is to make it easier for both patients and doctors to find a match between patient and study.</p>
                <p><b>Who can use this website?</b> <br></br>The website is designed to be used either by patients or physicians caring for patients.</p>
                <p><b>What is a clinical trial?</b> <br></br>A clinical trial is a type of research study where humans (often patients) are assigned to one or more interventions (e.g. medication, device, placebo) to help doctors understand if it will be useful in treating patients. </p>
                <p><b>What other research studies are available?</b> <br></br> Studies may be observational, meaning that there are no specific interventions (e.g.  medication, device) involved. In these studies, there are often research tests performed. </p>
                <p><b>Who is organizing these trials?</b> <br></br> These trials are organized by medical professionals and researchers both inside and outside of Canada. The trials are compiled by the National Institute of Health, an American governmental agency.</p>
                <p><b>How is my data being used?</b> <br></br>Your data is only being used to match you with suitable trials. Your data is not sent to the trial organizers, or any other third-parties.</p>
                <p><b>I'm a clinician. Can I search for trials on my patient's behalf?</b> <br></br>Yes. If you are a clinician, you have the ability to save multiple patients and search on their behalf. It is recommended to use non-identifying data. It is the user's responsibility to maintain the patient's confidentiality when entering data into the website.</p>
            </FAQPageText>
        </FAQPageContainer>
    );
}

export default FAQPage;