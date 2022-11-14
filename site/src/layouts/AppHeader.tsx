import { alpha, styled } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import SvgJustStudyLogo from '@src/shared/icons/SvgJustStudyLogo';
import ThemeModeToggle from '@shared/./components/Header/ThemeModeToggle';
import routes from '@src/routes';
import { HeaderNavDropdown } from '@shared/components/Header/HeaderNavDropdown';
import { HeaderNavBar } from '@shared/components/Header/HeaderNavBar';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { Direction } from '@src/shared/lib/apollo/types';
import { QUERY_DIRECTIONS_NAVBAR } from '@src/shared/lib/apollo/directionNavBar';

const Header = styled('header')(({ theme }) => ({
    position: 'sticky',
    top: 0,
    transition: theme.transitions.create('top'),
    zIndex: theme.zIndex.appBar,
    backdropFilter: 'blur(20px)',
    boxShadow: `inset 0px -1px 1px ${
        theme.palette.mode === 'dark' ? theme.palette.primaryDark[700] : theme.palette.grey[100]
    }`,
    backgroundColor:
        theme.palette.mode === 'dark' ? alpha(theme.palette.primaryDark[900], 0.72) : 'rgba(255,255,255,0.72)'
}));

const HEIGHT = 56;

export interface INavProps {
    directions?: Direction[];
}

export default function AppHeader() {
    const { locale, push } = useRouter();
    const { data } = useQuery<INavProps>(QUERY_DIRECTIONS_NAVBAR, {
        variables: { lang: locale },
        fetchPolicy: 'cache-and-network'
    });

    return (
        <Header>
            <GlobalStyles
                styles={{
                    ':root': {
                        '--MuiDocs-header-height': `${HEIGHT}px`
                    }
                }}
            />
            <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', minHeight: HEIGHT }}>
                <SvgJustStudyLogo
                    width={30}
                    sx={{ lineHeight: 0, mr: 2, cursor: 'pointer' }}
                    onClick={() => push(routes.home)}
                />

                <Box sx={{ display: { md: 'none' } }}>
                    <HeaderNavDropdown directions={data?.directions} />
                </Box>
                <Box sx={{ display: { xs: 'none', md: 'initial' } }}>
                    <HeaderNavBar directions={data?.directions} />
                </Box>
                <Box sx={{ ml: 'auto' }} />
                <Stack direction="row" spacing={1}>
                    <ThemeModeToggle />
                </Stack>
            </Container>
        </Header>
    );
}
