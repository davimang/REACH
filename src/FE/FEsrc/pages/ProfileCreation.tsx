import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { API_URL } from '..';
import { conditions } from '../components/Constants';
import { FormContainer, Form, FormLabel, TextInput, AutocompleteInput, ButtonContainer, FormButton, DropDownInput, AutocompleteTextField } from '../components/FormStyles';

const ProfileCreationContainer = styled.div`
    min-width: fit-content;
    padding: 15px;
`;

const ProfileCreationPage = () => {

    const userId = localStorage.getItem('userId');

    const navigate = useNavigate();

    const genderMapping = { 'Male': 'M', 'Female': 'F', 'Other': 'O' };

    const [advancedInfoAsthma, setAdvancedInfoAsthma] = useState({
        numExacerbations: 0,
        numFlares: 0,
        usesInhaler: false,
        usesInjection: false,
        isSmoker: false,
        asthmaSeverity: '',
        isEosinophilic: false,
    })
    const [formValues, setFormValues] = useState({
        name: '',
        address: '',
        dateOfBirth: '',
        gender: '',
        user: userId,
        condition: '',
        advancedInfo: advancedInfoAsthma
    }
    );
    const [isHidden, setIsHidden] = useState({ asthma: true, COPD: true });

    const handleAdvancedInfo = () => {

        if (formValues.condition == 'Asthma') {
            setIsHidden({ COPD: true, asthma: false });
        }
        else if (formValues.condition == 'COPD') {
            setIsHidden({ COPD: false, asthma: true });
        }
        else {
            setIsHidden({ COPD: true, asthma: true });
        }
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        const splitAddress = formValues.address.split(',');
        const formattedAddress = {
            street: splitAddress[0],
            city: splitAddress[1],
            province: splitAddress[2],
            postalCode: splitAddress[3]
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                date_of_birth: formValues.dateOfBirth,
                user: formValues.user,
                gender: genderMapping[formValues.gender],
                title: formValues.name,
                condition: formValues.condition,
                address: formattedAddress,
                advanced_info: advancedInfoAsthma
            })
        };
        try {
            const response = await fetch(`${API_URL}/patientinfo/`, requestOptions);
            const data = await response.json();

            console.log(data);

            if (response.ok) {
                navigate('/');
            }

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    useEffect(() => {
        handleAdvancedInfo();
    }, [formValues.condition]);

    return (
        <>
            <ProfileCreationContainer>
                <FormContainer>
                    <Form onSubmit={handleSubmit}>
                        <FormLabel>Name</FormLabel>
                        <TextInput
                            type='text'
                            id='name'
                            value={formValues.name}
                            onChange={(e) => {
                                setFormValues({ ...formValues, name: e.target.value });
                            }}
                        />

                        <FormLabel>Address</FormLabel>
                        <TextInput
                            type='text'
                            id='address'
                            value={formValues.address}
                            onChange={(e) => setFormValues({ ...formValues, address: e.target.value })}
                        />

                        <FormLabel>Date of Birth</FormLabel>
                        <TextInput
                            type='date'
                            id='date of birth'
                            value={formValues.dateOfBirth}
                            onChange={(e) => {
                                setFormValues({ ...formValues, dateOfBirth: e.target.value })
                            }
                            }
                        />

                        <FormLabel>Gender</FormLabel>
                        <DropDownInput
                            value={formValues.gender}
                            onChange={(e) => setFormValues({ ...formValues, gender: e.target.value })}
                        >
                            <option value='' disabled>-- Select Gender --</option>
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                            <option value='Other'>Other</option>
                        </DropDownInput>

                        <FormLabel>Condition</FormLabel>
                        <AutocompleteInput
                            disablePortal
                            onInputChange={(event, value, reason) => {
                                setFormValues({ ...formValues, condition: value })
                                handleAdvancedInfo()
                            }}
                            freeSolo={true}
                            options={conditions}
                            renderInput={(params) => <AutocompleteTextField {...params} label='-- Select Condition --' value={formValues.condition}
                                onChange={(e) => {
                                    const newCondition = e.target.value;
                                    setFormValues({ ...formValues, condition: newCondition });
                                    handleAdvancedInfo();
                                }} />
                            }
                        />

                        {!isHidden.asthma && (
                            <>
                                <FormLabel>Number of Exacerbations</FormLabel>
                                <TextInput
                                    type={'number'}
                                    value={advancedInfoAsthma.numExacerbations}
                                    onChange={(e) => {
                                        setAdvancedInfoAsthma({ ...advancedInfoAsthma, numExacerbations: e.target.valueAsNumber })
                                    }
                                    }
                                />
                                <FormLabel>Number of Flares</FormLabel>
                                <TextInput
                                    type={'number'}
                                    value={advancedInfoAsthma.numFlares}
                                    onChange={(e) => {
                                        setAdvancedInfoAsthma({ ...advancedInfoAsthma, numFlares: e.target.valueAsNumber })
                                    }
                                    }
                                />
                                <FormLabel>Uses Inhaler</FormLabel>
                                <TextInput
                                    style={{ width: 30, height: 30 }}
                                    type={'checkbox'}
                                    onChange={(e) => {
                                        setAdvancedInfoAsthma({ ...advancedInfoAsthma, usesInhaler: e.target.checked })
                                    }
                                    }
                                />
                                <FormLabel>Uses Injection</FormLabel>
                                <TextInput
                                    style={{ width: 30, height: 30 }}
                                    type={'checkbox'}
                                    onChange={(e) => {
                                        setAdvancedInfoAsthma({ ...advancedInfoAsthma, usesInjection: e.target.checked })
                                    }
                                    }
                                />
                                <FormLabel>Smoker</FormLabel>
                                <TextInput
                                    style={{ width: 30, height: 30 }}
                                    type={'checkbox'}
                                    onChange={(e) => {
                                        setAdvancedInfoAsthma({ ...advancedInfoAsthma, isSmoker: e.target.checked })
                                    }
                                    }
                                />
                                <FormLabel>Asthma Severity</FormLabel>
                                <DropDownInput
                                    value={advancedInfoAsthma.asthmaSeverity}
                                    onChange={(e) => {
                                        setAdvancedInfoAsthma({ ...advancedInfoAsthma, asthmaSeverity: e.target.value })
                                    }
                                    }
                                >
                                    <option value='' disabled>-- Select Asthma Severity --</option>
                                    <option value='Mild'>Mild</option>
                                    <option value='Moderate'>Moderate</option>
                                    <option value='Severe'>Severe</option>
                                </DropDownInput>
                                <FormLabel>Eosinophilic</FormLabel>
                                <TextInput
                                    style={{ width: 30, height: 30 }}
                                    type={'checkbox'}
                                    onChange={(e) => {
                                        setAdvancedInfoAsthma({ ...advancedInfoAsthma, isEosinophilic: e.target.checked })
                                    }
                                    }
                                />
                            </>
                        )}
                        <ButtonContainer>
                            <FormButton type='submit'>Save</FormButton>
                        </ButtonContainer>
                    </Form>
                </FormContainer>
            </ProfileCreationContainer>
        </>
    );
}

export default ProfileCreationPage;
