import { useEffect, useState } from 'react';
import { User } from '../../types/User';
import { Contact } from '../../types/Contact';
import ContactCard from './ContactCard';
import ContactForm from './ContactForm';
import PleaseLogin from '../Login/PleaseLogin';
import SearchBar from './SearchBar';
import FormControlLabel from '@mui/material/FormControlLabel';
import FloatingButton from '../Layout/FloatingButton';
import Checkbox from '@mui/material/Checkbox';
import * as utils from '../../utils/contactsHandlers';
import * as colors from '../../styles/mapColors';

const ContactBook = ({
  user,
  setUser
}: {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}) => {
  const [renderingTrigger, setRenderingTrigger] = useState(0);
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [allContacts, setAllContacts] = useState<Contact[]>([]);
  const [searchResult, setSearchResult] = useState<Contact[]>([]);
  const [sortedContacts, setSortedContacts] = useState<Contact[]>([]);
  const [showSorted, setShowSorted] = useState(false);

  const sortContacts = (): void => {
    const sortedContactsTmp = [...allContacts].sort(
      (a: Contact, b: Contact) => {
        const nameA = a.lastName.toLowerCase();
        const nameB = b.lastName.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }
    );
    setSortedContacts(sortedContactsTmp);
  };

  useEffect(() => {
    if (showSorted) {
      sortContacts();
    }
  }, [allContacts]);

  useEffect(() => {
    if (user._id) utils.getAllContacts({ user, setAllContacts });
  }, [user, renderingTrigger]);

  return !user._id ? (
    <PleaseLogin setUser={setUser} />
  ) : (
    <>
      <ContactForm
        open={contactFormOpen}
        setOpen={setContactFormOpen}
        user={user}
        setRenderingTrigger={setRenderingTrigger}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: '21px'
        }}
      >
        <SearchBar contacts={allContacts} setSearchResult={setSearchResult} />

        <FormControlLabel
          control={
            <Checkbox
              onClick={() => {
                sortContacts();
                setShowSorted(!showSorted);
              }}
              sx={{
                color: colors.MAP_ORANGE,
                '&.Mui-checked': {
                  color: colors.MAP_GREEN
                }
              }}
            />
          }
          label="Show sorted"
        />
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '21px'
        }}
      >
        <FloatingButton onClick={() => setContactFormOpen(true)} />
        {!allContacts.length && <h1>List of contacts is empty</h1>}
        {(searchResult.length
          ? searchResult
          : showSorted
          ? sortedContacts
          : allContacts
        ).map((contact) => (
          <div key={contact._id} style={{ flex: '0 0 calc(20% - 10.5px)' }}>
            <ContactCard
              user={user}
              contact={contact}
              setRenderingTrigger={setRenderingTrigger}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ContactBook;
