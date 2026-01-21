import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const PasswordCheckbox = ({ label, checked, onChange }) => {
  return (
    <div className="checkbox-container">
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={onChange}
            sx={{
              color: "white",
              "&.Mui-checked": {
                color: "#a4ffaf",
              },
            }}
          />
        }
        label={label}
      />
    </div>
  );
};

export default PasswordCheckbox;
