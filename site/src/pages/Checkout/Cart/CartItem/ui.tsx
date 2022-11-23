import * as React from 'react';
import { FC, MouseEventHandler, useEffect, useState } from 'react';
import { Avatar, Box, Card, Popover, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import { smiles } from './const';
import { CartItemProps } from './types';
import { CurrencyAmount } from '@shared/components/CurrencyAmount';

export const CartItem: FC<CartItemProps> = ({ item, hideImage }) => {
    const theme = useTheme();
    const { subscription, service, originalPrice, price, priceUSD, originalPriceUSD } = item;
    const [numberSmile, setNumberSmile] = useState<number>(0);
    const [anchorEl, setAnchorEl] = useState<SVGSVGElement | null>(null);

    const title = subscription?.name || service?.name;
    const description = subscription?.desc?.document || service?.description?.document;

    const handlePopoverOpen: MouseEventHandler<SVGSVGElement> = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    useEffect(() => setNumberSmile(Math.floor(Math.random() * smiles.length)), []);

    const gridTemplateColumns = hideImage ? 'auto 20%' : '20% auto 20%';

    return (
        <Card
            sx={{
                display: 'grid',
                gridTemplateColumns,
                bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey['900'] : theme.palette.grey.A100
            }}>
            {!hideImage && (
                <Box position="relative" borderRadius="20%">
                    <Avatar
                        variant="square"
                        sx={{
                            width: '100%',
                            height: '100%',
                            fontSize: '2.25em',
                            bgcolor: theme.palette.action.selected
                        }}>
                        {smiles[numberSmile]}
                    </Avatar>
                </Box>
            )}
            <Box m={{ xs: 1, sm: 3 }}>
                <Typography>{title}</Typography>
                <CurrencyAmount
                    amount={originalPrice!}
                    amountUSD={originalPriceUSD!}
                    discount={price!}
                    discountUSD={priceUSD!}
                    variant="body1"
                />
            </Box>
            {description && description.length >= 1 && (
                <>
                    <InfoIcon
                        color="action"
                        style={{ margin: 'auto' }}
                        aria-owns={open ? 'mouse-over-popover' : undefined}
                        aria-haspopup="true"
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                    />
                    <Popover
                        id="mouse-over-popover"
                        sx={{
                            pointerEvents: 'none'
                        }}
                        open={open}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right'
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus>
                        <Box px={1}>
                            <DocumentRenderer document={description} />
                        </Box>
                    </Popover>
                </>
            )}
        </Card>
    );
};
