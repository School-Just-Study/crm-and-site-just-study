import * as React from 'react';
import { FC } from 'react';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import { unstable_debounce as debounce } from '@mui/utils';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import routes from '@src/routes';
import Link from '@shared/ui/Link';
import { useRouter } from 'next/router';
import { navigation } from '@translations/navigation';
import WorkIcon from '@mui/icons-material/Work';
import FlightIcon from '@mui/icons-material/Flight';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { transition } from '@src/shared/lib/transition';
import { ILanguages } from '@src/shared/modules/constants';
import { INavProps } from '@src/layouts/AppHeader';

const Navigation = styled('nav')(({ theme }) => ({
    '& ul': {
        padding: 0,
        margin: 0,
        listStyle: 'none',
        display: 'flex'
    },
    '& li': {
        color: theme.palette.text.primary,
        ...theme.typography.body2,
        fontWeight: 700,
        '& > a, & > div': {
            display: 'inline-block',
            color: 'inherit',
            textDecoration: 'none',
            padding: theme.spacing(1),
            borderRadius: theme.shape.borderRadius,
            '&:hover, &:focus': {
                backgroundColor:
                    theme.palette.mode === 'dark' ? theme.palette.primaryDark[700] : theme.palette.grey[50],
                color: theme.palette.mode === 'dark' ? theme.palette.primaryDark[200] : theme.palette.grey[700],
                // Reset on touch devices, it doesn't add specificity
                '@media (hover: none)': {
                    backgroundColor: 'initial'
                }
            }
        },
        '& > div': {
            cursor: 'default'
        }
    }
}));

// eslint-disable-next-line react/jsx-key
const COURSES_ICONS = [<AutoAwesomeIcon />, <FlightIcon />, <WorkIcon />];

type CoursesSubMenuProps = {
    icon?: React.ReactElement;
    name: React.ReactNode;
    description: React.ReactNode;
    href: string;
} & Omit<JSX.IntrinsicElements['a'], 'ref'>;

const CoursesSubMenu = React.forwardRef<HTMLAnchorElement, CoursesSubMenuProps>(function CourseSubMenu(
    { icon, name, description, href, ...props },
    ref
) {
    return (
        <Box
            component={Link}
            href={href}
            ref={ref}
            sx={{
                display: 'flex',
                alignItems: 'center',
                py: 2,
                '&:hover, &:focus': {
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark'
                            ? alpha(theme.palette.primaryDark[700], 0.4)
                            : theme.palette.grey[50],
                    outline: 'none',
                    '@media (hover: none)': {
                        backgroundColor: 'initial',
                        outline: 'initial'
                    }
                }
            }}
            {...props}>
            {icon && (
                <Box
                    sx={{
                        px: 2,
                        '& circle': {
                            fill: (theme) =>
                                theme.palette.mode === 'dark' ? theme.palette.primaryDark[700] : theme.palette.grey[100]
                        }
                    }}>
                    {icon}
                </Box>
            )}
            <div>
                <Typography color="text.primary" variant="body2" fontWeight={700}>
                    {name}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                    {description}
                </Typography>
            </div>
        </Box>
    );
});

export const HeaderNavBar: FC<INavProps> = ({ directions }) => {
    const { locale } = useRouter();
    const t = transition(navigation, locale as ILanguages);
    const [subMenuOpen, setSubMenuOpen] = React.useState<null | 'courses'>(null);
    const coursesMenuRef = React.useRef<HTMLAnchorElement | null>(null);

    const setSubMenuOpenDebounced = React.useMemo(() => debounce(setSubMenuOpen, 40), [setSubMenuOpen]);

    const setSubMenuOpenUndebounce = React.useMemo(
        () => (value: typeof subMenuOpen) => {
            setSubMenuOpenDebounced.clear();
            setSubMenuOpen(value);
        },
        [setSubMenuOpen, setSubMenuOpenDebounced]
    );

    React.useEffect(() => {
        return () => {
            setSubMenuOpenDebounced.clear();
        };
    }, [setSubMenuOpenDebounced]);

    return (
        <Navigation>
            <ul>
                {directions && directions.length > 0 && (
                    <li
                        onMouseEnter={() => setSubMenuOpenUndebounce('courses')}
                        onFocus={() => setSubMenuOpenUndebounce('courses')}
                        onMouseLeave={() => setSubMenuOpenDebounced(null)}
                        onBlur={() => setSubMenuOpenUndebounce(null)}>
                        <Link
                            href={routes.directions}
                            tabIndex={0}
                            ref={coursesMenuRef}
                            id="courses-menu"
                            fontWeight="bold"
                            aria-haspopup
                            aria-expanded={subMenuOpen === 'courses' ? 'true' : 'false'}>
                            {t.directions.title}
                        </Link>
                        <Popper
                            open={subMenuOpen === 'courses'}
                            anchorEl={coursesMenuRef.current}
                            transition
                            placement="bottom-start"
                            style={{
                                zIndex: 1200,
                                pointerEvents: subMenuOpen === 'courses' ? undefined : 'none'
                            }}>
                            {({ TransitionProps }) => (
                                <Fade {...TransitionProps} timeout={350}>
                                    <Paper
                                        variant="outlined"
                                        sx={(theme) => ({
                                            minWidth: 498,
                                            overflow: 'hidden',
                                            borderColor: theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.200',
                                            bgcolor:
                                                theme.palette.mode === 'dark' ? 'primaryDark.900' : 'background.paper',
                                            boxShadow: `0px 4px 20px ${
                                                theme.palette.mode === 'dark'
                                                    ? alpha(theme.palette.background.paper, 0.72)
                                                    : 'rgba(170, 180, 190, 0.3)'
                                            }`,
                                            '& ul': {
                                                margin: 0,
                                                padding: 0,
                                                listStyle: 'none'
                                            },
                                            '& li:not(:last-of-type)': {
                                                borderBottom: '1px solid',
                                                borderColor:
                                                    theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.100'
                                            },
                                            '& a': { textDecoration: 'none' }
                                        })}>
                                        <ul>
                                            {directions.map(({ id, slug, name }, index) => (
                                                <li role="none" key={id}>
                                                    <CoursesSubMenu
                                                        id={id}
                                                        href={`${routes.directions}/${slug}`}
                                                        icon={COURSES_ICONS[index]}
                                                        name={name}
                                                        description=""
                                                    />
                                                </li>
                                            ))}
                                        </ul>
                                    </Paper>
                                </Fade>
                            )}
                        </Popper>
                    </li>
                )}
                <li>
                    <Link href={routes.blog}>{t.blog.title}</Link>
                </li>
            </ul>
        </Navigation>
    );
};
