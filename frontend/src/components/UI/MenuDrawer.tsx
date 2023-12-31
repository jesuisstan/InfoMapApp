import { SetStateAction, Dispatch } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import * as colors from '../../styles/mapColors';
import * as MUI from '../../styles/MUIstyles';

const MenuDrawer = ({
  open,
  setOpen
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      PaperProps={{
        style: {
          backgroundColor: colors.MAP_BLUE_TRANS
        }
      }}
      anchor="left"
      open={open}
      onClose={handleDrawerToggle}
    >
      <List sx={{ color: colors.MAP_BLACK }}>
        <ListItem
          onClick={() => {
            navigate('/');
            setOpen(false);
          }}
        >
          <ListItemText primary="Home" disableTypography sx={MUI.burgerItem} />
        </ListItem>
        <ListItem
          onClick={() => {
            navigate('/infomap');
            setOpen(false);
          }}
        >
          <ListItemText
            primary="Info Map"
            disableTypography
            sx={MUI.burgerItem}
          />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default MenuDrawer;
