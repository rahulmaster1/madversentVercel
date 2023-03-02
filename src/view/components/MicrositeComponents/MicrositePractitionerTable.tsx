import React, { useEffect, useState } from 'react';

import CustomInput from '../CustomInput';
import ClientHomeTable from '../Table/ClientHomeTable';
import { Alert, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { debounce } from 'lodash';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { selectProviderSourceReducer } from 'state/reducers/providerSourceReducer';

import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';

import ManagePractitionerFilter2Fields from 'form-fields/Encompass/ManagePractitionerFilter2';
import andOrList from 'form-fields/Encompass/form-list/andOrList';
import displayList from 'form-fields/Encompass/form-list/displayList';
import goToList from 'form-fields/Encompass/form-list/goToList';
import inConditionList from 'form-fields/Encompass/form-list/inConditionList';
import operatorList from 'form-fields/Encompass/form-list/operatorList';
import whereConditionList from 'form-fields/Encompass/form-list/whereConditionList';
import MicrositePractitionerFilter2 from 'form-fields/Micrositefilled/MicrositePractitionerFilter2';

const ManagePractitionerMap = {
    goToList: goToList,
    whereConditionList: whereConditionList,
    operatorList: operatorList,
    inConditionList: inConditionList,
    andOrList: andOrList
};

export const ManagePractitionerValues = {
    in: null,
    where: null,
    whereOperator: null,
    whereCondition: '',
    andOr: null,
    goTo: null,
    conditionName: ''
};

const MicrositePractitionerTable: NextPage<{}> = () => {
    const router = useRouter();
    // const { activeRoute } = useAppSelector(selectLoginReducer);
    const dispatch = useAppDispatch();

    const { progressBarState } = useAppSelector(selectProviderSourceReducer);

    const { handleSubmit, control, watch, setValue, reset, getValues } = useForm({
        defaultValues: ManagePractitionerValues
    });

    const onSubmit = (data: any) => {
        // dispatch(setActiveRoute('/provider_source/professional_ids'));
        // router.push('/provider_source/professional_ids');
        // handleComplete();
        // localforage.setItem('ManagePractitionerData', data);
        // localforage.getItem('userId').then((res: any) => {
        //     console.log({ ...data, userId: res });
        //     axios
        //         .post('https://plm-health.herokuapp.com/api/provider/personal-info/add', { ...data, userId: res })
        //         .then((res) => {
        //             console.log('Data has been saved', { ...data, userId: res });
        //         })
        //         .catch((err) => {
        //             console.log('Error while processing request', err);
        //         });
        // });
    };
    useEffect(() => {
        // localforage.getItem('ManagePractitionerData').then((res: any) => {
        //     res && reset(res);
        // });
    }, []);

    const autoSave = debounce(() => {
        // localforage.setItem('ManagePractitionerData', getValues());
        // console.log('Form updated');
    }, 5000);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} onSelect={() => autoSave()}>
                <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
                    From what Application Create Date onwards do you want to see the records?
                    {MicrositePractitionerFilter2.map((field) => (
                        <Grid item xs={field.size} key={field.name}>
                            <CustomInput
                                control={control}
                                fieldProps={field}
                                name={field.name}
                                options={ManagePractitionerMap[field.options as keyof typeof ManagePractitionerMap]}
                            />
                        </Grid>
                    ))}
                    <Button variant="contained" type="submit">
                        Submit
                    </Button>
                </Grid>
            </form>
        </>
    );
};

export default MicrositePractitionerTable;
