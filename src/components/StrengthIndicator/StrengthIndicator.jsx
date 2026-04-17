import "./StrengthIndicator.scss";

function StrengthIndicator({ filled, color }) {
  return (
    <div className="strength-container">
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
  );
}

export default StrengthIndicator;
