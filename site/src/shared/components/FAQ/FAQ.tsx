import * as React from 'react';
import { FC } from 'react';
import { AccordionDetails, AccordionSummary, Box, Card, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/router';
import { transition } from '@src/shared/lib/transition';
import { ILanguages } from '@src/shared/modules/constants';
import { faq } from '@translations/faq';
import { Help } from '@shared/components/FAQ/Help';
import { Faq } from '@src/shared/lib/apollo/types';
import { StyledAccordion } from '@shared/components/FAQ/styles';
import { useQuery } from '@apollo/client';
import { QUERY_FAQS } from '@shared/components/FAQ/query';

export const FAQ: FC = () => {
    const { locale } = useRouter();
    const t = transition(faq, locale as ILanguages);
    const theme = useTheme();
    const { data } = useQuery<{ faqs: Faq[] }>(QUERY_FAQS, { variables: { locale } });

    if (!data) return null;
    if (!data.faqs.length) return null;

    return (
        <Box bgcolor={theme.palette.mode === 'dark' ? theme.palette.grey['800'] : theme.palette.grey['100']}>
            <Container maxWidth="xl">
                <Box
                    py={4}
                    px={{ xs: 0, md: 4 }}
                    display="grid"
                    gridTemplateColumns={{ md: '1fr', lg: '350px 1fr' }}
                    gap={{ xs: 0, md: 4 }}>
                    <Box>
                        <Typography my={2} variant="h2">
                            {t.title}
                        </Typography>
                        <Box sx={{ display: { xs: 'none', md: 'initial' } }}>
                            <Help />
                        </Box>
                    </Box>

                    <Box>
                        {data?.faqs.map(({ title, desc }, index) => (
                            <StyledAccordion key={index} defaultExpanded={index === 0}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon fontSize="large" />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header">
                                    <Typography variant="h6" fontWeight="bold">
                                        {title}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography variant="h6">{desc}</Typography>
                                </AccordionDetails>
                            </StyledAccordion>
                        ))}
                        <Box mt={2} sx={{ display: { md: 'none' } }}>
                            <Card sx={{ p: 2 }}>
                                <Help />
                            </Card>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};
