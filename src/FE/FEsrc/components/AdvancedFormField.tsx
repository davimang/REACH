import React from 'react';
import { FormLabel, TextInput, DropDownInput } from './FormStyles';
import { Tooltip } from '@mui/material';

export interface FieldInfo {
    label: string;
    initial: any;
    inputType: string | null;
    dropdownOptions: string[] | number[] | null;
    clinician: boolean | string;
    i: string | null;
    children: {[key: string]: FieldInfo} | null;
}
interface AdvancedFormFieldProps {
    fieldInfo: FieldInfo;
    fieldVariable: string;
    value: any;
    advancedInfo: {};
    margin: number;
    setAdvancedInfo: (info: {}) => void;
    initializeChildFields: (conditionFields: any, keys: string[], prev: {}[]) => any;
    indexOfMax: (arr: []) => number;
}
const AdvancedFormField: React.FC<AdvancedFormFieldProps> = ({
    fieldInfo,
    fieldVariable,
    value,
    advancedInfo,
    margin,
    setAdvancedInfo,
    initializeChildFields,
    indexOfMax,
}) => {

    return (
        <div style={{marginLeft: margin}}>
            <FormLabel>
                {fieldInfo.label}
                {fieldInfo.i && <Tooltip title={fieldInfo.i} placement='right' arrow>
                    <img
                        src={require('../images/Info.svg')}
                        height={18}
                        style={{ paddingLeft: 10}}
                    />
                </Tooltip>}
            </FormLabel>
            {fieldInfo.inputType && (fieldInfo.inputType == "dropdown" ?
            <DropDownInput
                value={value}
                onChange={(e) => setAdvancedInfo({ ...advancedInfo, [fieldVariable]: e.target.value })}
            >
                <option value="" disabled>{`-- Select ${fieldInfo.label} --`}</option>
                {fieldInfo.dropdownOptions && fieldInfo.dropdownOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </DropDownInput> : fieldInfo.inputType == "checkbox" ? 
            <TextInput
                type={fieldInfo.inputType}
                value={value}
                checked={value}
                style={{width: 30, height: 30}}
                onChange={(e) => {
                    if (fieldInfo.children && !e.target.checked) {
                        const tempReturn = initializeChildFields(Object.values(fieldInfo.children), Object.keys(fieldInfo.children), []);
                        const maxIndex = indexOfMax(tempReturn);
                        const initialAdvancedInfoVals = tempReturn ? tempReturn[maxIndex] : null;
                        initialAdvancedInfoVals && initialAdvancedInfoVals.map((field: any) => {
                            advancedInfo[Object.keys(field)[0]] = Object.values(field)[0];
                        })
                    }
                    setAdvancedInfo({ ...advancedInfo, [fieldVariable]: e.target.checked});
                }
                }
            /> :
            <TextInput
                type={fieldInfo.inputType}
                value={value}
                onChange={(e) => {
                    setAdvancedInfo({ ...advancedInfo, [fieldVariable]: e.target.valueAsNumber})
                }
                }
            />)}
        </div>
    );
};

export default AdvancedFormField;
