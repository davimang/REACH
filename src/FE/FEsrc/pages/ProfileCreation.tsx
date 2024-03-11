import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { API_URL } from '..';
import { conditions } from '../components/Constants';
import { FormContainer, Form, FormLabel, TextInput, AutocompleteInput, ButtonContainer, FormButton, DropDownInput, AutocompleteTextField, FormButtonDisabled, ErrorMessage, FormTitle, FormDisclaimerText, FormDisclaimerTitle } from '../components/FormStyles';
import { checkEmpty, fieldValidation } from '../hooks/Validation';
import { Conditions } from '../constants/ConditionFields';
import AdvancedFormField, { FieldInfo } from '../components/AdvancedFormField';

const ProfileCreationContainer = styled.div`
    min-width: fit-content;
    padding: 15px;
`;

const defaultProps = {
    defaultProfileName: "",
    defaultStreet: "",
    defaultCity: "",
    defaultPostalCode: "",
    defaultProvince: "",
    defaultDateOfBirth: "",
    defaultGender: "",
    defaultCondition: "",
    editing: false,
    defaultAdvancedInfo: {}
};


const ProfileCreationPage = (props) => {

    props = { ...defaultProps, ...props };

    const userId = localStorage.getItem('userId');

    const navigate = useNavigate();

    const genderMapping = { 'Male': 'M', 'Female': 'F', 'Other': 'O' };

    const [advancedInfo, setAdvancedInfo] = useState(props.defaultAdvancedInfo);
    const [formValues, setFormValues] = useState({
        user: userId,
        condition: props.defaultCondition,
        advancedInfo: advancedInfo
    });

    const [authToken, setAuthToken] = useState(localStorage.getItem('accessToken'));

    const nameField = fieldValidation(checkEmpty, props.defaultProfileName);
    const streetField = fieldValidation(checkEmpty, props.defaultStreet);
    const cityField = fieldValidation(checkEmpty, props.defaultCity);
    const provinceField = fieldValidation(checkEmpty, props.defaultProvince);
    const postalCodeField = fieldValidation(checkEmpty, props.defaultPostalCode);
    const dateOfBirthField = fieldValidation(checkEmpty, props.defaultDateOfBirth);
    const genderField = fieldValidation(checkEmpty, props.defaultGender);

    const [error, setError] = useState(false);

    const errorMessage = 'Profile creation failed. Please try again.';

    const genericErrorMessage = 'This field cannot be empty';

    const enableSubmit = nameField.valid && streetField.valid && cityField.valid && provinceField.valid && postalCodeField.valid && dateOfBirthField.valid && genderField.valid;

    const createRequestOptions = () => {

        const formattedAddress = {
            street: streetField.value,
            city: cityField.value,
            province: provinceField.value,
            postalCode: postalCodeField.value
        }
        const mappedGender = genderMapping[genderField.value];
        return {
            method: !props.editing ? 'POST' : 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
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
        const endpoint = !props.editing ? `${API_URL}/patientinfo/` : `${API_URL}/patientinfo/${props.profileId}/`
        console.log(endpoint);
        try {
            const response = await fetch(endpoint, requestOptions);
            const data = await response.json();

            if (response.ok) {
                navigate(!props.editing ? '/' : '/listprofiles');
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
        Conditions[formValues.condition] && Object.values(Conditions[formValues.condition]).map((fieldVariable: { initial: string }, index) => {
            const keys = Object.keys(Conditions[formValues.condition]);
            temp[keys[index]] = fieldVariable.initial;
            return temp;
        })
        setAdvancedInfo({ ...temp, ...advancedInfo })
    }, [formValues.condition]);

    useEffect(() => {
        if (error) {
            setError(false);
        }
    }, [nameField.value, streetField.value, cityField.value, provinceField.value, postalCodeField.value, dateOfBirthField.value, genderField.value, formValues, advancedInfo]);

    useEffect(() => {
        setAuthToken(localStorage.getItem('accessToken'));
    }, [localStorage.getItem('accessToken')]);

    return (
        <>
            <ProfileCreationContainer>
                <FormContainer>
                    <FormTitle>New Patient Profile</FormTitle>
                    <FormDisclaimerText>
                        <FormDisclaimerTitle>
                            <img
                                src={require('../images/Exclaim.svg')}
                                height={24}
                                style={{ paddingRight: 5, paddingBottom: 5 }}
                            />
                            <b style={{ marginTop: 'auto', marginBottom: 'auto', textShadow: '1px 1px 1px black' }}>Please Note:</b>
                        </FormDisclaimerTitle>
                        Filling in this patient profile form allows users to save a patient's medical information in order
                        to more efficiently search for clinical trials. <b><u>Please keep privacy and confidentiality in mind
                            (i.e. use initials) when creating these patient profiles.</u></b>
                    </FormDisclaimerText>
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

                        <div>
                            <div style={{ display: 'flex' }}>
                                <div>
                                    <FormLabel>Street</FormLabel>
                                    <TextInput
                                        type='text'
                                        id='street'
                                        value={streetField.value}
                                        onChange={streetField.handleChange}
                                        onBlur={streetField.handleBlur}
                                    />
                                    {streetField.showErrorMessage && <ErrorMessage>{genericErrorMessage}</ErrorMessage>}
                                </div>
                                <div style={{ minWidth: 10 }} />
                                <div style={{ width: 125 }}>
                                    <FormLabel>City</FormLabel>
                                    <TextInput
                                        type='text'
                                        id='city'
                                        value={cityField.value}
                                        onChange={cityField.handleChange}
                                        onBlur={cityField.handleBlur}
                                    />
                                    {cityField.showErrorMessage && <ErrorMessage>{genericErrorMessage}</ErrorMessage>}
                                </div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div>
                                    <FormLabel>Province</FormLabel>
                                    <DropDownInput
                                        value={provinceField.value}
                                        onChange={provinceField.handleChange}
                                    >
                                        <option value='' disabled>-- Select Province --</option>
                                        <option value="Alberta">Alberta</option>
                                        <option value="British Columbia">British Columbia</option>
                                        <option value="Manitoba">Manitoba</option>
                                        <option value="New Brunswick">New Brunswick</option>
                                        <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                                        <option value="Nova Scotia">Nova Scotia</option>
                                        <option value="Northwest Territories">Northwest Territories</option>
                                        <option value="Nunavut">Nunavut</option>
                                        <option value="Ontario">Ontario</option>
                                        <option value="Prince Edward Island">Prince Edward Island</option>
                                        <option value="Quebec">Quebec</option>
                                        <option value="Saskatchewan">Saskatchewan</option>
                                        <option value="Yukon">Yukon</option>
                                    </DropDownInput>
                                    {provinceField.showErrorMessage && <ErrorMessage>{genericErrorMessage}</ErrorMessage>}
                                </div>
                                <div style={{ minWidth: 10 }} />
                                <div>
                                    <FormLabel>Postal Code</FormLabel>
                                    <TextInput
                                        type='text'
                                        id='postalCode'
                                        value={postalCodeField.value}
                                        onChange={postalCodeField.handleChange}
                                        onBlur={postalCodeField.handleBlur}
                                    />
                                    {postalCodeField.showErrorMessage && <ErrorMessage>{genericErrorMessage}</ErrorMessage>}
                                </div>
                            </div>
                        </div>

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
                            defaultValue={formValues.condition}
                            freeSolo={true}
                            options={conditions}
                            renderInput={(params) => <AutocompleteTextField {...params} label={formValues.condition ? null : "-- Select Condition --"} defaultValue={formValues.condition} value={formValues.condition}
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
