import { useUnit } from 'effector-react';
import { $isUserAuthorized, authWithTokenFx, getAuthTokenWithEmailFx, getUserFx } from '@shared/storage/user';
import { FC, PropsWithChildren } from 'react';
import { SpinnerWrapper } from '@shared/ui/SpinnerWrapper';
import { Alert } from '@mui/material';

export const Authorization: FC<PropsWithChildren> = ({ children }) => {
    const auth = useUnit($isUserAuthorized);
    const loading = useUnit(getAuthTokenWithEmailFx.pending || authWithTokenFx.pending || getUserFx.pending);

    if (auth) {
        return <>{children}</>;
    }

    return (
        <SpinnerWrapper loading={loading} centerMode>
            <Alert severity="warning">Вы не авторизованы или пользователь не найден в системе</Alert>
        </SpinnerWrapper>
    );
};
