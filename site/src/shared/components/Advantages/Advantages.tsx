import { FC } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Card, Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { transition } from '@src/shared/lib/transition';
import { advantages } from '@translations/advantages';
import platform from './picture/platform.png';
import table from './picture/table.png';
import chat from './picture/chat.png';
import student from './picture/student.png';
import Flicking from '@egjs/react-flicking';
import Image from 'next/image';
import '@egjs/react-flicking/dist/flicking.css';

const images = [platform, student, chat, table];
const directions = ['column-reverse', 'column', 'column-reverse', 'column'];

export const Advantages: FC = () => {
    const theme = useTheme();
    const { locale } = useRouter();
    const t = transition(advantages, locale);

    return (
        <Box bgcolor={theme.palette.mode === 'dark' ? theme.palette.grey['900'] : theme.palette.grey.A200}>
            <Container maxWidth="xl">
                <Box py={4} px={{ xs: 0, md: 4 }} display="flex" flexDirection="column" alignItems="center">
                    <Typography variant="h2">{t.title}</Typography>
                </Box>
            </Container>
            <Flicking
                moveType="freeScroll"
                align={{ camera: '15%', panel: '40px' }}
                inputType={['touch', 'mouse', 'scroll']}
                preventClickOnDrag>
                {t.cards.map(({ title, desc }: { title: string; desc: string }, index: number) => (
                    <Card
                        key={index}
                        sx={{
                            m: 2,
                            p: 2,
                            mb: 6,
                            height: { xs: 430, sm: 481, lg: 634 },
                            width: { xs: 300, sm: 355, lg: 468 },
                            display: 'flex',
                            flexDirection: directions[index],
                            bgcolor:
                                theme.palette.mode === 'dark'
                                    ? theme.palette.grey['800']
                                    : theme.palette.background.paper
                        }}>
                        <Box p={2} position="relative" width="100%" height="100%" maxHeight="73%">
                            <Image
                                src={images[index]}
                                placeholder="blur"
                                alt={`${title}`}
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </Box>

                        <Box display="flex" flexDirection="column" justifyContent="center">
                            <Typography
                                fontSize={{ md: 20, lg: 26 }}
                                fontWeight="bold"
                                color={theme.palette.primary.main}>
                                {title}
                            </Typography>
                            <Typography fontSize={{ md: 18, lg: 22 }}>{desc}</Typography>
                        </Box>
                    </Card>
                ))}
            </Flicking>
        </Box>
    );
};
