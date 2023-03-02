import React, { useEffect, useState } from 'react';

import CustomInput from '../CustomInput';
import LoadingForm from '../Loading/Loading';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Alert,
    Box,
    Button,
    Chip,
    Divider,
    Grid,
    Tooltip,
    Typography
} from '@mui/material';
import axios from 'axios';
import localforage from 'localforage';
import { debounce } from 'lodash';
import type { NextPage } from 'next';
import { useFieldArray, useForm } from 'react-hook-form';

import licenseStatusList from 'form-fields/general-information/form-list/licenseStatusList';
import licenseTypeList from 'form-fields/general-information/form-list/licenseTypeList';
import stateOfPracticeList from 'form-fields/general-information/form-list/stateOfPracticeList';
import suffixList from 'form-fields/general-information/form-list/suffixList';
import Professionalorganizations1 from 'form-fields/history/Professionalorganizations1';
import EmployementGap from 'form-fields/historyForm/EmployementGap';
import Professionalorganizations from 'form-fields/historyForm/ProfessionalOrganizations';
import NameOfSponsorFields from 'form-fields/professional-ids/NameOfSponsor';

const LicensureMap = {
    stateOfPracticeList: stateOfPracticeList,
    licenseTypeList: licenseTypeList,
    licenseStatusList: licenseStatusList,
    suffixList: suffixList
};

export const licenseDefaultValues = {
    licenseFlag: false,
    licenseData: [
        {
            licenseState: null,
            licenseType: null,
            licenseNumber: '',
            licenseStatus: null,
            issueDate: null,
            expirationDate: null,
            practicingStateFlag: false,
            doesNotExpire: false,
            primaryLicenseFlag: false,
            requireSupervisionFlag: false,
            nameOfSponsor: {
                firstName: '',
                middleName: '',
                lastName: '',
                suffix: null,
                degree: ''
            }
        }
    ]
};

const ProfessionalOrganizations: NextPage<{
    activeStep: number;
    handleBack: () => void;
    handleComplete: () => void;
    steps: string[];
}> = ({ activeStep, handleBack, steps, handleComplete }) => {
    const [expanded, setExpanded] = React.useState<{
        panel1: boolean;
        panel2: boolean;
        panel3: boolean;
    }>({
        panel1: true,
        panel2: true,
        panel3: true
    });
    const [loading, setLoading] = useState(true);

    const handleChangePanel = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        panel === 'panel1'
            ? setExpanded({ ...expanded, panel1: isExpanded })
            : panel === 'panel2'
                ? setExpanded({ ...expanded, panel2: isExpanded })
                : setExpanded({ ...expanded, panel3: isExpanded });
    };

    const { handleSubmit, control, watch, setValue, reset, getValues } = useForm({
        defaultValues: licenseDefaultValues
    });

    const {
        fields: licenseDataFields,
        remove: licenseRemove,
        append: licenseInsert
    } = useFieldArray({
        control,
        name: 'licenseData'
    });

    const watchLicenseFlag = watch('licenseFlag');

    const onSubmit = (data: any) => {
        console.log(data);
        handleComplete();
        localforage.setItem('licensureData', data);
        axios
            .post('https://plm-health.herokuapp.com/api/provider/license/add', { data })
            .then((res) => {
                console.log('Data has been saved', res);
            })
            .catch((err) => {
                console.log('Error while processing request', err);
            });
    };

    useEffect(() => {
        localforage.getItem('licensureData').then((res: any) => {
            console.log(res);
            res && reset(res);
        });
        localforage.getItem('userId').then(async (userId: any) => {
            await axios
                .get(`https://plm-health.herokuapp.com/api/provider/personal-info/${userId}`)
                .then((res) => {
                    if (res.data.length !== 0) {
                        reset({ ...licenseDefaultValues, ...res.data[0] });
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    console.log('Error while processing request', err);
                    setLoading(false);
                });
        });
    }, []);

    const autoSave = debounce(() => {
        localforage.setItem('licensureData', getValues());
        console.log('Form updated');
    }, 5000);

    return (
        <>
            {loading ? (
                <LoadingForm loading={loading} />
            ) : (
                <React.Fragment>
                    <form onSubmit={handleSubmit(onSubmit)} onSelect={() => autoSave()}>
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                            <Grid item xs={12}>
                                <Accordion expanded={expanded.panel1} onChange={handleChangePanel('panel1')}>
                                    <AccordionDetails>
                                        <CustomInput
                                            control={control}
                                            fieldProps={Professionalorganizations1.licenseFlagField}
                                            name={Professionalorganizations1.licenseFlagField.name}
                                        />
                                        {watchLicenseFlag ? (
                                            <div>
                                                {licenseDataFields && licenseDataFields.length > 0
                                                    ? licenseDataFields.map((item: any, index: number) => {
                                                        return (
                                                            <div key={index}>
                                                                <Grid container spacing={2} sx={{ mt: 1 }}>
                                                                    {Professionalorganizations.map((field) => (
                                                                        <Grid item xs={field.size} key={field.name}>
                                                                            <CustomInput
                                                                                control={control}
                                                                                fieldProps={field}
                                                                                name={`licenseData[${index}].${field.name}`}
                                                                            />
                                                                        </Grid>
                                                                    ))}
                                                                </Grid>
                                                                <Grid container spacing={0} sx={{ mt: 2 }}></Grid>
                                                                {
                                                                    // @ts-expect-error
                                                                    // prettier-ignore1
                                                                    watch(`licenseData[${index}].requireSupervisionFlag`) && (
                                                                        <>
                                                                            <Grid
                                                                                container
                                                                                spacing={2}
                                                                                sx={{ mt: 1 }}
                                                                            >
                                                                                {NameOfSponsorFields.map((field) => (
                                                                                    <Grid
                                                                                        item
                                                                                        xs={field.size}
                                                                                        key={field.name}
                                                                                    >
                                                                                        <CustomInput
                                                                                            control={control}
                                                                                            fieldProps={field}
                                                                                            name={`licenseData[${index}].nameOfSponsor.${field.name}`}
                                                                                            options={
                                                                                                LicensureMap[
                                                                                                field.options as keyof typeof LicensureMap
                                                                                                ]
                                                                                            }
                                                                                        />
                                                                                    </Grid>
                                                                                ))}
                                                                            </Grid>
                                                                        </>
                                                                    )
                                                                }
                                                            </div>
                                                        );
                                                    })
                                                    : ''}
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
                        </Grid>

                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button color="inherit" variant="contained" onClick={handleBack} sx={{ mr: 1 }}>
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {activeStep !== steps.length && (
                                <Button variant="contained" type="submit">
                                    Next
                                </Button>
                            )}
                        </Box>
                    </form>
                </React.Fragment>
            )}{' '}
        </>
    );
};

export default ProfessionalOrganizations;
