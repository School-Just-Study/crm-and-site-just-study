import * as React from "react";
import { FC, MouseEventHandler, useState } from "react";
import { Box, Popover, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export const InfoPopover: FC = () => {
    const [anchorEl, setAnchorEl] = useState<SVGSVGElement | null>(null);

    const handlePopoverOpen: MouseEventHandler<SVGSVGElement> = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <InfoOutlinedIcon
                color="action"
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
                onClose={handlePopoverClose}
                disableRestoreFocus>
                <Box p={2} maxWidth={400}>
                    <Typography>
                        В нашей школе 1 урок - это полноценное занятие, на котором Вы уже получите новые знания и
                        начнете их применять на практике.
                    </Typography>
                </Box>
            </Popover>
        </>
    );
};
