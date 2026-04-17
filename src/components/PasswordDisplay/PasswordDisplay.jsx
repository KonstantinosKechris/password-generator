import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function PasswordDisplay({ password, copied, handleCopy }) {
  return (
    <div className="password-section">
      <p className="password-value">{password}</p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          color: "#a4ffaf",
        }}
      >
        {copied && <p className="copied-value">COPIED</p>}
        <ContentCopyIcon
          className="copy-icon"
          onClick={handleCopy}
          sx={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
}

export default PasswordDisplay;
