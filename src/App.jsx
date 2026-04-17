import { useState } from "react";
import "./App.css";
import PasswordCheckbox from "./components/PasswordCheckbox/PasswordCheckbox";
import InfoMessage from "./components/InfoMessage/InfoMessage";
import PasswordDisplay from "./components/PasswordDisplay/PasswordDisplay";
import GeneratePasswordBtn from "./components/GeneratePasswordbtn/GeneratePasswordBtn";
import StrengthIndicator from "./components/StrengthIndicator/StrengthIndicator";
import PasswordLengthControl from "./components/PasswordLengthControl/PasswordLengthControl";

function App() {
  const [password, setPassWord] = useState("");
  const [passwordLength, setPasswordLength] = useState(6);
  const [containUppercase, setContainUppercase] = useState(false);
  const [containLowercase, setContainLowercase] = useState(false);
  const [containNumbers, setContainNumbers] = useState(false);
  const [containSymbols, setContainSymbols] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
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
      setMessage("You have to check at least one checkbox!");
      setSeverity("error");
      setPassWord("");
      return;
    }
    const newPassword = generatePassword();
    setPassWord(newPassword);
    setMessage("Password Generated Successfully!");
    setSeverity("success");
    setSnackbarOpen(true);
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

        <PasswordDisplay
          password={password}
          copied={copied}
          handleCopy={handleCopy}
        />

        <div className="password-specs-section">
          <PasswordLengthControl
            passwordLength={passwordLength}
            setPasswordLength={setPasswordLength}
          />

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

          <StrengthIndicator filled={filled} color={color} />

          <GeneratePasswordBtn
            OnGeneratePasswordClicked={OnGeneratePasswordClicked}
          />
        </div>
      </div>

      <InfoMessage
        snackbarOpen={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
        message={message}
        severity={severity}
      />
    </>
  );
}

export default App;
