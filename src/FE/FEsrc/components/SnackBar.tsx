import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface SnackProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    snackText: string;
}

const CustomizedSnackbars: React.FC<SnackProps> = ({isOpen, setIsOpen, snackText}) => {
  
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if(reason === 'clickaway') {
            return;
        }
        setIsOpen(false);
    };

  return (
    <div>
      <Snackbar open={isOpen} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          variant="filled"
          sx={{ width: '100%', backgroundColor: '#039D5F'}}
        >
          {snackText}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CustomizedSnackbars;