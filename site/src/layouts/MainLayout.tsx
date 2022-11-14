import AppHeader from '@src/layouts/AppHeader';
import AppFooter from '@src/layouts/AppFooter';
import { FC, ReactNode } from 'react';

type Props = {
    children?: ReactNode;
    hide?: boolean;
};
export const MainLayout: FC<Props> = ({ children, hide }) => {
    if (hide) {
        return <main>{children}</main>;
    }

    return (
        <>
            <AppHeader />
            <main>{children}</main>
            <AppFooter />
        </>
    );
};
