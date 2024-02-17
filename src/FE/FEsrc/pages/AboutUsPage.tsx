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
                <p>Reach was developed by a team of final year Software Engineering students
                    as part of an eight month long capstone course. Additionally, the project was supervised (and proposed) by
                    two respirolagists from Mcmaster, Dr. Terrence Ho & Dr. Ciaran Scallan. It was created
                    with the ultimate goal of providing both clincians & patients easier access to clincial trials from
                    around the world.
                </p>
                <h1>The Engineering Team</h1>
                <p>The team consists of Aamina Hussain, Alan Scott, Anika Peer, David Moroniti, and Deep Raj. If you would
                    like to contact one of the members, please see our "Contact Us" page.
                </p>
            </AboutUsText>
        </AboutUsContainer>
    );
}

export default AboutUsPage;
