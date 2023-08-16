import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//import styles from './Game.module.css';

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
      <FormControl
        size="small"
        sx={{
          m: 0.5,
          backgroundColor: 'whitesmoke',
          minWidth: 150,
          border: '0px solid #f5f5f5ee',
          borderRadius: '2px'
          //zIndex: -1
        }}
      >
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
