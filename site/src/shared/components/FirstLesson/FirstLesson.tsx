import * as React from 'react';
import { FC } from 'react';
import { useQuery } from '@apollo/client';
import { Subscription } from '@src/shared/lib/apollo/types';
import { Box, Card, Container, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { QUERY_TRIAL_LESSON } from '@shared/components/FirstLesson/query';
import { IconImage } from '@shared/ui/IconImage/iconImage';
import { formLeadsListIcons } from '@shared/components/FormForLeads/const';
import { useRouter } from 'next/router';
import { transition } from '@src/shared/lib/transition';
import { successPage } from '@translations/successPage';
import { ILanguages } from '@src/shared/modules/constants';
import { useTheme } from '@mui/material/styles';
import { InfoPopover } from '@shared/components/FirstLesson/InfoPopover';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import { BuyButtonItem } from '@src/pages/Course/BuyButtonItem';
import { CurrencyAmount } from '@shared/components/CurrencyAmount';

export const FirstLesson: FC = () => {
    const { data } = useQuery<{ subscriptions: Subscription[] }>(QUERY_TRIAL_LESSON);
    const { locale } = useRouter();
    const t = transition(successPage, locale as ILanguages);
    const theme = useTheme();

    return (
        <Container maxWidth="md">
            <Card sx={{ bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey['900'] : theme.palette.grey.A200 }}>
                <Box pt={4} px={{ xs: 2, md: 4 }}>
                    <Typography variant="h2">
                        Оплатите первый урок со скидкой прямо сейчас и получите в подарок:
                    </Typography>
                    <List sx={{ my: 2 }}>
                        {t?.list?.map((text: string, index: number) => (
                            <ListItem disablePadding sx={{ py: 1 }} key={index}>
                                <IconImage type={formLeadsListIcons[index]} size="m" mr={1} />
                                <ListItemText primaryTypographyProps={{ variant: 'subtitle1' }} primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
                {data?.subscriptions?.map((subscription) => {
                    const { id, price, desc, priceUSD } = subscription;
                    return (
                        <Card key={id}>
                            <Stack py={3} px={{ xs: 2, md: 4 }} gap={2} justifyContent="left" alignItems="flex-start">
                                <Typography variant="h2" borderBottom="3px solid #2750C5" textAlign="left">
                                    Первый урок
                                </Typography>
                                <CurrencyAmount amount={price!} discount={499} amountUSD={priceUSD!} discountUSD={9} />
                                <Stack direction="row" alignItems="center" gap={1}>
                                    <Typography color={theme.palette.grey.A700}>Почему первый урок платный?</Typography>
                                    <InfoPopover />
                                </Stack>
                                <Box textAlign="left">
                                    {desc?.document && <DocumentRenderer document={desc.document} />}
                                </Box>
                                <BuyButtonItem key={id} subscription={subscription} />
                            </Stack>
                        </Card>
                    );
                })}
            </Card>
        </Container>
    );
};
