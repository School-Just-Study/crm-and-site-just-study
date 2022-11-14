import { Alert, Box, Typography } from '@mui/material';
import { FormContainer, TextFieldElement } from 'react-hook-form-mui';
import { useForm } from 'react-hook-form';
import Link from '@shared/ui/Link';
import routes from '@src/routes';
import { useRouter } from 'next/router';
import { transition } from '@src/shared/lib/transition';
import { formLeadsList } from '@translations/formLeadsList';
import * as React from 'react';
import { FC } from 'react';
import { useMutation } from '@apollo/client';
import LoadingButton from '@mui/lab/LoadingButton';
import { PhoneField } from '@shared/fields/PhoneField';
import { MUTATION_NEW_LEAD } from '@shared/components/FormForLeads/mutation';
import { ILidForm } from '@shared/components/FormForLeads/types';
import { useUnit } from 'effector-react';
import { $formLeadData, resetFormLeadData } from '@shared/components/FormForLeads/model';
import { setEmailAuth } from '@shared/storage/user';
import { formatForm } from '@shared/components/FormForLeads/lib';

export const Form: FC = () => {
    const formData = useUnit($formLeadData);
    const { locale, push, asPath } = useRouter();
    const t = transition(formLeadsList, locale);
    const comment = `Страница: ${asPath}, язык: ${locale}, ${formData}`;
    const formContext = useForm<ILidForm>({ defaultValues: { comment, language: locale } });
    const { handleSubmit, control } = formContext;
    const [createLid, { loading, error }] = useMutation(MUTATION_NEW_LEAD);

    const onSubmit = handleSubmit(async (data) => {
        const formatData = formatForm(data);
        createLid({ variables: { data: formatData } }).then((res) => {
            if (res.data) {
                setEmailAuth(data.email);
                resetFormLeadData();
                push(routes.success);
            }
        });
    });

    return (
        <Box maxWidth={{ xs: '100%', md: 560 }}>
            <Typography variant="h6" mb={2}>
                {t.contacts.title}
            </Typography>
            <FormContainer formContext={formContext} handleSubmit={onSubmit}>
                <Box display="grid" gap={{ xs: 2, md: 3 }}>
                    <Box
                        display="grid"
                        gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}
                        gap={{ xs: 2, md: 2 }}
                        alignItems="center">
                        <TextFieldElement
                            name="name"
                            label={t.contacts.nameInput}
                            required
                            autoComplete="name"
                            disabled={loading}
                        />
                        <PhoneField
                            control={control}
                            name="phone"
                            specialLabel={t.contacts.phoneInput}
                            rules={{ required: 'Обязательное поле' }}
                        />
                    </Box>
                    <TextFieldElement
                        name="email"
                        label={t.contacts.emailInput}
                        autoComplete="email"
                        disabled={loading}
                        required
                    />
                    {error && <Alert severity="error">{t.error}</Alert>}
                    <LoadingButton size="large" loading={loading} variant="contained" type="submit">
                        {t.contacts.submitButton}
                    </LoadingButton>
                    <Box>
                        <Typography variant="body2">{t.contacts.infoPrivacyBottom}</Typography>
                        <Link href={routes.privacy} variant="body2">
                            {t.contacts.infoBottomLink}
                        </Link>
                    </Box>
                </Box>
            </FormContainer>
        </Box>
    );
};
