import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

interface PasswordInputProps {
  field: {
    name: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  };
  form: any;
  label: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  field,
  form,
  label,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const error = form.errors[field.name];
  const touched = form.touched[field.name];

  return (
    <TextField
      size="medium"
      type={showPassword ? "text" : "password"}
      label={label}
      {...field}
      onChange={field.onChange}
      onBlur={field.onBlur}
      required={true}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
              tabIndex={-1}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      fullWidth
      error={touched && !!error}
      helperText={touched && error}
    />
  );
};

export default PasswordInput;
