import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { API_URL } from '..';
import { SuccessMessage } from '../components/FormStyles';
import { conditions } from '../components/Constants';
import { FormContainer, Form, FormLabel, TextInput, AutocompleteInput, ButtonContainer, FormButton, DropDownInput, AutocompleteTextField, FormButtonDisabled, ErrorMessage, FormTitle, FormDisclaimerText, FormDisclaimerTitle } from '../components/FormStyles';
import { checkEmpty, fieldValidation } from '../hooks/Validation';
import { Conditions } from '../constants/ConditionFields';
import AdvancedFormField, { FieldInfo } from '../components/AdvancedFormField';
import CustomizedSnackbars from '../components/SnackBar';

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

    const [isRegistrationSnackOpen, setIsRegistrationSnackOpen] = useState(false);

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

    const isClinician = localStorage.getItem('isClinician') == "true";

    const [error, setError] = useState(false);

    const errorMessage = 'Profile creation failed. Please try again.';

    const genericErrorMessage = 'This field cannot be empty';

    const addressValid = !isClinician ? (streetField.valid && cityField.valid && provinceField.valid && postalCodeField.valid) : (postalCodeField.valid);

    const enableSubmit = nameField.valid && dateOfBirthField.valid && genderField.valid && addressValid;

    const createRequestOptions = () => {

        const formattedAddress = {
            street: isClinician ? "" : streetField.value,
            city: isClinician ? "" : cityField.value,
            province: isClinician ? "" : provinceField.value,
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

    function indexOfMax(arr) {
        if (arr.length === 0) return -1;

        return arr.reduce((maxIndex, currentArray, currentIndex, array) => {
            return currentArray.length > array[maxIndex].length ? currentIndex : maxIndex;
        }, 0);
    }

    const recursiveConditionFields = (conditionFields: any, keys: string[], margin: number) => {
        return (
            conditionFields.map((field: FieldInfo, index) => {
                const displayCondition = field.clinician == "both" || (isClinician == field.clinician);
                const recursionCondition = advancedInfo[keys[index]] == true || keys[index]?.includes("SUBHEADER");
                return displayCondition && (
                    <React.Fragment key={keys[index]}>
                        <AdvancedFormField
                            key={keys[index]}
                            fieldInfo={field}
                            fieldVariable={keys[index]}
                            value={advancedInfo[keys[index]]}
                            advancedInfo={advancedInfo}
                            setAdvancedInfo={setAdvancedInfo}
                            initializeChildFields={updateAdvancedInfoOnConditionSelection}
                            indexOfMax={indexOfMax}
                            margin={margin}
                        />
                        {field?.children && recursionCondition ? recursiveConditionFields(Object.values(field.children), Object.keys(field.children), margin + 25) : null}
                    </React.Fragment>
                )
            })
        )
    }

    const checkJustRegistered = () => {
        if (localStorage.getItem('justRegistered')) {
            setIsRegistrationSnackOpen(true);
            localStorage.removeItem('justRegistered');
            localStorage.setItem('firstProfileCreated', "true");
        }
    }

    const updateAdvancedInfoOnConditionSelection = (conditionFields: any, keys: string[], prev: {}[]) => {
        return (
            conditionFields.map((fieldVariable: FieldInfo, index) => {
                if (fieldVariable.clinician == "both" || (isClinician == fieldVariable.clinician)) {
                    const tempCond = { [keys[index]]: fieldVariable.initial };
                    prev.push(tempCond);
                }

                return fieldVariable?.children ? updateAdvancedInfoOnConditionSelection(Object.values(fieldVariable.children), Object.keys(fieldVariable.children), prev) : prev;
            })
        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const requestOptions = createRequestOptions();
        const endpoint = !props.editing ? `${API_URL}/patientinfo/` : `${API_URL}/patientinfo/${props.profileId}/`
        console.log(endpoint);
        try {
            const response = await fetch(endpoint, requestOptions);
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('openProfileSnack', "true");
                navigate(!props.editing ? '/search' : '/listprofiles');
            }
            else {
                setError(true);
            }
        } catch (error) {
            setError(true);
        }
    };

    useEffect(() => {
        const tempReturn = Conditions[formValues.condition] ? updateAdvancedInfoOnConditionSelection(Object.values(Conditions[formValues.condition]), Object.keys(Conditions[formValues.condition]), []) : null;
        const maxIndex = tempReturn ? indexOfMax(tempReturn) : null;
        const initialAdvancedInfoVals = tempReturn ? tempReturn[maxIndex] : null;
        const temp = {};

        initialAdvancedInfoVals && initialAdvancedInfoVals.map((field: any) => {
            field && !Object.keys(field)[0]?.includes("SUBHEADER") ? temp[Object.keys(field)[0]] = Object.values(field)[0] : null;
            return temp;
        })

        setAdvancedInfo({ ...temp, ...advancedInfo });
    }, [formValues.condition]);

    useEffect(() => {
        if (error) {
            setError(false);
        }
    }, [nameField.value, streetField.value, cityField.value, provinceField.value, postalCodeField.value, dateOfBirthField.value, genderField.value, formValues, advancedInfo]);

    useEffect(() => {
        setAuthToken(localStorage.getItem('accessToken'));
    }, [localStorage.getItem('accessToken')]);


    useEffect(() => {
        checkJustRegistered();
    }, [])

    return (
        <>
            <ProfileCreationContainer>
                <CustomizedSnackbars
                    isOpen={isRegistrationSnackOpen}
                    setIsOpen={setIsRegistrationSnackOpen}
                    snackText={"Account Registered Successfully!"}
                />
                <FormContainer>
                    {!props.editing && (localStorage.getItem('isClinician') == "true") && <FormTitle>New Patient Profile</FormTitle>}
                    {!props.editing && !(localStorage.getItem('isClinician') == "true") && <FormTitle>New Search Profile</FormTitle>}
                    {props.editing && (localStorage.getItem('isClinician') == "true") && <FormTitle>Edit Patient Profile</FormTitle>}
                    {props.editing && !(localStorage.getItem('isClinician') == "true") && <FormTitle>Edit Search Profile</FormTitle>}
                    {!props.editing && (localStorage.getItem('isClinician') == "true") && <FormDisclaimerText>
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
                    </FormDisclaimerText>}
                    {!props.editing && !isClinician && <FormDisclaimerText>
                        <FormDisclaimerTitle>
                            <img
                                src={require('../images/Exclaim.svg')}
                                height={24}
                                style={{ paddingRight: 5, paddingBottom: 5 }}
                            />
                            <b style={{ marginTop: 'auto', marginBottom: 'auto', textShadow: '1px 1px 1px black' }}>Please Note:</b>
                        </FormDisclaimerTitle>
                        This is a search profile - it is what enables the platform to match you to clincial studies that you may be eligible for and it is
                        separate from your main account details (such as email, username, etc..).
                    </FormDisclaimerText>}
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
                            {!isClinician && <div style={{ display: 'flex' }}>
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
                            </div>}
                            <div style={{ display: 'flex' }}>
                                {!isClinician && <div>
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
                                </div>}
                                {!isClinician && <div style={{ minWidth: 10 }} />}
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
                            max='9999-12-31'
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
                                setAdvancedInfo({});
                                setFormValues({ ...formValues, condition: value });
                            }}
                            defaultValue={formValues.condition}
                            freeSolo={true}
                            options={conditions}
                            renderInput={(params) => <AutocompleteTextField {...params} label={formValues.condition ? null : "-- Select Condition --"} defaultValue={formValues.condition} value={formValues.condition}
                                onChange={(e) => {
                                    setAdvancedInfo({});
                                    const newCondition = e.target.value;
                                    setFormValues({ ...formValues, condition: newCondition });
                                }} />
                            }
                        />

                        {Conditions[formValues.condition] && (
                            recursiveConditionFields(Object.values(Conditions[formValues.condition]), Object.keys(Conditions[formValues.condition]), 0)
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
