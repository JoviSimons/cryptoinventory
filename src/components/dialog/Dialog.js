import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";


 const FormDialog = ({open, onClose, fetchAssets, handleSuccesAlert}) => {

    const initialFValues = {
        date: null,
        crypto: "",
        bought_at: "",
        amount: "",
        money: "",
        link: "",
        sold_at: ""
    };

    const handleClose = () => {
        onClose();
    };

    const [asset, setAsset] = React.useState(initialFValues);

    const onChange = (e) => {
    const { name, value } = e.target;
    console.log(asset)
    console.log(name + ': ' + value)
    setAsset({
      ...asset,
      [name]: value
    });
    };

    const handleSubmit = (e) => {
        axios
        .post(`http://localhost:8080/api/private/assets`, asset)
        .then(function (response) {
        })
        .catch( () => {})
        .finally( () => {
            handleSuccesAlert()
            fetchAssets()
        });
    handleClose();
    };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add asset</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Below you can add your asset details.
          </DialogContentText>
          <TextField
            margin="dense"
            id="date"
            label="Date"
            type="date"
            name="date"
            fullWidth
            variant="standard"
            onChange={onChange}
          />
            <TextField
            autoFocus
            margin="dense"
            id="crypto"
            label="Crypto"
            type="text"
            name='crypto'
            fullWidth
            variant="standard"
            onChange={onChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="boughtAt"
            label="Bought at"
            type="text"
            name='boughtAt'
            fullWidth
            variant="standard"
            onChange={onChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="tokenAmount"
            label="Token amount"
            type="text"
            name='amount'
            fullWidth
            variant="standard"
            onChange={onChange}
          />
            <TextField
            autoFocus
            margin="dense"
            id="money"
            label="Amount in $"
            type="text"
            name='money'
            fullWidth
            variant="standard"
            onChange={onChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="link"
            label="Link to website"
            type="text"
            name='link'
            fullWidth
            variant="standard"
            onChange={onChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="soldAt"
            label="Sold at"
            type="text"
            name="soldAt"
            fullWidth
            variant="standard"
            onChange={onChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialog;