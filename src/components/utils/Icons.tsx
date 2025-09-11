import PaymentIcon from "@mui/icons-material/Payment";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { iconLargeStyle, iconLargeStyleWhite, iconSmallStyle } from "../../constants";
import LoginIcon from "@mui/icons-material/Login";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export const Icons = {
  edit: <EditOutlinedIcon sx={iconLargeStyle}/>,
  payment: <PaymentIcon sx={iconLargeStyle}/>,
  add: <AddIcon sx={iconSmallStyle}/>,
  visibility: <VisibilityIcon sx={iconSmallStyle}/>,
  editWhite: <EditOutlinedIcon sx={iconLargeStyleWhite} />,
  addWhite:<AddIcon sx={iconLargeStyleWhite}/>,
  loginIcon: <LoginIcon sx={iconLargeStyleWhite}/>
};
