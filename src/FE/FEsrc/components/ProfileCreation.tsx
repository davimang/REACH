import React, { useState } from 'react';
import styled from '@emotion/styled';
import { TextField } from '@mui/material';

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

const StyledLabel = styled.label`
    color: #EDF2F7;
    font-weight: bold;
    width: 130px;
    float: left;
`;


const ProfileCreation = () => {


    const [formValues, setFormValues] = useState({ name: "", address: "", dateOfBirth: "", gender: "", userData: 1, condition: ""});

    const handleSubmit = (e) => {
    
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({date_of_birth: formValues.dateOfBirth, user_data: formValues.userData, gender: formValues.gender})
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
                    type="text" 
                    id='name' 
                    value={formValues.name} 
                    onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                />
                <Input 
                    type="text" 
                    id='address' 
                    value={formValues.address} 
                    onChange={(e) => setFormValues({ ...formValues, address: e.target.value })}
                />
                <Input 
                    type="dropdown" 
                    id='condition' 
                    value={formValues.condition} 
                    onChange={(e) => setFormValues({ ...formValues, condition: e.target.value })}
                />
                <Input 
                    type="date" 
                    id='date of birth' 
                    value={formValues.dateOfBirth} 
                    onChange={(e) => setFormValues({ ...formValues, dateOfBirth: e.target.value })}
                />
                <Input 
                    type="text" 
                    id='gender' 
                    value={formValues.gender} 
                    onChange={(e) => setFormValues({ ...formValues, gender: e.target.value })}
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
