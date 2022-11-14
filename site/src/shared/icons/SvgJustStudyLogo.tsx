import * as React from 'react';
import RootSvg, { RootSvgProps } from './RootSvg';
import { useTheme } from '@mui/material/styles';

export default function SvgJustStudyLogo(props: RootSvgProps) {
    const theme = useTheme();

    return (
        <RootSvg xmlns="http://www.w3.org/2000/svg" width={36} height={36} viewBox="0 0 36 36" fill="none" {...props}>
            <circle cx="18" cy="18" r="18" fill={theme.palette.primary.main} />
            <path
                d="M15.2557 29.0361C11.9508 29.0361 9.59016 27.9836 8.17377 25.8787L11.9508 22.2787C12.8557 23.6754 13.9869 24.3738 15.3443 24.3738C16.9574 24.3738 17.9508 23.4492 18.3246 21.6L20.1246 12.482H12.9836L13.8984 7.96721H26.8229L24.1377 21.2754C23.5869 24.0492 22.5934 26.0361 21.1574 27.2361C19.7213 28.4361 17.7541 29.0361 15.2557 29.0361Z"
                fill={theme.palette.background.default}
            />
        </RootSvg>
    );
}
