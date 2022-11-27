import { useRouter } from 'next/router';
import { transition } from '@src/shared/lib/transition';
import { faq } from '@translations/faq';
import { ILanguages } from '@src/shared/modules/constants';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import * as React from 'react';

export const Help = () => {
    const { locale } = useRouter();
    const t = transition(faq, locale as ILanguages);

    return (
        <>
            <Typography mb={2} variant="h6">
                {t.help}
            </Typography>
            <Stack spacing={2} direction="row">
                <IconButton
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.instagram.com/goshanchico/"
                    aria-label="instagram"
                    title="Instagram"
                    size="small">
                    <InstagramIcon fontSize="small" />
                </IconButton>
                <IconButton
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://t.me/juststudy_help_bot"
                    aria-label="telegram"
                    title="Telegram"
                    size="small">
                    <TelegramIcon fontSize="small" />
                </IconButton>
            </Stack>
        </>
    );
};
