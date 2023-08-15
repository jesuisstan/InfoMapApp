import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import * as colors from '../../styles/mapColors';

const FloatingButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '50px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1,
        color: colors.MAP_BLACK,
        '&:hover': {
          color: colors.MAP_WHITE
        }
      }}
    >
      <Fab
        sx={{
          bgcolor: colors.MAP_ORANGE_TRANS,
          '&:hover': {
            bgcolor: colors.MAP_BLACK
          }
        }}
        color="inherit"
        aria-label="edit"
        onClick={onClick}
        title="Add new contact"
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default FloatingButton;
