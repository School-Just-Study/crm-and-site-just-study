import { useForm } from 'react-hook-form';
import { FC, useEffect } from 'react';
import { AddReviewForm, AddReviewProps } from './types';
import { useUnit } from 'effector-react';
import { $user } from '@shared/storage/user';
import { Alert, Stack, Typography } from '@mui/material';
import { SelectElement, TextFieldElement } from 'react-hook-form-mui';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_COURSES } from '@shared/lib/apollo/CoursePage';
import { Query } from '@shared/lib/apollo/types';
import { formatData } from '@src/pages/Profile/StudentCabinet/AddReview/utils';
import { LoadingButton } from '@mui/lab';
import { CREATE_REVIEW } from '@src/pages/Profile/StudentCabinet/AddReview/query';
import { useSnackbar } from 'notistack';

export const AddReview: FC<AddReviewProps> = ({ productId, language }) => {
    const user = useUnit($user);
    const methods = useForm<AddReviewForm>({ defaultValues: { productId } });
    const { control, handleSubmit, setValue } = methods;
    const products = useQuery<Query>(QUERY_COURSES);
    const { enqueueSnackbar } = useSnackbar();
    const [createReview, { data, error, loading }] = useMutation(CREATE_REVIEW);

    useEffect(() => setValue('productId', productId || ''), [productId]);

    useEffect(() => {
        if (error)
            enqueueSnackbar(
                'Произошла ошибка при создании отзыва. Попробуйте еще раз или обратитесь в техническую поддержку.',
                { variant: 'error' }
            );
    }, [error]);

    const onSubmit = handleSubmit(async (data) => {
        const formatted = formatData(data, user?.id, language);
        await createReview({ variables: { data: formatted } });
    });

    return (
        <form onSubmit={onSubmit}>
            {data ? (
                <Alert>Отзыв успешно отправлен 🥳</Alert>
            ) : (
                <Stack gap={2}>
                    <SelectElement
                        control={control}
                        label="Курс"
                        name="productId"
                        options={products.data?.products || []}
                        labelKey="name"
                        required
                        validation={{ required: 'Выберите курс' }}
                        disabled={Boolean(productId)}
                    />
                    <TextFieldElement
                        control={control}
                        name="desc"
                        label="Текстовый отзыв"
                        required
                        validation={{ minLength: { value: 10, message: 'Минимальное 10 символов' } }}
                        multiline
                        minRows={4}
                    />
                    <Typography>или</Typography>
                    <TextFieldElement control={control} name="media" label="Ссылка на видео-отзыв (youtube)" />
                    <LoadingButton
                        type="submit"
                        css={{ maxWidth: 200 }}
                        variant="contained"
                        loading={loading}
                        disabled={loading}>
                        Отправить
                    </LoadingButton>
                </Stack>
            )}
        </form>
    );
};
