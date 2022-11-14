import { FC } from 'react';
import { Box, Card, Container, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { transition } from '@src/shared/lib/transition';
import { useRouter } from 'next/router';
import { formLeadsList } from '@translations/formLeadsList';
import { IconImage } from '@shared/ui/IconImage/iconImage';
import { Form } from './Form';
import { formLeadsListIcons } from '@shared/components/FormForLeads/const';

export const FormForLeads: FC = () => {
    const theme = useTheme();
    const { locale } = useRouter();
    const t = transition(formLeadsList, locale);

    return (
        <Box bgcolor={theme.palette.primary.main} id="form-lead">
            <Container maxWidth="xl">
                <Box py={4} px={{ xs: 0, md: 4 }}>
                    <Card
                        sx={{
                            backgroundColor:
                                theme.palette.mode === 'dark' ? theme.palette.grey['800'] : theme.palette.grey['50']
                        }}>
                        <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} alignItems="center">
                            <Box py={3} px={{ xs: 2, md: 8 }}>
                                <Typography variant="h2">{t.title}</Typography>
                                <List sx={{ my: 3 }}>
                                    {t.list.map((text: string, index: number) => (
                                        <ListItem disablePadding sx={{ py: 1 }} key={index}>
                                            <IconImage type={formLeadsListIcons[index]} size="m" mr={1} />
                                            <ListItemText
                                                primaryTypographyProps={{ variant: 'subtitle1' }}
                                                primary={text}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                            <Card style={{ display: 'flex', alignItems: 'center', height: '100%', borderRadius: 20 }}>
                                <Box py={3} px={2} width="100%">
                                    <Form />
                                </Box>
                            </Card>
                        </Box>
                    </Card>
                </Box>
            </Container>
        </Box>
    );
};
