import * as React from 'react';
import { FC } from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Product } from '@src/shared/lib/apollo/types';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { transition } from '@src/shared/lib/transition';
import { coursePage } from '@translations/coursePage';
import { BuyButton } from '@src/pages/Course/BuyButton';
import { getCurrencyForLanguage } from '@src/shared/lib/currency';

export const AboutCourse: FC<{ product: Product }> = ({ product }) => {
    const { desc, subscriptions } = product;
    const theme = useTheme();
    const { locale } = useRouter();
    const t = transition(coursePage, locale);

    const idHideRecord = subscriptions && subscriptions.length > 0;

    return (
        <Box bgcolor={theme.palette.mode === 'dark' ? theme.palette.grey['900'] : theme.palette.grey.A200}>
            <Container maxWidth="xl">
                <Box py={4} px={{ xs: 0, md: 4 }}>
                    <Typography variant="h2">{t.courseInfo}</Typography>
                    {desc && (
                        <Box mt={4}>
                            <DocumentRenderer document={desc.document} />
                        </Box>
                    )}
                    <Stack mt={5} gap={2}>
                        {idHideRecord &&
                            subscriptions?.map(({ id, price, trial }) => (
                                <Stack key={id} direction="row" gap={1}>
                                    <Typography fontSize="x-large">Стоимость:</Typography>
                                    {trial ? (
                                        <>
                                            <Typography component="del" fontSize="x-large">
                                                {price} {getCurrencyForLanguage(locale as string)}
                                            </Typography>
                                            <Typography fontSize="x-large" fontWeight="bold">
                                                499 {getCurrencyForLanguage(locale as string)}
                                            </Typography>
                                        </>
                                    ) : (
                                        <Typography fontSize="x-large" fontWeight="bold">
                                            {price} {getCurrencyForLanguage(locale as string)}
                                        </Typography>
                                    )}
                                </Stack>
                            ))}
                        <Stack direction="row" gap={3}>
                            {idHideRecord ? (
                                <BuyButton product={product} />
                            ) : (
                                <Button
                                    sx={{ px: 3 }}
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    href="#form-lead">
                                    {t.buttonRecord}
                                </Button>
                            )}
                        </Stack>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
};
