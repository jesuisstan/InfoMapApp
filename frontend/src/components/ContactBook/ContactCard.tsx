import { useState } from 'react';
import ContactForm from './ContactForm';
import { User } from '../../types/User';
import { Contact } from '../../types/Contact';
import { CardActionArea, CardActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import * as utils from '../../utils/contactsHandlers';
import * as colors from '../../styles/mapColors';
import * as MUI from '../../styles/MUIstyles';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

const ContactCard = ({
  user,
  contact,
  setRenderingTrigger
}: {
  user: User;
  contact: Contact;
  setRenderingTrigger: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDeleteClick = async () => {
    await utils.deleteContact(contact);
    setRenderingTrigger((prev) => prev + 1);
  };

  return (
    <div>
      <Card sx={MUI.contactCard}>
        <CardActionArea>
          <CardContent onClick={() => setOpen(true)}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ fontFamily: '"Montserrat", sans-serif' }}
            >
              {contact.lastName}
              <br />
              {contact.firstName}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions disableSpacing>
          <IconButton
            aria-label="delete"
            title="Delete contact"
            onClick={handleDeleteClick}
          >
            <DeleteIcon sx={{ color: colors.MAP_ORANGE }} />
          </IconButton>
          <IconButton
            aria-label="modify"
            title="Edit contact"
            onClick={() => setOpen(true)}
          >
            <DriveFileRenameOutlineIcon sx={{ color: colors.MAP_GREEN }} />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            title="Show content"
          >
            <ExpandMoreIcon sx={{ color: colors.MAP_GREEN }} />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography
              variant="body1"
              textAlign={'left'}
              sx={{ fontFamily: '"Montserrat", sans-serif' }}
            >
              Email: {contact.email}
              <br />
              {contact.birthday && (
                <>
                  Birthday: {contact.birthday}
                  <br />
                </>
              )}
              {contact.comment
                ? `Comment: ${contact.comment}`
                : '*no comment left'}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
      <ContactForm
        user={user}
        open={open}
        setOpen={setOpen}
        setRenderingTrigger={setRenderingTrigger}
        contact={contact}
      />
    </div>
  );
};

export default ContactCard;
