import React, { useState } from 'react';
import Select from 'react-select';

const SearchInputWithDropdown = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    onSelect(selectedOption);
  };

  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={handleSelectChange}
      isClearable
      placeholder="--please select--"
    />
  );
};

export default SearchInputWithDropdown;