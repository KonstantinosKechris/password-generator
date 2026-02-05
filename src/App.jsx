import { useState } from "react";
import "./App.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Slider from "@mui/material/Slider";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PasswordCheckbox from "./components/PassWordCheckbox";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function App() {
  const [password, setPassWord] = useState("");
  const [passwordLength, setPasswordLength] = useState(6);
  const [containUppercase, setContainUppercase] = useState(false);
  const [containLowercase, setContainLowercase] = useState(false);
  const [containNumbers, setContainNumbers] = useState(false);
  const [containSymbols, setContainSymbols] = useState(false);
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const availableChars =
    (containUppercase ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "") +
    (containLowercase ? "abcdefghijklmnopqrstuvwxyz" : "") +
    (containNumbers ? "0123456789" : "") +
    (containSymbols ? "~!@#$%^&*" : "");

  const OnGeneratePasswordClicked = () => {
    setCopied(false);
    if (
      !containUppercase &&
      !containLowercase &&
      !containNumbers &&
      !containSymbols
    ) {
      setSnackbarOpen(true);
      setError("You have to check at least one checkbox!");
      setPassWord("");
      return;
    }
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

  const getStrengthConfig = () => {
    if (strength <= 30) {
      return { filled: 1, color: "#f64a4a" }; // κόκκινο
    }
    if (strength <= 50) {
      return { filled: 2, color: "#f8cd65" }; // μουσταρδί
    }
    if (strength <= 75) {
      return { filled: 3, color: "#a4ffaf" }; // ανοιχτό πράσινο
    }
    return { filled: 4, color: "#00c853" }; // σκούρο πράσινο
  };

  const { filled, color } = getStrengthConfig();

  const handleCopy = async () => {
    if (!password) return;

    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <>
      <div className="main-container">
        <h2 className="heading">Password Generator</h2>

        <div className="password-section">
          <p>{password}</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#a4ffaf",
            }}
          >
            {copied && <p>COPIED</p>}
            <ContentCopyIcon
              className="copy-icon"
              onClick={handleCopy}
              sx={{ cursor: "pointer" }}
            />
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
            label="Uppercase Letters"
            checked={containUppercase}
            onChange={(e) => setContainUppercase(e.target.checked)}
          />

          <PasswordCheckbox
            label="Lowercase Letters"
            checked={containLowercase}
            onChange={(e) => setContainLowercase(e.target.checked)}
          />

          <PasswordCheckbox
            label="Numbers"
            checked={containNumbers}
            onChange={(e) => setContainNumbers(e.target.checked)}
          />

          <PasswordCheckbox
            label="Symbols"
            checked={containSymbols}
            onChange={(e) => setContainSymbols(e.target.checked)}
          />

          <div className="strenght-container">
            <h2 style={{ fontSize: "18px" }}>Strength</h2>

            <div className="strength-boxes">
              {[1, 2, 3, 4].map((box, index) => (
                <div
                  key={box}
                  className="strength-box"
                  style={{
                    backgroundColor: index < filled ? color : "transparent",
                    borderColor: index < filled ? color : "#e6e5ea",
                  }}
                />
              ))}
            </div>
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
