import { useState } from "react";
import "./App.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Slider from "@mui/material/Slider";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PasswordCheckbox from "./components/PassWordCheckbox";

function App() {
  const [password, setPassWord] = useState("");
  const [passwordLength, setPasswordLength] = useState(6);
  const [containUppercase, setContainUppercase] = useState(false);
  const [containLowercase, setContainLowercase] = useState(false);
  const [containNumbers, setContainNumbers] = useState(false);
  const [containSymbols, setContainSymbols] = useState(false);

  const availableChars =
    (containUppercase ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "") +
    (containLowercase ? "abcdefghijklmnopqrstuvwxyz" : "") +
    (containNumbers ? "0123456789" : "") +
    (containSymbols ? "~!@#$%^&*" : "");

  const OnGeneratePasswordClicked = () => {
    const newPassword = generatePassword();
    setPassWord(newPassword);
  };

  const generatePassword = () => {
    if (!availableChars) return "";

    let passwordChars = [];

    if (containUppercase) {
      passwordChars.push(
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)],
      );
    }
    if (containLowercase) {
      passwordChars.push(
        "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)],
      );
    }
    if (containNumbers) {
      passwordChars.push("0123456789"[Math.floor(Math.random() * 10)]);
    }
    if (containSymbols) {
      passwordChars.push("~!@#$%^&*"[Math.floor(Math.random() * 8)]);
    }

    while (passwordChars.length < passwordLength) {
      const index = Math.floor(Math.random() * availableChars.length);
      passwordChars.push(availableChars[index]);
    }

    for (let i = passwordChars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [passwordChars[i], passwordChars[j]] = [
        passwordChars[j],
        passwordChars[i],
      ];
    }

    return passwordChars.join("");
  };

  const calculateStrength = () => {
    if (
      passwordLength === 0 ||
      (!containUppercase &&
        !containLowercase &&
        !containNumbers &&
        !containSymbols)
    ) {
      return 0;
    }

    const lengthScore = (passwordLength / 18) * 50;

    const varietyScore =
      (containUppercase ? 12.5 : 0) +
      (containLowercase ? 12.5 : 0) +
      (containNumbers ? 12.5 : 0) +
      (containSymbols ? 12.5 : 0);

    return Math.min(Math.round(lengthScore + varietyScore), 100);
  };

  const strength = calculateStrength();

  return (
    <>
      <div className="main-container">
        <h2 className="heading">Password Generator</h2>

        <div className="password-section">
          <p>
            {password} {strength}
          </p>
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

          <PasswordCheckbox
            label="Include Uppercase Letters"
            checked={containUppercase}
            onChange={(e) => setContainUppercase(e.target.checked)}
          />

          <PasswordCheckbox
            label="Include Lowercase Letters"
            checked={containLowercase}
            onChange={(e) => setContainLowercase(e.target.checked)}
          />

          <PasswordCheckbox
            label="Include Numbers"
            checked={containNumbers}
            onChange={(e) => setContainNumbers(e.target.checked)}
          />

          <PasswordCheckbox
            label="Include Symbols"
            checked={containSymbols}
            onChange={(e) => setContainSymbols(e.target.checked)}
          />

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
              <div className="generate-btn-text">
                <span>GENERATE</span>
                <div className="arrow-icon-wrapper">
                  <ArrowForwardIcon />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
