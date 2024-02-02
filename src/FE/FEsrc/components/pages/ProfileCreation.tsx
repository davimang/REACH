import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

const ProfileCreationContainer = styled.div`
    min-width: fit-content;
    padding: 15px;
`;

const Input = styled.input`
  padding: 5px;
  margin: 5px;
  color: black;
  width: 435px;
  height: 44px;
  border: none;
  border-radius: 1px;
`;

const StyledDropDown = styled.select`
    padding: 5px;
    margin: 5px;
    color: black;
    width: 435px;
    height: 44px;
    border: none;
    border-radius: 1px;
`;

const StyledLabel = styled.label`
    color: #EDF2F7;
    font-weight: bold;
    margin: 5px;
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

const ProfileCreationPage = () => {

    const [advancedInfoAsthma, setAdvancedInfoAsthma] = useState({
        numExacerbations: 0,
        numFlares: 0,
        usesInhaler: false,
        usesInjection: false,
        isSmoker: false,
        asthmaSeverity: "",
        isEosinophilic: false,
    })
    const [formValues, setFormValues] = useState({ 
            name: "", 
            address: "", 
            dateOfBirth: "", 
            gender: "", 
            userData: 1, 
            condition: "", 
            advancedInfo: advancedInfoAsthma
        }
    );
    const [isHidden, setIsHidden] = useState({asthma: true, COPD: true});

    const handleAdvancedInfo = () => {

        if(formValues.condition == "Asthma"){
            setIsHidden( {COPD:true, asthma: false} );
        }
        else if(formValues.condition == "COPD"){
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

    useEffect(() => {
        handleAdvancedInfo();
    }, [formValues.condition]);

    return (
        <>
            <ProfileCreationContainer>
                <form onSubmit={handleSubmit} style={{display: 'grid', justifyContent: 'center'}}>
                    <StyledLabel>Name</StyledLabel>
                    <Input
                        type='text' 
                        id='name' 
                        value={formValues.name} 
                        onChange={(e) => {
                            setFormValues({ ...formValues, name: e.target.value });
                        }}
                    />
                    <StyledLabel>Address</StyledLabel>
                    <Input
                        type="text" 
                        id='address' 
                        value={formValues.address} 
                        onChange={(e) => setFormValues({ ...formValues, address: e.target.value })}
                    />
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
                        <option value="" disabled>-- Select Gender --</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </StyledDropDown>
                    <StyledLabel>Condition</StyledLabel>
                    <StyledDropDown
                        value={formValues.condition}
                        onChange={(e) => {
                                console.log(e.target.value);
                                const newCondition = e.target.value;
                                console.log("new condition: ", newCondition);
                                setFormValues({ ...formValues, condition: newCondition});
                                console.log(formValues);
                                handleAdvancedInfo();
                                console.log(e.target.value);
                            }
                        }
                    >
                        <option value="" disabled>-- Select Condition --</option>
                        <option value="Asthma">Asthma</option>
                        <option value="COPD">COPD</option>
                        <option value="Other">Other</option>
                    </StyledDropDown>
                    
                    {!isHidden.asthma && (
                    <>
                        <StyledLabel>Number of Exacerbations</StyledLabel>
                        <Input
                            type={"number"} 
                            value={advancedInfoAsthma.numExacerbations} 
                            onChange={(e) => {
                                    setAdvancedInfoAsthma({ ...advancedInfoAsthma, numExacerbations: e.target.valueAsNumber })
                                }
                            }
                        />
                        <StyledLabel>Number of Flares</StyledLabel>
                        <Input
                            type={"number"} 
                            value={advancedInfoAsthma.numFlares} 
                            onChange={(e) => {
                                    setAdvancedInfoAsthma({ ...advancedInfoAsthma, numFlares: e.target.valueAsNumber })
                                }
                            }
                        />
                        <StyledLabel>Uses Inhaler</StyledLabel>
                        <Input
                            style={{width: 30, height: 30}}
                            type={"checkbox"} 
                            onChange={(e) => {
                                    setAdvancedInfoAsthma({ ...advancedInfoAsthma, usesInhaler: e.target.checked })
                                }
                            }
                        />
                        <StyledLabel>Uses Injection</StyledLabel>
                        <Input
                            style={{width: 30, height: 30}}
                            type={"checkbox"} 
                            onChange={(e) => {
                                    setAdvancedInfoAsthma({ ...advancedInfoAsthma, usesInjection: e.target.checked })
                                }
                            }
                        />
                        <StyledLabel>Smoker</StyledLabel>
                        <Input
                            style={{width: 30, height: 30}}
                            type={"checkbox"} 
                            onChange={(e) => {
                                    setAdvancedInfoAsthma({ ...advancedInfoAsthma, isSmoker: e.target.checked })
                                }
                            }
                        />
                        <StyledLabel>Asthma Severity</StyledLabel>
                        <StyledDropDown
                            value={advancedInfoAsthma.asthmaSeverity} 
                            onChange={(e) => {
                                    setAdvancedInfoAsthma({ ...advancedInfoAsthma, asthmaSeverity: e.target.value })
                                }
                            }
                        >
                            <option value="" disabled>-- Select Asthma Severity --</option>
                            <option value="Mild">Mild</option>
                            <option value="Moderate">Moderate</option>
                            <option value="Severe">Severe</option>
                        </StyledDropDown>
                        <StyledLabel>Eosinophilic</StyledLabel>
                        <Input
                            style={{width: 30, height: 30}}
                            type={"checkbox"} 
                            onChange={(e) => {
                                    setAdvancedInfoAsthma({ ...advancedInfoAsthma, isEosinophilic: e.target.checked})
                                }
                            }
                        />
                    </>
                    )}
                    <div style={{borderRadius: 10, width: 125, padding: '10px 5px'}}>
                        <StyledButton type='submit'>Save</StyledButton>
                    </div>
                </form>
            </ProfileCreationContainer>
        </>
    );
}

export default ProfileCreationPage;
