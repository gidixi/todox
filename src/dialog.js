import React, {useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import ReactDOM from 'react-dom';

function AlertDialog({ title, content, onAgree, onDisagree }) {
  const [open, setOpen] = useState(true);

  const handleAgree = () => {
    onAgree();
    setOpen(false);
  };

  const handleDisagree = () => {
    onDisagree();
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleDisagree}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDisagree}>Annulla</Button>
        <Button onClick={handleAgree} autoFocus>
          Elimina
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function openDialog(title, content) {
  return new Promise((resolve, reject) => {
    const handleAgree = () => {
      resolve(true);
    };
    const handleDisagree = () => {
      resolve(false);
    };
    const dialog = <AlertDialog title={title} content={content} onAgree={handleAgree} onDisagree={handleDisagree} />;
    ReactDOM.render(dialog, document.getElementById('dialog'));
  });
}
