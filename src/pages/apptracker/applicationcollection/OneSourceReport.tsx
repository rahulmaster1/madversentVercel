import React, { useState } from 'react';

import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Avatar, Box, Container, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import type { NextPage } from 'next';

import general_information from 'pages/provider_source/general_information';

import AppTrackerPractitionerTable from 'view/components/ApptrackerComponents/AppTrackerPractitionerTable';
import ApptrackerOption from 'view/components/ApptrackerComponents/ApptrackerOption/ApptrackerOption';
import AppTrackerTable from 'view/components/Table/AppTrackerTable';

const ManagePractitionerPage: NextPage = () => {
    const [selectedOption, setSelectedOption] = useState<String>();
    const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        /* setSelectedOption(value);*/
        window.location.href = 'value';
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                background: '#F5F5F5',
                p: '40px'
            }}
        >
            <Container
                maxWidth="lg"
                sx={{
                    bgcolor: 'background.paper',
                    fontSize: '1rem',
                    pb: '40px',
                    maxWidth: { lg: 1100 }
                }}
            >
                <List
                    sx={{
                        width: '100%',
                        bgcolor: 'background.paper',
                        p: 0
                    }}
                >
                    <ListItem sx={{ pl: 0 }}>
                        <ListItemAvatar>
                            <Avatar>
                                <GroupAddIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="OneSourceReport " />
                    </ListItem>
                </List>

                <Divider sx={{ mb: 2 }} />
            </Container>
        </Box>
    );
};

export default ManagePractitionerPage;
