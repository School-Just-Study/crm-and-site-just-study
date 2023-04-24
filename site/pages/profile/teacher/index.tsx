import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { Authorization } from '@shared/components/Authorization';
import { AccountWrapper } from '@src/layouts/AccountWrapper';
import { Card } from '@mui/material';
import { TeacherCabinet } from '@src/pages/Profile/TeacherCabinet';

const TeacherCabinetPage: NextPage = () => {
    return (
        <AccountWrapper title="Кабинет учителя" hideLayout>
            <Authorization>
                <Card sx={{ p: 1 }}>
                    <TeacherCabinet />
                </Card>
            </Authorization>
        </AccountWrapper>
    );
};

export default dynamic(() => Promise.resolve(TeacherCabinetPage), {
    ssr: false
});
