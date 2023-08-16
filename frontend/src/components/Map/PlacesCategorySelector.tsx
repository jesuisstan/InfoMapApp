import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import * as MUI from '../../styles/MUIstyles';

const PlacesCategorySelector = ({
  placesCategory,
  setPlacesCategory
}: {
  placesCategory: string;
  setPlacesCategory: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div>
      <p>Category: </p>
      <FormControl size="small" sx={MUI.selector}>
        <Select
          value={placesCategory}
          onChange={(event) => setPlacesCategory(event.target.value as string)}
        >
          <MenuItem value={'restaurants'}>restaurants</MenuItem>
          <MenuItem value={'pubs'}>pubs</MenuItem>
          <MenuItem value={'barbershops'}>barbershops</MenuItem>
          <MenuItem value={'supermarkets'}>supermarkets</MenuItem>
          <MenuItem value={'malls'}>malls</MenuItem>
          <MenuItem value={'hospitals'}>hospitals</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default PlacesCategorySelector;
