/** @format */

import React, { ChangeEvent } from 'react';
import { SelectInputs } from '../../styles';

type Props = {
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  value: string;
  name: string;
  options: Array<Options>;
};

type Options = {
  value: string;
  name: string;
};

const Select: React.FC<Props> = ({ onChange, value, name, options }) => {
  return (
    <SelectInputs
      name={name}
      onChange={onChange}
      value={value}
      placeholder='Sort by'>
      {options.map((option) => (
        <option value={option.value}>{option.name}</option>
      ))}
    </SelectInputs>
  );
};

export default Select;
