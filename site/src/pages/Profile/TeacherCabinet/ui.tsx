import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { tabs } from '@src/pages/Profile/TeacherCabinet/const';
import { WorkTime } from '@src/pages/Profile/TeacherCabinet/WorkTime';
import { useState } from 'react';
import { Schedule } from './Schedule';

export const TeacherCabinet = () => {
    const [activeTab, setActiveTab] = useState<string>('1');

    return (
        <TabContext value={activeTab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={(event, value) => setActiveTab(value)} variant="scrollable" scrollButtons="auto">
                    {tabs.map(({ label, value, disabled }) => (
                        <Tab key={value} label={label} value={value} disabled={disabled} />
                    ))}
                </TabList>
            </Box>
            <TabPanel value="1">
                <Schedule />
            </TabPanel>
            <TabPanel value="2">
                <WorkTime />
            </TabPanel>
        </TabContext>
    );
};
