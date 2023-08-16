import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import * as MUI from '../../styles/MUIstyles';

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
      <FormControl size="small" sx={MUI.selector}>
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
