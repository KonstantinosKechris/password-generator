import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function InfoMessage({ snackbarOpen, setSnackbarOpen, message, severity }) {
  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={3000}
      onClose={() => setSnackbarOpen(false)}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Alert
        onClose={() => setSnackbarOpen(false)}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default InfoMessage;
