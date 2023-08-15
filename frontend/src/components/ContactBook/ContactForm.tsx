import { SetStateAction, Dispatch, useState } from 'react';
import { Drawer } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { User } from '../../types/User';
import { Contact } from '../../types/Contact';
import { inputs } from '../../types/inputs';
import { FormValues } from '../../types/FormValues';
import FormInput from './FormInput';
import SaveIcon from '@mui/icons-material/Save';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import * as utils from '../../utils/contactsHandlers';
import * as colors from '../../styles/mapColors';
import * as MUI from '../../styles/MUIstyles';
import styles from '../../styles/ContactForm.module.css';
import saveAlert from '../../utils/saveAlert';

const ContactForm = ({
  user,
  open,
  setOpen,
  setRenderingTrigger,
  contact
}: {
  user: User;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setRenderingTrigger: React.Dispatch<React.SetStateAction<number>>;
  contact?: Contact;
}) => {
  const [loadingSave, setLoadingSave] = useState(false);
  const [values, setValues] = useState<FormValues>({
    firstName: contact?.firstName ?? '',
    lastName: contact?.lastName ?? '',
    email: contact?.email ?? '',
    birthday: contact?.birthday ?? '',
    comment: contact?.comment ?? ''
  });

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    setLoadingSave(true);

    const newContact: Contact = {
      ...values,
      userID: user._id,
      _id: contact?._id
    };

    if (contact) {
      await utils.updateContact(newContact);
    } else {
      await utils.createContact(newContact);
      setValues({
        firstName: '',
        lastName: '',
        email: '',
        birthday: '',
        comment: ''
      });
    }
    setLoadingSave(false);
    setRenderingTrigger((prev) => prev + 1);
    saveAlert();
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.name !== 'comment'
      ? setValues({
          ...values,
          [event.target.name]: event.target.value.replace(/\s/g, '')
        })
      : setValues({
          ...values,
          [event.target.name]: event.target.value
        });
  };

  return (
    <Drawer
      PaperProps={{
        style: {
          backgroundColor: colors.MAP_WHITE
        }
      }}
      anchor="right"
      open={open}
      onClose={handleDrawerToggle}
    >
      <form onSubmit={handleSubmit} className={styles.formList}>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name as keyof FormValues]}
            onChange={onChange}
          />
        ))}
        <LoadingButton
          type="submit"
          loading={loadingSave}
          startIcon={contact ? <SaveAsIcon /> : <SaveIcon />}
          variant="contained"
          color="inherit"
          sx={MUI.LoadButton}
        >
          {contact ? 'Modify current' : 'Create new'}
        </LoadingButton>
        <div className={styles.closeArrow}>
          <ArrowForwardIosIcon onClick={handleDrawerToggle} />
        </div>
      </form>
    </Drawer>
  );
};

export default ContactForm;
