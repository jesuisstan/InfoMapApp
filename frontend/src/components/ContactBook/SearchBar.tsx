import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/joy/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import * as colors from '../../styles/mapColors';
import * as utils from '../../utils/contactsHandlers';
import { Contact } from '../../types/Contact';

const SearchBar = ({
  contacts,
  setSearchResult
}: {
  contacts: Contact[];
  setSearchResult: React.Dispatch<React.SetStateAction<Contact[]>>;
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState('');

  const handleTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (newValue.match(/^[A-Za-z]*$/)) {
      setSearchValue(newValue);
      setError('');
    } else {
      setError('Allowed: A-Z a-z');
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (searchValue && !error) {
      let result: Contact[] = utils.searchContactsByLastName(
        contacts,
        searchValue
      );
      result.length ? setSearchResult(result) : setSearchValue('');
    }
  };

  useEffect(() => {
    if (searchValue === '') {
      setSearchResult([]);
    }
  }, [searchValue]);

  return (
    <div style={{ paddingBottom: '50px' }}>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <FormControl>
            <TextField
              sx={{ fontFamily: '"Montserrat", sans-serif' }}
              id="search-bar"
              required
              label="Find by Lastname"
              variant="standard"
              placeholder="Search..."
              size="small"
              value={searchValue}
              inputProps={{
                'aria-label': 'search',
                minLength: 1,
                maxLength: 20,
                style: {
                  color: colors.MAP_BLACK,
                  fontFamily: '"Montserrat", sans-serif',
                  minWidth: '250px'
                }
              }}
              InputLabelProps={{
                style: {
                  color: colors.MAP_BLACK,
                  fontFamily: '"Montserrat", sans-serif'
                }
              }}
              error={!!error}
              helperText={error}
              onChange={handleTextInput}
            />
          </FormControl>
          <IconButton type="submit" aria-label="search">
            <SearchIcon
              fontSize="medium"
              sx={{
                color: colors.MAP_ORANGE,
                '&:hover': {
                  color: colors.MAP_BLACK
                }
              }}
            />
          </IconButton>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
