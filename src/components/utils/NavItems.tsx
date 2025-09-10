
import PersonIcon from '@mui/icons-material/Person';
import CalculateIcon from '@mui/icons-material/Calculate';
import Diversity3Icon from '@mui/icons-material/Diversity3';

export const NavItems = [
  {
    label: "Contabilidad",
    path: "/accounting",
    icon: <CalculateIcon sx={{color: 'white', mr:2}}/>,
  },
  {
    label: "Clientes",
    path: "/customers",
    icon: <PersonIcon sx={{color: 'white', mr: 2}}/>,

  },
  {
    label: "Clientes en Sociedad",
    path: "/clientsSociety",
    icon: <Diversity3Icon sx={{color: 'white', mr: 2}}/>,
  },
];