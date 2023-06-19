
// Define Custom Snackbar/Toast component

import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';


function TransitionDown(props) {
    return <Slide {...props} direction="down" />;
}

const SnackBar = ({ openSnackbar, setopenSnackbar, snackMessage, severity, autoHideDuration, position }) => {

    // Executed when snackbar closes on it's own
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') { return };
        setopenSnackbar(false);
    };


    return (
        <Snackbar
            open={openSnackbar}
            autoHideDuration={autoHideDuration}
            onClose={handleClose}
            anchorOrigin={position} // Snackbar Position
            TransitionComponent={TransitionDown}>
            <Alert severity={severity} variant="filled" sx={{ width: '100%' }}>
                {snackMessage}
            </Alert>
        </Snackbar>
    )
}

export default SnackBar;