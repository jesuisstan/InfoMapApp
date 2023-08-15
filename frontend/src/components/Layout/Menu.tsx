import { NavLink, useNavigate } from 'react-router-dom';
import { User } from '../../types/User';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuDrawer from './MenuDrawer';
import styles from '../../styles/Menu.module.css';
import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import * as utils from '../../utils/authHandlers';
import * as MUI from '../../styles/MUIstyles';
import * as colors from '../../styles/mapColors';

const Menu = ({
  user,
  setUser
}: {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}) => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isUltraSmallScreen = useMediaQuery('(max-width:350px)');
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);

  const authenticate = async () => {
    if (user._id) {
      utils.logout(setUser);
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <div>
      <nav className={styles.navbar}>
        {isSmallScreen ? (
          <IconButton
            sx={{ marginLeft: '42px' }}
            color="inherit"
            onClick={() => setMenuDrawerOpen(!menuDrawerOpen)}
          >
            <MenuIcon style={{ fill: colors.MAP_BLACK }} />
          </IconButton>
        ) : (
          <div className={styles.left}>
            <NavLink to=".">Home</NavLink>
            <NavLink to="contactbook">Contact Book</NavLink>
          </div>
        )}
        <div className={styles.right}>
          <div className={styles.userData}>
            {!isSmallScreen && user.nickname}
            {!isUltraSmallScreen && (
              <Avatar
                alt=""
                src={
                  user.nickname ? require('../../assets/loggedInUser.png') : ''
                }
              />
            )}
          </div>
          <div>
            <LoadingButton
              startIcon={user._id ? <LogoutIcon /> : <LoginIcon />}
              variant="contained"
              color="inherit"
              sx={MUI.LoadButton}
              onClick={() => {
                authenticate();
              }}
            >
              {user._id ? 'Logout' : 'Login'}
            </LoadingButton>
          </div>
        </div>
        <MenuDrawer open={menuDrawerOpen} setOpen={setMenuDrawerOpen} />
      </nav>
    </div>
  );
};

export default Menu;
