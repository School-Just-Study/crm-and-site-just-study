import 'styled-components';
import { Theme } from '@mui/material/styles/createTheme';

declare module 'styled-components' {
    // для темы Интервеб:
    export interface DefaultTheme extends Theme {}
}
