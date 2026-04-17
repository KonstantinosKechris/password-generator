import Slider from "@mui/material/Slider";
import "./PasswordLengthControl.scss";

function PasswordLengthControl({ passwordLength, setPasswordLength }) {
  return (
    <div>
      <div className="character-length-wrapper">
        <p className="character-length-text">Character Length</p>
        <p className="character-length">{passwordLength}</p>
      </div>
      <Slider
        min={6}
        max={18}
        step={1}
        value={passwordLength}
        onChange={(e, newValue) => setPasswordLength(newValue)}
        sx={{
          color: "#18171F",
        }}
      />
    </div>
  );
}

export default PasswordLengthControl;
