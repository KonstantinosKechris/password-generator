import { useState } from "react";
import "./App.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Slider from "@mui/material/Slider";
import { red } from "@mui/material/colors";

function App() {
  const [Password, setPassWord] = useState("kotsos");
  const [passwordLength, setPasswordLength] = useState(0);
  const [containUppercase, setContainUppercase] = useState(false);
  const [containLowercase, setContainLowercase] = useState(false);
  const [containNumbers, setContainNumbers] = useState(false);
  const [containSymbols, setContainSymbols] = useState(false);

  const availableChars =
    (containUppercase ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "") +
    (containLowercase ? "abcdefghijklmnopqrstuvwxyz" : "") +
    (containNumbers ? "0123456789" : "") +
    (containSymbols ? "~!@#$%^&*" : "");

  const maxPasswordLength = availableChars.length;

  const OnGeneratePasswordClicked = () => {
    if (!availableChars) return;

    let password = "";
    for (let i = 0; i < passwordLength; i++) {
      const index = Math.floor(Math.random() * availableChars.length);
      password += availableChars[index];
    }
    setPassWord(password);
  };

  return (
    <>
      <div className="main-container">
        <h2 className="heading">Password Generator</h2>

        <div className="password-section">
          <p>{Password}</p>
          <div>
            <ContentCopyIcon className="copy-icon" />
          </div>
        </div>

        <div className="password-specs-section">
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

          <div className="checkbox-container">
            <FormControlLabel
              control={
                <Checkbox
                  checked={containUppercase}
                  onChange={(e) => setContainUppercase(e.target.checked)}
                  sx={{
                    color: "white",
                    "&.Mui-checked": {
                      color: "#a4ffaf",
                    },
                  }}
                />
              }
              label="Include Uppercase Letters"
            />
          </div>

          <div className="checkbox-container">
            <FormControlLabel
              control={
                <Checkbox
                  checked={containLowercase}
                  onChange={(e) => setContainLowercase(e.target.checked)}
                  sx={{
                    color: "white",
                    "&.Mui-checked": {
                      color: "#a4ffaf",
                    },
                  }}
                />
              }
              label="Include Lowercase Letters"
            />
          </div>

          <div className="checkbox-container">
            <FormControlLabel
              control={
                <Checkbox
                  checked={containSymbols}
                  onChange={(e) => setContainSymbols(e.target.checked)}
                  sx={{
                    color: "white",
                    "&.Mui-checked": {
                      color: "#a4ffaf",
                    },
                  }}
                />
              }
              label="Include Symbols"
            />
          </div>

          <div className="checkbox-container">
            <FormControlLabel
              control={
                <Checkbox
                  checked={containNumbers}
                  onChange={(e) => setContainNumbers(e.target.checked)}
                  sx={{
                    color: "white",
                    "&.Mui-checked": {
                      color: "#a4ffaf",
                    },
                  }}
                />
              }
              label="Include Numbers"
            />
          </div>

          <div>
            <h2>Strength</h2>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
          </div>
          <div>
            <button
              className="generate-btn"
              onClick={OnGeneratePasswordClicked}
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
