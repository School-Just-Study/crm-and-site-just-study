import { ImageWrapper } from "@shared/components/OGImage/styles";
import { useTheme } from "@mui/material/styles";

export const ImageContainer = () => {
    const theme = useTheme();

    return <ImageWrapper bgcolor={theme.palette.primary.main}></ImageWrapper>;
};
