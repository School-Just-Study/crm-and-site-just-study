import { FC } from 'react';
import fire from './fire.png';
import giftbox from './giftbox.png';
import highVoltage from './high-voltage.png';
import openBook from './open-book.png';
import alarmClock from './alarm-clock.png';
import Image from 'next/image';
import { Box } from '@mui/material';
import { BoxProps } from '@mui/material/Box/Box';

type TSizeIcon = 'm' | 'l' | 'xl';
export type TTypeIcon = 'fire' | 'giftbox' | 'high-voltage' | 'open-book' | 'alarm-clock';

interface IIconImage extends BoxProps {
    type: TTypeIcon;
    size?: TSizeIcon;
}

const calcSizeIcon = (size: TSizeIcon) => {
    switch (size) {
        case 'm':
        default:
            return { width: 35, height: 35 };
    }
};

const typeOfImageIcon = (type: TTypeIcon) => {
    switch (type) {
        case 'fire':
            return fire;
        case 'giftbox':
            return giftbox;
        case 'high-voltage':
            return highVoltage;
        case 'open-book':
            return openBook;
        case 'alarm-clock':
            return alarmClock;
    }
};

export const IconImage: FC<IIconImage> = ({ size = 'm', type, ...boxProps }) => {
    const { width, height } = calcSizeIcon(size);
    const src = typeOfImageIcon(type);
    return (
        <Box {...boxProps}>
            <Image width={width} height={height} src={src} alt={`icon ${type}`} />
        </Box>
    );
};
