import { Box, styled } from '@mui/system';

export const InstagramAvatar = styled(Box)`
    margin: auto;
    width: 170px;
    height: 170px;
    overflow: hidden;
    border: 6px solid transparent;
    border-radius: 50%;
    background-image: linear-gradient(white, white),
        radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285aeb 90%);
    background-origin: border-box;
    background-clip: content-box, border-box;

    div {
        position: relative;
        width: 100%;
        height: 100%;
        border: 4px solid white;
        border-radius: 50%;
        overflow: hidden;
    }
`;
