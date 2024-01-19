import React, { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

// Option inteface
interface Option {
  value: string;
  label: string;
}

// Dropdown props interface
interface DropdownProps {
  options: Option[];
  onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  // Control visibility of the dropdown
  const [visible, setVisible] = useState(false);
  // Selected option state
  const [selectedOption, setSelectedOption] = useState<string | null>(options[0].value);

  // Call the callback onSelect from parent
  useEffect(()=>{
    onSelect(selectedOption)
  },[selectedOption])

  return (
      <DropDownPicker
      open={visible}
      value={selectedOption}
      items={options}
      setOpen={setVisible}
      setValue={setSelectedOption}
    />
  );
};


export default Dropdown
