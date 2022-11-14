import * as React from 'react';
import { FC, useEffect } from 'react';
import Divider from '@mui/material/Divider';
import { Alert, Box, Card, Stack, Typography } from '@mui/material';
import { getTextCurrency } from '@src/shared/lib/currency';
import { CheckboxButtonGroup, FormContainer } from 'react-hook-form-mui';
import { useRouter } from 'next/router';
import { transition } from '@src/shared/lib/transition';
import { formLeadsList } from '@translations/formLeadsList';
import { useForm } from 'react-hook-form';
import { cartPage } from '@translations/cartPage';
import Link from '@shared/ui/Link';
import routes from '@src/routes';
import { ContactForm } from '@shared/components/Cart/ContactForm';
import { Currency } from '@shared/enums/currency.enum';
import { CartItem } from '@shared/components/Cart/CartItem';
import { CartItem as CartItemProps, PaymentResponse } from '@src/shared/lib/apollo/types';
import { useMutation } from '@apollo/client';
import { ICartForm } from '@shared/components/Cart/types';
import { MUTATION_CART } from '@shared/components/Cart/graphql';
import { LoadingButton } from '@mui/lab';
import { convertMoney } from '@src/shared/lib/convertMoney';
import { useTheme } from '@mui/material/styles';
import { useUnit } from 'effector-react';
import { $user } from '@shared/storage/user';
import { formatForm } from '@shared/components/Cart/lib';

export const Cart: FC = () => {
    const theme = useTheme();
    const { locale, push } = useRouter();
    const user = useUnit($user);
    const userCart = user?.cart;
    const formContext = useForm<ICartForm>({ defaultValues: { language: locale } });
    const { handleSubmit, setValue } = formContext;
    const t = transition(cartPage, locale);
    const t_contact = transition(formLeadsList, locale);
    const [sendCart, { loading, error, data }] = useMutation<{ cart: PaymentResponse }>(MUTATION_CART);

    const onSubmit = handleSubmit(async (data) => {
        const formatData = formatForm(data);
        await sendCart({ variables: { data: formatData } });
    });

    useEffect(() => {
        if (data?.cart?.status) {
            push(data.cart.redirectUrl);
        }
    }, [data, error, loading, push]);

    useEffect(() => {
        if (user) {
            const name = user?.name?.split(' ') || ' ';
            setValue('firstName', name[0]);
            setValue('secondName', name[1]);
            setValue('email', user?.email as string);
            setValue('phone', user?.client?.phone);
        }
    }, [setValue, user]);

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
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                py: { xs: 3, md: 6 },
                px: { xs: 2, md: 6 }
            }}>
            <Stack gap={2}>
                <Typography variant="h1" style={{ wordBreak: 'break-word' }}>
                    {t.title}
                </Typography>
                <Divider />
                <Stack gap={2}>
                    {userCart?.items?.map((item: CartItemProps) => (
                        <CartItem item={item} key={item.id} currency={userCart.currency as Currency} />
                    ))}
                    <Divider />
                    <FormContainer formContext={formContext} handleSubmit={onSubmit}>
                        <Stack gap={1}>
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
                            {userCart?.quantityPayments !== 1 && (
                                <Typography variant="h6">
                                    {t.quantityPayments} {userCart?.quantityPayments} шт.
                                </Typography>
                            )}
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="h6">{t.amount}</Typography>
                                <Stack direction="row" gap={1}>
                                    <Typography variant="h6">
                                        {user?.cart?.amount} {getTextCurrency(userCart?.currency as string)}
                                    </Typography>
                                    {locale === 'ru' && (
                                        <Typography variant="h6" color={theme.palette.grey.A400}>
                                            / {convertMoney(user?.cart?.amount as number, 'USD')}{' '}
                                            {getTextCurrency('USD')}
                                        </Typography>
                                    )}
                                </Stack>
                            </Box>
                            {error && <Alert severity="error">{t.errorMessage}</Alert>}
                            <Stack gap={2}>
                                {locale === 'ru' && (
                                    <LoadingButton
                                        type="submit"
                                        variant="contained"
                                        onClick={() => setValue('currency', Currency.RUB)}
                                        loading={loading}>
                                        {t.submitButtonRUB}
                                    </LoadingButton>
                                )}
                                <LoadingButton
                                    type="submit"
                                    variant="contained"
                                    onClick={() => setValue('currency', Currency.USD)}
                                    loading={loading}>
                                    {t.submitButtonUSD}
                                </LoadingButton>
                            </Stack>
                        </Stack>
                    </FormContainer>
                </Stack>
            </Stack>
        </Card>
    );
};
