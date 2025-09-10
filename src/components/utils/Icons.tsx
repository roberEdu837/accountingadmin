import EditIcon from "@mui/icons-material/Edit";
import PaymentIcon from "@mui/icons-material/Payment";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { iconLargeStyle, iconLargeStyleWhite, iconSmallStyle } from "../../constants";

export const Icons = {
  edit: <EditIcon sx={iconLargeStyle}/>,
  payment: <PaymentIcon sx={iconLargeStyle}/>,
  add: <AddIcon sx={iconSmallStyle}/>,
  visibility: <VisibilityIcon sx={iconSmallStyle}/>,
  editWhite: <EditIcon sx={iconLargeStyleWhite} />,
  addWhite:<AddIcon sx={iconLargeStyleWhite}/>
};
