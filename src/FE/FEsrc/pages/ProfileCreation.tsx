import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { API_URL } from '..';
import { conditions } from '../components/Constants';
import { FormContainer, Form, FormLabel, TextInput, AutocompleteInput, ButtonContainer, FormButton, DropDownInput, AutocompleteTextField, FormButtonDisabled, ErrorMessage } from '../components/FormStyles';
import { fieldValidation } from '../hooks/Validation';

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
    });

    const [formValues, setFormValues] = useState({
        user: userId,
        condition: '',
        advancedInfo: advancedInfoAsthma
    });

    const checkEmpty = (value) => {
        return value.trim() !== '';
    };

    const validateAddress = (value) => {
        return value.split(',').length === 4;
    };

    const nameField = fieldValidation(checkEmpty);
    const addressField = fieldValidation(validateAddress);
    const dateOfBirthField = fieldValidation(checkEmpty);
    const genderField = fieldValidation(checkEmpty);

    const addressErrorMessage = 'Invalid address, please enter a valid address in the format: street, city, province, postal code';
    const genericErrorMessage = 'This field cannot be empty';

    const enableSubmit = nameField.valid && addressField.valid && dateOfBirthField.valid && genderField.valid;

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
    };

    const formatAddress = (address) => {
        const splitAddress = address.split(',');
        return {
            street: splitAddress[0],
            city: splitAddress[1],
            province: splitAddress[2],
            postalCode: splitAddress[3]
        }
    };

    const createRequestOptions = () => {
        const formattedAddress = formatAddress(addressField.value);
        const mappedGender = genderMapping[genderField.value];
        return {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                date_of_birth: dateOfBirthField.value,
                user: formValues.user,
                gender: mappedGender,
                title: nameField.value,
                condition: formValues.condition,
                address: formattedAddress,
                advanced_info: advancedInfoAsthma
            })
        };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const requestOptions = createRequestOptions();

        try {
            const response = await fetch(`${API_URL}/patientinfo/`, requestOptions);
            const data = await response.json();

            if (response.ok) {
                navigate('/');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

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
                            value={nameField.value}
                            onChange={nameField.handleChange}
                            onBlur={nameField.handleBlur}
                        />
                        {nameField.showErrorMessage && <ErrorMessage>{genericErrorMessage}</ErrorMessage>}

                        <FormLabel>Address</FormLabel>
                        <TextInput
                            type='text'
                            id='address'
                            value={addressField.value}
                            onChange={addressField.handleChange}
                            onBlur={addressField.handleBlur}
                        />
                        {addressField.showErrorMessage && <ErrorMessage>{addressErrorMessage}</ErrorMessage>}

                        <FormLabel>Date of Birth</FormLabel>
                        <TextInput
                            type='date'
                            id='date of birth'
                            value={dateOfBirthField.value}
                            onChange={dateOfBirthField.handleChange}
                            onBlur={dateOfBirthField.handleBlur}
                        />
                        {dateOfBirthField.showErrorMessage && <ErrorMessage>{genericErrorMessage}</ErrorMessage>}

                        <FormLabel>Gender</FormLabel>
                        <DropDownInput
                            value={genderField.value}
                            onChange={genderField.handleChange}
                        >
                            <option value='' disabled>-- Select Gender --</option>
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                            <option value='Other'>Other</option>
                        </DropDownInput>
                        {genderField.showErrorMessage && <ErrorMessage>{genericErrorMessage}</ErrorMessage>}

                        <FormLabel>Condition</FormLabel>
                        <AutocompleteInput
                            disablePortal
                            onInputChange={(event, value, reason) => {
                                setFormValues({ ...formValues, condition: value })
                            }}
                            freeSolo={true}
                            options={conditions}
                            renderInput={(params) => <AutocompleteTextField {...params} label='-- Select Condition --' value={formValues.condition}
                                onChange={(e) => {
                                    const newCondition = e.target.value;
                                    setFormValues({ ...formValues, condition: newCondition });
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
                            {enableSubmit ?
                                <FormButton type='submit'>Save</FormButton>
                                :
                                <FormButtonDisabled disabled>Save</FormButtonDisabled>
                            }
                        </ButtonContainer>
                    </Form>
                </FormContainer>
            </ProfileCreationContainer>
        </>
    );
}

export default ProfileCreationPage;
