import { FC } from 'react';
import { Card, Stack, Typography } from '@mui/material';
import { Direction } from '@src/shared/lib/apollo/types';
import { useTheme } from '@mui/material/styles';
import routes from '@src/routes';
import Link from '@shared/ui/Link';
import { useRouter } from 'next/router';
import { transition } from '@src/shared/lib/transition';
import { directionsPage } from '@translations/directionsPage';

export const CourseCard: FC<{ direction: Direction }> = ({ direction }) => {
    const { push } = useRouter();
    const theme = useTheme();
    const { name, image, description, slug } = direction;
    const { locale } = useRouter();
    const t = transition(directionsPage, locale);

    return (
        <Card sx={{ width: '100%', cursor: 'pointer' }} onClick={() => push(`${routes.directions}/${slug}`)}>
            {image && (
                <Card sx={{ height: 270, position: 'relative', bgcolor: theme.palette.warning.light }}>
                    <img
                        src={image.url}
                        alt={name as string}
                        width="100%"
                        height="100%"
                        style={{ objectFit: 'contain' }}
                    />
                </Card>
            )}
            <Stack gap={2} p={2}>
                <Typography variant="h4" fontWeight="bold">
                    {name}
                </Typography>
                <Typography fontSize="larger">{description}</Typography>
                <Link href={`${routes.directions}/${slug}`}>{t.courseButton}</Link>
            </Stack>
        </Card>
    );
};
