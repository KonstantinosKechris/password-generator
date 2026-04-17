import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./GeneratePasswordBtn.scss";

function GeneratePasswordBtn({ OnGeneratePasswordClicked }) {
  return (
    <div>
      <button className="generate-btn" onClick={OnGeneratePasswordClicked}>
        <div className="generate-btn-text">
          <span>GENERATE</span>
          <div className="arrow-icon-wrapper">
            <ArrowForwardIcon />
          </div>
        </div>
      </button>
    </div>
  );
}

export default GeneratePasswordBtn;
