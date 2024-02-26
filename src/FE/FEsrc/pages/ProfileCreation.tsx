import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { API_URL } from '..';
import { conditions } from '../components/Constants';
import { FormContainer, Form, FormLabel, TextInput, AutocompleteInput, ButtonContainer, FormButton, DropDownInput, AutocompleteTextField, FormButtonDisabled, ErrorMessage } from '../components/FormStyles';
import { checkEmpty, fieldValidation } from '../hooks/Validation';
import { Conditions } from '../constants/ConditionFields';
import AdvancedFormField, { FieldInfo } from '../components/AdvancedFormField';

const ProfileCreationContainer = styled.div`
    min-width: fit-content;
    padding: 15px;
`;

const ProfileCreationPage = () => {

    const userId = localStorage.getItem('userId');

    const navigate = useNavigate();

    const genderMapping = { 'Male': 'M', 'Female': 'F', 'Other': 'O' };

    const [advancedInfo, setAdvancedInfo] = useState({});

    const [formValues, setFormValues] = useState({
        user: userId,
        condition: '',
        advancedInfo: advancedInfo
    });

    const validateAddress = (value) => {
        return value.split(',').length === 4;
    };

    const nameField = fieldValidation(checkEmpty);
    const addressField = fieldValidation(validateAddress);
    const dateOfBirthField = fieldValidation(checkEmpty);
    const genderField = fieldValidation(checkEmpty);

    const [error, setError] = useState(false);

    const errorMessage = 'Profile creation failed. Please try again.';

    const addressErrorMessage = 'Invalid address, please enter a valid address in the format: street, city, province, postal code';
    const genericErrorMessage = 'This field cannot be empty';

    const enableSubmit = nameField.valid && addressField.valid && dateOfBirthField.valid && genderField.valid;

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
                advanced_info: advancedInfo
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
            else {
                setError(true);
            }
        } catch (error) {
            setError(true);
        }
    };

    useEffect(() => {
        const temp = {};
        Conditions[formValues.condition] && Object.values(Conditions[formValues.condition]).map((fieldVariable:{initial: string}, index) => {
            const keys = Object.keys(Conditions[formValues.condition]);
            temp[keys[index]] = fieldVariable.initial;
            return temp;
        })
        setAdvancedInfo({...advancedInfo, ...temp})
    }, [formValues.condition]);

    useEffect(() => {
        if (error) {
            setError(false);
        }
    }, [nameField.value, addressField.value, dateOfBirthField.value, genderField.value, formValues, advancedInfo]);

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

                        <FormLabel>Sex</FormLabel>
                        <DropDownInput
                            value={genderField.value}
                            onChange={genderField.handleChange}
                        >
                            <option value='' disabled>-- Select Sex --</option>
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
                            renderInput={(params) => <AutocompleteTextField {...params} label={formValues.condition ? null : "-- Select Condition --"} value={formValues.condition}
                                onChange={(e) => {
                                    const newCondition = e.target.value;
                                    setFormValues({ ...formValues, condition: newCondition });
                                }} />
                            }
                        />

                        {Conditions[formValues.condition] && (
                        <>
                            {Object.values(Conditions[formValues.condition]).map((field: FieldInfo, index) => {
                                const keys = Object.keys(Conditions[formValues.condition]);
                                return (
                                    <AdvancedFormField
                                        key={index}
                                        fieldInfo={field}
                                        fieldVariable={keys[index]}
                                        value={advancedInfo[keys[index]]}
                                        advancedInfo={advancedInfo}
                                        setAdvancedInfo={setAdvancedInfo}
                                    />
                                )
                            })}
                        </>
                        )}

                        {error && <ErrorMessage>{errorMessage}</ErrorMessage>}

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
