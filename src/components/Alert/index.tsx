import { AlertProps as MUIAlertProps, AlertTitle, Fade, Alert as MUIAlert } from '@mui/material';

import React from 'react';

interface AlertProps extends MUIAlertProps {
  display: boolean;
  setDisplay: (val: boolean) => void;
  title: string;
  description: string;
}

const Alert: React.FC<AlertProps> = ({ display, setDisplay, title, description, ...props }) => {
  return (
    <Fade
      in={display}
      timeout={{ enter: 1000, exit: 1000 }}
      addEndListener={() => {
        setTimeout(() => {
          setDisplay(false);
        }, 3000);
      }}
    >
      <MUIAlert {...props} sx={{ zIndex: theme => theme.zIndex.drawer + 2 }}>
        <AlertTitle>{title}</AlertTitle>
        {description}
      </MUIAlert>
    </Fade>
  );
};

export default Alert;
