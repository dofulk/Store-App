import { Autocomplete, TextField } from "@mui/material";
import React from "react";

import { Controller } from "react-hook-form";
import { states } from '../../data/States';
const StateSelect = ({ onChange: ignored, control }) => {
  return (
    <Controller
      render={({ onChange, ...props }) => (
        <Autocomplete
          options={states}
          getOptionLabel={option => option.label}
          renderInput={params => (
            <TextField
              {...params}
              label="Choose a country"
              variant="outlined"
            />
          )}
          onChange={(e, data) => onChange(data)}
          {...props}
        />
      )}
      onChange={([, data]) => data}
      defaultValue={{ code: "AF", label: "Afghanistan", phone: "93" }}
      name="country"
      control={control}
    />
  );
}

export default StateSelect
