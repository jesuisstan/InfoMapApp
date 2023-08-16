import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//import styles from './Game.module.css';

const VisibleAmountSelector = ({
  visibleAmount,
  setVisibleAmount
}: {
  visibleAmount: number;
  setVisibleAmount: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div>
      <p>Show on map: </p>
      <FormControl
        size="small"
        sx={{
          m: 0.5,
          backgroundColor: 'whitesmoke',
          minWidth: 150,
          border: '0px solid #f5f5f5ee',
          borderRadius: '2px'
        }}
      >
        <Select
          value={visibleAmount}
          onChange={(event) => setVisibleAmount(event.target.value as number)}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={40}>40</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default VisibleAmountSelector;
