import React from 'react';
import styled from '@emotion/styled';

const AboutUsContainer = styled.div`
    display: inline-flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
`;

const AboutUsText = styled.div`
    padding: 25px;
    width: 45vw;
    color: #FFFFFF;
    font-size: 20px;
    font-family: math;
`;

const AboutUsPage = () => {

    return (
        <AboutUsContainer>
            <AboutUsText>
                <h1>Motivation behind REACH</h1>
                <p>At their best, clinical trials and other forms of research provide 
                    an opportunity for patients to access treatments or tests that are not 
                    available, which can lead to improved health for patients. Unfortunately, 
                    getting patients into studies even if they are motivated is limited by 
                    difficulties in accessing information about studies and suboptimal 
                    connectivity between research teams, healthcare providers, and patients. 
                </p>
                <p>REACH was developed by a team of final year Software Engineering students as part 
                    of an 8-month long course, who were supervised by two Respirologists - Drs. Terence 
                    Ho and Ciaran Scallan from McMaster University. It was created to make it easier for 
                    clinicians and patients to “match” a patient to a study, using a database of active 
                    research studies. In its current form, REACH is only able to do this in the realm of 
                    Respiratory Medicine, including asthma, chronic obstructive pulmonary disease (COPD), 
                    interstitial lung disease (ILD), pulmonary hypertension, chronic cough, and sleep-disordered 
                    breathing (e.g. obstructive sleep apnea). 
                </p>
            </AboutUsText>
        </AboutUsContainer>
    );
}

export default AboutUsPage;
