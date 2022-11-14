import { Button, Card, Stack, Typography } from '@mui/material';

export const WidgetSupport = () => {
    const handleCLick = () => {
        window.open('https://t.me/juststudy_help_bot', '_blank');
    };

    return (
        <Card raised sx={{ p: 2, height: '100%', display: 'flex' }}>
            <Stack alignItems="flex-start">
                <Typography fontWeight="bold">🙋🏻‍♂️ Есть вопросы?</Typography>
                <Typography>Пишите нам в чате личного кабинета на портале или в Telegram</Typography>
                <Button sx={{ mt: 1 }} onClick={handleCLick}>
                    Написать в поддержку
                </Button>
            </Stack>
        </Card>
    );
};
