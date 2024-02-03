import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {TextField} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

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


    const conditions: readonly String[] = [
        "Meningitis - fungal",
        "Coma - hyperosmolar nonketotic (HONK)",
        "Filtering bleb failed",
        "Cigarette smoker",
        "Mediastinal adenopathy",
        "Seizure - electrographic",
        "Edema peripheral",
        "Cystocele",
        "Hyperhidrosis",
        "Chorioamnionitis",
        "Sexual abuse",
        "Histiocytosis - malignant",
        "Pleuritic pain",
        "Esophageal dysphagia",
        "Glaucoma - low tension",
        "Superficial phlebitis",
        "Laceration",
        "Cruciate ligament tear",
        "Erectile dysfunction",
        "Vision - diminished",
        "Sinus tenderness",
        "Vision - blurred",
        "Muscle rupture",
        "Diabetic nephropathy - juvenile controlled",
        "Whipple's disease",
        "Achalasia",
        "Felty syndrome",
        "Anaphylaxis",
        "Diabetic enteropathy",
        "Uterine hemorrhage",
        "Amniocentesis",
        "Varicella",
        "Diarrhea",
        "Glomerulonephritis - mesangial proliferative",
        "Riedel's thyroiditis",
        "Paget's disease of bone",
        "Nasal polyp",
        "Erythrocytosis",
        "Alkalosis - respiratory",
        "Sturge-Weber syndrome",
        "Ocular herpes zoster",
        "Wound dehiscence",
        "Excoriation - neurotic",
        "Mucormycosis",
        "Renal insufficiency - chronic",
        "Renal artery stenosis",
        "Menorrhagia",
        "Sulfhemoglobinemia",
        "Gastric varices",
        "Adenoidectomy",
        "Heel pain",
        "Dog bite",
        "Lithium toxicity",
        "Anal/rectal surgery",
        "Scleroderma",
        "Spermatogenic arrest",
        "Flatulence",
        "Stab wound",
        "Factor X deficiency",
        "Agoraphobia with panic attacks",
        "Atrophic gastritis",
        "Numbness",
        "Macular degeneration",
        "Tooth loss",
        "Cholesterolosis",
        "Bile stasis",
        "Chlamydia pneumonia",
        "Conjunctival hemorrhage",
        "Osteoma",
        "CMV retinitis",
        "Granuloma - non-necrotizing",
        "Forearm fracture - open",
        "Beta thalassemia",
        "Alopecia areata",
        "Telogen effluvium",
        "Colon polyp",
        "Breast mass",
        "Caf\u00e9 au lait spot",
        "Facial bone fracture",
        "Hyperventilation",
        "Adenosis - sclerosing",
        "Varices",
        "Hidradenitis",
        "Laryngectomy",
        "Nephropathy - urate",
        "Myalgia",
        "Tongue - red",
        "Pharyngeal ulcer",
        "Intraductal carcinoma",
        "Central nervous system shunt",
        "Jaundice",
        "Takayasu's arteritis",
        "Pityriasis alba",
        "Hepatic metastases",
        "Behavior problem",
        "Esotropia",
        "Hemoptysis",
        "Pneumoconiosis",
        "Akathisia",
        "Intraventricular hemorrhage",
        "Hypotonia",
        "Hypotension",
        "Heart disease - congenital",
        "Dysmenorrhea",
        "Splenic infarction",
        "Acidosis - metabolic",
        "Pituitary tumor",
        "Denervation",
        "Hemoglobin A2 - high",
        "Bullous pemphigoid",
        "Coronary artery disease",
        "Hydatidiform mole - invasive",
        "Pseudoxanthoma elasticum",
        "Billroth I gastrectomy",
        "Liposarcoma - myxoid",
        "Vaginal bleeding",
        "Ectropion",
        "Hip dislocation - congenital",
        "Hip subluxation - congenital",
        "Ganglioneuroblastoma",
        "Glomerulonephritis - acute",
        "Cleft lip/pal surgery",
        "Retinoblastoma",
        "Epidermal inclusion cyst",
        "Familial Mediterranean fever",
        "Otorrhea",
        "Atten deficit hyperactivity disorder",
        "Liver transplant",
        "Open heart surgery",
        "Gastric obstruction",
        "Asthma",
        "Insomnia",
        "Parapsoriasis",
        "Atrial septal defect",
        "Pancreatitis - chronic",
        "Intrauterine device (IUD)",
        "Bioprosthetic heart valve",
        "Erythroblastosis fetalis",
        "Leiomyosarcoma",
        "Brenner tumor - malignant",
        "Pulmonary edema",
        "Osteoarthritis",
        "Verruca plana",
        "Bromhidrosis",
        "Pharyngeal exudates",
        "Spontaneous abortion",
        "Lipogranuloma",
        "Hepatitis - giant cell",
        "Laryngeal abscess",
        "Vertebrobasilar insufficiency",
        "Salivary duct stone",
        "Toe strain",
        "Polyuria",
        "Coma",
        "Suspected child abuse",
        "Hypokalemia",
        "Angina - recurrent",
        "Glaucoma - combined mechanism",
        "Hepatomegaly",
        "AAA repair",
        "Major depression - recurrent",
        "Chorioretinitis",
        "Berry aneurysm",
        "Cutaneous B cell lymphoma",
        "Acropustulosis - infantile",
        "Amyotrophic lateral sclerosis",
        "Lichen simplex chronicus",
        "Hartnup disease",
        "Neuroleptic malignant syndrome",
        "Circumcision",
        "Postconcussion syndrome",
        "Thoracic spondylosis",
        "Mental retardation",
        "Neurosis",
        "Hypertension with pregnancy",
        "Alveolar proteinosis",
        "Myeloid maturation arrest",
        "Lymphocytic leukemia - chronic",
        "Hemangioma",
        "Giant cell tumor of bone",
        "Hepatitis exposure",
        "Fasciectomy",
        "Reye's syndrome",
        "Median neuropathy",
        "Arteriosclerosis",
        "Ulnar neuropathy",
        "Fanconi syndrome",
        "Hypothermia",
        "Cystic fibrosis",
        "Hematuria - gross",
        "Trochlear nerve palsy",
        "Colonic volvulus",
        "Colitis - ischemic",
        "Necrotizing enterocolitis",
        "Toxicity - digitalis",
        "Hyperlipoproteinemia (type V)",
        "Finger pain",
        "Finger sprain",
        "Tubular adenocarcinoma",
        "Adenoma - tubular",
        "Tonsillitis - acute",
        "Hyperplastic marrow",
        "Knee arthroplasty - total",
        "Anemia - myelophthisic",
        "Oophorectomy",
        "Vertebral burst fracture",
        "Histiocytoma - atypical fibrous",
        "Granuloma annulare",
        "Jejunostomy tube",
        "Verruca plantaris",
        "Lower leg/knee instability",
        "Shoulder instability",
        "Lymphangioma",
        "Hemangiopericytoma - malignant",
        "Acromegaly",
        "Erythema multiforme",
        "Psoriasis",
        "Lower gastrointestinal bleeding",
        "Thyroid cyst",
        "Alcohol abuse - continuous",
        "Vasovagal attack",
        "Pyloric obstruction",
        "Adenosquamous carcinoma",
        "Thyroglossal cyst",
        "Thyroid bruit",
        "Bladder stone",
        "Organic brain syndrome",
        "Nocturnal dyspnea",
        "Aortic valve abnormality",
        "Arteriovenous fistula",
        "Lateral meniscus tear",
        "Dyslexia",
        "Cartilage disorder",
        "Social phobia",
        "Nasolacrimal duct obstruction",
        "Radius fracture",
        "Throat cancer",
        "Paronychia",
        "Prurigo of pregnancy",
        "Failure to thrive",
        "Muscle strain",
        "Hyperlipoproteinemia (type IV)",
        "Serous cystadenocarcinoma",
        "Bronchopulmonary dysplasia",
        "Striae",
        "Hypertension - essential",
        "Meningismus",
        "Myoclonus",
        "Cervical vertebra fracture",
        "Creutzfeldt-Jakob disease",
        "Cervical dysplasia",
        "Melanoma - nodular",
        "Dysphagia",
        "Chondromalacia",
        "Alkaptonuria",
        "Below knee amputation",
        "Lower back pain",
        "Pyuria",
        "Linear immunoglobulin A dermatosis",
        "Intraepithelial lesion - squamous",
        "Pemphigus",
        "Cirrhosis - micronodular",
        "Dermatographism",
        "Hypothyroidism",
        "Infectious mononucleosis",
        "Epistaxis",
        "Gastrointestinal perforation",
        "Myocardial infarction",
        "Pheochromocytoma",
        "Lower leg injury",
        "Genitourinary surgery",
        "Sacroiliac sprain",
        "Weight loss",
        "Amyloid",
        "Melasma",
        "Glomerulonephritis - post-infectious",
        "Urinary stress incontinence - female",
        "Q fever",
        "Rabies",
        "Rubella syndrome",
        "Microcephaly",
        "Pruritus genitalia",
        "Laxative abuse",
        "Renal cyst - acquired",
        "Glomerulonephritis - membranous",
        "HELLP syndrome",
        "Hyperosmolality",
        "Autism",
        "Prinzmetal's angina",
        "Lymphangiectasis",
        "Elbow fracture",
        "Clavicle fracture",
        "Splenic rupture",
        "Bronchitis - acute",
        "Heart Attack",
        "Artery surgery",
        "Vulva cancer",
        "Diskectomy",
        "Thoracentesis",
        "Gastrectomy - subtotal",
        "Histocytosis",
        "Spermatocele"
    ]

    //const userId = localStorage.get("userId");

    const genderMapping = {"Male" : "M", "Female": "F", "Other": "O"};

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
            user: 1, 
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
                    <Autocomplete
                        disablePortal
                        onInputChange={(event, value, reason) => {
                            setFormValues({ ...formValues, condition: value})
                            handleAdvancedInfo()
                        }}
                        freeSolo={true}
                        options={conditions}
                        sx={{ width: 435, height: 44, color: "white"}}
                        renderInput={(params) => <TextField {...params} label="-- Select Condition --" sx={{bgcolor: "white", borderColor: "white"}} value={formValues.condition}
                            onChange={(e) => {
                            console.log(e.target.value);
                            const newCondition = e.target.value;
                            console.log("new condition: ", newCondition);
                            setFormValues({ ...formValues, condition: newCondition});
                            console.log(formValues);
                            handleAdvancedInfo();
                            console.log(e.target.value);
                        }} />
                    }
                    />
                    
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
