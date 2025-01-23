import { Paper, styled } from '@mui/material';
import { useTheme } from '../themeContext';

const CustomPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'darkMode',
})<{ darkMode?: boolean }>(({ darkMode }) => ({
  backgroundColor: darkMode ? '#222e3c' : '#fff',
  color: darkMode ? '#fff' : '#000',
}));

export default function StyledPaper(props: any) {
  const { darkMode } = useTheme();
  return <CustomPaper darkMode={darkMode} {...props} />;
} 