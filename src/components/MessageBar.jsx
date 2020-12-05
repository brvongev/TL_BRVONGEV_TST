import { useSelector } from "react-redux";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { getMessage } from "../data/selectors";
import { showMessage } from "../data/actions";
import { dispatch } from "../data/store";

/**
 * Shows general messages: Messages can come from eny component
 */
function MessageBar() {
  const snackbarContent = useSelector(getMessage);

  const closeSnackbar = (event, reason) => {
    dispatch(showMessage(null));
  };

  return (
    <Snackbar
      open={!!snackbarContent}
      autoHideDuration={6000}
      onClose={closeSnackbar}
    >
      <Alert onClose={closeSnackbar} severity={snackbarContent?.severity}>
        {snackbarContent?.msg}
      </Alert>
    </Snackbar>
  );
}

export default MessageBar;
