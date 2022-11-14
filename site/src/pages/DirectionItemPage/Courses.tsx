import { FC, useEffect, useState } from 'react';
import { Category, Direction, Product } from '@src/shared/lib/apollo/types';
import { useTheme } from '@mui/material/styles';
import { Box, Button, Card, Chip, Container, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { transition } from '@src/shared/lib/transition';
import { directionPage } from '@translations/directionPage';
import { ILanguages } from '@src/shared/modules/constants';
import routes from '@src/routes';
import Link from '@shared/ui/Link';
import { setFormLeadData } from '@shared/components/FormForLeads/model';

export const Courses: FC<Pick<Direction, 'products'>> = ({ products }) => {
    const theme = useTheme();
    const [categories, setCategories] = useState<Category[]>();
    const [category, setCategory] = useState('');
    const filter = (product: Product) => product?.category?.id === category;
    const { locale } = useRouter();
    const t = transition(directionPage, locale as ILanguages);

    useEffect(() => {
        const productCategories = products?.map((product: Product) => product.category) as Category[];

        if (productCategories) {
            const result = productCategories.reduce((previousValue: Category[], item) => {
                if (!previousValue.find((category) => category.id === item.id)) {
                    previousValue.push(item);
                }
                return previousValue;
            }, []);
            setCategories(result);
        }
    }, [products]);

    useEffect(() => {
        if (categories) {
            setCategory(categories[0].id);
        }
    }, [categories]);

    return (
        <Box bgcolor={theme.palette.mode === 'dark' ? theme.palette.grey['900'] : theme.palette.grey.A200} pb={4}>
            <Container maxWidth="xl">
                <Stack gap={3} py={4} px={{ xs: 0, md: 4 }} display="flex" flexDirection="column" alignItems="center">
                    <Typography variant="h2">{t.coursesTitle}</Typography>
                    <Stack gap={2} direction="row" flexWrap="wrap" justifyContent="center">
                        {categories?.map(({ name, id }) => (
                            <Chip
                                key={id}
                                label={name as string}
                                variant="outlined"
                                onClick={() => setCategory(id)}
                                sx={{
                                    border:
                                        id === category
                                            ? `2px solid ${theme.palette.warning.light}`
                                            : '2px solid transparent'
                                }}
                            />
                        ))}
                    </Stack>
                    {products?.filter(filter).map(({ id, name, description, tags }: Product) => (
                        <Card
                            key={id}
                            sx={{
                                px: { xs: 1, sm: 3, md: 6 },
                                py: 3,
                                bgcolor: theme.palette.warning.light,
                                color: theme.palette.grey['900'],
                                maxWidth: 800
                            }}>
                            <Box
                                display="grid"
                                gap={2}
                                gridTemplateColumns={{ xs: '1fr', md: '1fr 30%' }}
                                gridAutoFlow="dense">
                                <Box>
                                    <Typography mb={2} variant="h5" fontWeight="bold">
                                        {name}
                                    </Typography>
                                    <Typography>{description}</Typography>
                                    <Stack mt={2} direction="row" gap={2}>
                                        <Button
                                            variant="contained"
                                            sx={{ px: 3 }}
                                            color="info"
                                            onClick={() => setFormLeadData(`Курс: ${name}`)}
                                            href="#form-lead">
                                            {t.coursesButton}
                                        </Button>
                                        <Link href={`${routes.course}${id}`}>{t.linkForCourse}</Link>
                                    </Stack>
                                </Box>
                                <Stack mx={{ xs: 4, sm: 0 }} alignItems={{ sm: 'end' }} gridRow={{ xs: 1, md: 'auto' }}>
                                    {tags?.map(({ id, name }) => (
                                        <Chip key={id} label={name} />
                                    ))}
                                </Stack>
                            </Box>
                        </Card>
                    ))}
                </Stack>
            </Container>
        </Box>
    );
};
