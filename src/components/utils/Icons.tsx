import PaymentIcon from "@mui/icons-material/Payment";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  iconLargeStyle,
  iconLargeStyleVertical,
  iconLargeStyleWhite,
  iconSmallStyle,
} from "../../constants";
import LoginIcon from "@mui/icons-material/Login";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import LockOpenIcon from '@mui/icons-material/LockOpen';export const Icons = {
  edit: <EditOutlinedIcon sx={iconLargeStyle} />,
  payment: <PaymentIcon sx={iconLargeStyle} />,
  add: <AddIcon sx={iconSmallStyle} />,
  visibility: <VisibilityIcon sx={iconSmallStyle} />,
  editWhite: <EditOutlinedIcon sx={iconLargeStyleWhite} />,
  addWhite: <AddIcon sx={iconLargeStyleWhite} />,
  loginIcon: <LoginIcon sx={iconLargeStyleWhite} />,
  pdfIcon: <PictureAsPdfIcon sx={iconLargeStyle} />,
  keyIcon: <LockOpenIcon sx={iconLargeStyle} />,
  keyIconvertical: <LockOpenIcon sx={iconLargeStyleVertical} />,
};
