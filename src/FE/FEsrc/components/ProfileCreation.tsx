import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Modal } from '@mui/material';

const Header = styled.div`
    padding: 25px;
    background-color: #1D366F;
    height: 100px;
    min-width: fit-content;
`;

const HeaderComponents = styled.div`
    display: inline-flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
`;

const StyledButton = styled.button`
    height: 65px;
    width: inherit;
    border-radius: inherit;
    background-color: #039D5F;
    border: inherit;
    color: #FFFFFF;
    font-size: 22px;
    font-family: math;
    cursor: pointer;
    padding: 0 15px;
`;

const MenuButtons = styled.div`
    display: inline-flex;
`;

const ProfileCreationContainer = styled.div`
    display: inline-flex;
    width: 100%;
    justify-content: space-between;
`;

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: black;
  width: 435px;
  height: 44px;
  border: none;
  border-radius: 1px;
`;

const StyledDropDown = styled.select`
    padding: 0.5em;
    margin: 0.5em;
    color: black;
    width: 435px;
    height: 44px;
    border: none;
    border-radius: 1px;
`;

const StyledLabel = styled.label`
    color: #EDF2F7;
    font-weight: bold;
    width: 130px;
`;


const ProfileCreation = () => {


    const [advancedInfoAsthma, setAdvancedInfoAsthma] = useState({
        numExacerbations: 0,
        numFlares: 0,
        usesInhaler: false,
        usesInjection: false,
        isSmoker: false,
        asthmaSeverity: "Mild",
        isEosinophilic: false,
    })
    const [advancedInfoCOPD, setAdvancedInfoCOPD] = useState({})
    const [formValues, setFormValues] = useState({ 
            name: "", 
            address: "", 
            dateOfBirth: "", 
            gender: "Male", 
            userData: 1, 
            condition: "Asthma", 
            advancedInfo: advancedInfoAsthma
        }
    );
    const [isHidden, setIsHidden] = useState({asthma: true, COPD: true});

    const handleAdvancedInfo = e => {
        e.preventDefault();

        if(formValues.condition === "Asthma"){
            setIsHidden( {COPD:true, asthma: false} );
        }
        else if(formValues.condition === "COPD"){
            setIsHidden( {COPD: false, asthma: true});
        }
        else{
            setIsHidden( {COPD: true, asthma: true});
        }
    }

    const handleSubmit = (e) => {
    
        e.preventDefault();
        const splitAddress = formValues.address.split(",");
        const formattedAddress = {
            number: splitAddress[0],
            street: splitAddress[1],
            city: splitAddress[2],
            province: splitAddress[3],
            postal_code: splitAddress[4] 
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                date_of_birth: formValues.dateOfBirth, 
                user_data: formValues.userData, 
                gender: formValues.gender,
                title: formValues.name,
                condition: formValues.condition,
                address: formattedAddress
            })
        };
        fetch('http://localhost:8000/patientinfo/', requestOptions).then(response => response.json()).then(response => console.log(response));
    }

    return (
        <>
            <Header>
                <HeaderComponents>
                    <img src={require("../images/Logo.svg")} height={100} style={{paddingRight: 20}}/>
                    <MenuButtons>
                        <div style={{borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}><StyledButton>FAQs</StyledButton></div>
                        <div style={{paddingLeft: 2, paddingRight: 2, backgroundColor: '#FFFFFF'}}><StyledButton>Contact Us</StyledButton></div>
                        <div style={{borderTopRightRadius: 10, borderBottomRightRadius: 10}}><StyledButton>About Us</StyledButton></div>
                    </MenuButtons>
                    <div style={{borderRadius: 10, width: 125, paddingLeft: 20}}><StyledButton>Sign In</StyledButton></div>
                </HeaderComponents>
            </Header>
            <ProfileCreationContainer>
                <form onSubmit={handleSubmit}>
                <StyledLabel>Name</StyledLabel>
                <Input 
                    type='text' 
                    id='name' 
                    value={formValues.name} 
                    onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                />
                <StyledLabel>Address</StyledLabel>
                <Input 
                    type="text" 
                    id='address' 
                    value={formValues.address} 
                    onChange={(e) => setFormValues({ ...formValues, address: e.target.value })}
                />
                <StyledLabel>Condition</StyledLabel>
                <StyledDropDown
                    value={formValues.condition}
                    onChange={(e) => {
                            setFormValues({ ...formValues, condition: e.target.value})
                            handleAdvancedInfo(e)
                        }
                    }
                >
                    <option value="Asthma">Asthma</option>
                    <option value="COPD">COPD</option>
                    <option value="Other">Other</option>
                </StyledDropDown>
                <StyledLabel>Date of Birth</StyledLabel>
                <Input 
                    type="date" 
                    id='date of birth' 
                    value={formValues.dateOfBirth} 
                    onChange={(e) => {
                            setFormValues({ ...formValues, dateOfBirth: e.target.value })
                        }
                    }
                />
                <StyledLabel>Gender</StyledLabel>
                <StyledDropDown
                    value={formValues.gender} 
                    onChange={(e) => setFormValues({ ...formValues, gender: e.target.value })}
                >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </StyledDropDown>
                <StyledLabel>Number of Exacerbations</StyledLabel>
                <Input 
                    type={isHidden.asthma ? "hidden" : "number"} 
                    value={advancedInfoAsthma.numExacerbations} 
                    onChange={(e) => {
                            setAdvancedInfoAsthma({ ...advancedInfoAsthma, numExacerbations: e.target.valueAsNumber })
                        }
                    }
                />
                <StyledLabel>Number of Flares</StyledLabel>
                <Input 
                    type={isHidden.asthma ? "hidden" : "number"} 
                    value={advancedInfoAsthma.numExacerbations} 
                    onChange={(e) => {
                            setAdvancedInfoAsthma({ ...advancedInfoAsthma, numFlares: e.target.valueAsNumber })
                        }
                    }
                />
                <StyledLabel>Uses Inhaler</StyledLabel>
                <Input 
                    type={isHidden.asthma ? "hidden" : "checkbox"} 
                    onChange={(e) => {
                            setAdvancedInfoAsthma({ ...advancedInfoAsthma, usesInhaler: e.target.checked })
                        }
                    }
                />
                <StyledLabel>Uses Injection</StyledLabel>
                <Input 
                    type={isHidden.asthma ? "hidden" : "checkbox"} 
                    onChange={(e) => {
                            setAdvancedInfoAsthma({ ...advancedInfoAsthma, usesInjection: e.target.checked })
                        }
                    }
                />
                <StyledLabel>Smoker</StyledLabel>
                <Input 
                    type={isHidden.asthma ? "hidden" : "checkbox"} 
                    onChange={(e) => {
                            setAdvancedInfoAsthma({ ...advancedInfoAsthma, isSmoker: e.target.checked })
                        }
                    }
                />
                <StyledLabel>Asthma severity</StyledLabel>
                <StyledDropDown
                    value={advancedInfoAsthma.asthmaSeverity} 
                    onChange={(e) => {
                            setAdvancedInfoAsthma({ ...advancedInfoAsthma, asthmaSeverity: e.target.value })
                        }
                    }
                >
                    <option value="Mild">Mild</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Severe">Severe</option>
                </StyledDropDown>
                <StyledLabel>Eosinophilic</StyledLabel>
                <Input 
                    type={isHidden.asthma ? "hidden" : "checkbox"} 
                    onChange={(e) => {
                            setAdvancedInfoAsthma({ ...advancedInfoAsthma, isEosinophilic: e.target.checked})
                        }
                    }
                />
                <div style={{borderRadius: 10, width: 125, paddingLeft: 20}}>
                    <StyledButton type='submit'>Save</StyledButton>
                </div>
                </form>
            </ProfileCreationContainer>
        </>
    );
}

export default ProfileCreation;
