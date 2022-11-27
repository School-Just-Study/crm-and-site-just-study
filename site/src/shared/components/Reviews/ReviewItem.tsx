import * as React from 'react';
import { FC } from 'react';
import { Avatar, Card, Typography } from '@mui/material';
import { stringAvatar } from '@src/shared/lib/textAvatar';
import Box from '@mui/material/Box';
import { formatNameStudent } from '@src/shared/lib/formatNameStudent';
import { ProductReview } from '@src/shared/lib/apollo/types';
import { format } from 'date-fns';
import { localeDate } from '@src/shared/lib/localeDate';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';

export const ReviewItem: FC<{ review: ProductReview }> = ({ review }) => {
    const { student, desc, createdAt } = review;
    const { locale } = useRouter();
    const localeForDate = localeDate(locale || 'en');
    const theme = useTheme();

    return (
        <Box p={1} pb={6}>
            <Card sx={{ height: 'auto', p: 3 }}>
                <Box display="grid" gridTemplateColumns={{ md: '1fr', lg: '80px 1fr' }} gap={2} alignItems="center">
                    {student?.avatar ? (
                        <Avatar src={student?.avatar?.image?.url} alt="photo student" sx={{ width: 80, height: 80 }} />
                    ) : (
                        <Avatar
                            {...stringAvatar(student?.name as string)}
                            alt={student?.name as string}
                            sx={{ width: 80, height: 80 }}
                        />
                    )}
                    <Box>
                        <Typography variant="h6" fontWeight="bold">
                            {formatNameStudent(student?.name as string)}
                        </Typography>
                        {student?.client?.profession && (
                            <Typography color={theme.palette.secondary.main}>{student.client.profession}</Typography>
                        )}
                    </Box>
                </Box>
                <Typography my={1}>{desc}</Typography>
                <Typography variant="body2" color={theme.palette.grey.A700}>
                    {format(new Date(createdAt), 'dd MMMM yyyy', { locale: localeForDate })}
                </Typography>
            </Card>
        </Box>
    );
};
