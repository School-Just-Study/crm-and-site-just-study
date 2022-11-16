import { Stack } from '@mui/material';
import { ContactForm } from '@src/pages/Checkout/Cart/ContactForm';
import { CheckboxButtonGroup } from 'react-hook-form-mui';
import * as React from 'react';
import { useEffect } from 'react';
import Link from '@shared/ui/Link';
import routes from '@src/routes';
import { transition } from '@shared/lib/transition';
import { formLeadsList } from '@translations/formLeadsList';
import { useRouter } from 'next/router';
import { useUnit } from 'effector-react';
import { $user } from '@shared/storage/user';
import { useFormContext } from 'react-hook-form';
import { ICartForm } from '@src/pages/Checkout/Cart/types';

export const ClientDetails = () => {
    const { locale } = useRouter();
    const t_contact = transition(formLeadsList, locale);
    const { setValue } = useFormContext<ICartForm>();
    const user = useUnit($user);

    useEffect(() => {
        if (user) {
            const name = user?.name?.split(' ') || ' ';
            setValue('firstName', name[0]);
            setValue('secondName', name[1]);
            setValue('email', user?.email as string);
            setValue('phone', user?.client?.phone);
        }
    }, [user]);

    const textTermAgree = (
        <>
            {t_contact.contacts.infoTermButton}{' '}
            <Link href={routes.terms} variant="body2">
                {t_contact.contacts.infoBottomLink}
            </Link>
        </>
    );

    const textPrivateAgree = (
        <>
            {t_contact.contacts.infoPrivacyBottom}{' '}
            <Link href={routes.privacy} variant="body2">
                {t_contact.contacts.infoBottomLink}
            </Link>
        </>
    );
    return (
        <Stack gap={2}>
            <ContactForm />
            <CheckboxButtonGroup
                name="agree"
                options={[
                    {
                        id: '1',
                        label: textTermAgree
                    },
                    { id: '2', label: textPrivateAgree }
                ]}
                required
            />
        </Stack>
    );
};
