import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";

const AssetEdit = ({ onClose, selectedAsset, open, url, handleSuccesAlert, fetchAssets}) => {

  const initialFValues = {
    name: "",
    description: null,
    image: "",
  };

  const [values, setValues] = useState(initialFValues);

  const handleClose = () => {
    onClose();
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    if (selectedAsset != null) setValues({ ...selectedAsset });
  }, [selectedAsset]);

  const handleSubmit = (e) => {
    axios
      .put(`http://localhost:8080/api/private/assets/` + selectedAsset.id, values)
      .catch( () => {})
      .finally( () => {
        handleSuccesAlert()
        fetchAssets();
      });
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle className="editheader">Edit</DialogTitle>
      <DialogContent>
          <TextField
            id="outlined-multiline-flexible"
            label="Date"
            name="date"
            multiline
            defaultValue={values.date}
            onChange={onChange}
            fullWidth
            margin="dense"
            type="date"
          />

          <TextField
            id="outlined-multiline-flexible"
            label="Crypto"
            name="crypto"
            multiline
            fullWidth
            variant="standard"
            margin="dense"
            defaultValue={values.crypto}
            onChange={onChange}
          />

          <TextField
            id="outlined-multiline-flexible"
            label="Bought at"
            name="boughtAt"
            multiline
            fullWidth
            variant="standard"
            margin="dense"
            defaultValue={values.boughtAt}
            onChange={onChange}
          />

          <TextField
            id="outlined-multiline-flexible"
            label="Token amount"
            name="amount"
            multiline
            fullWidth
            variant="standard"
            margin="dense"
            defaultValue={values.amount}
            onChange={onChange}
          />

          <TextField
            id="outlined-multiline-flexible"
            label="Amount in $"
            name="money"
            multiline
            fullWidth
            variant="standard"
            margin="dense"
            defaultValue={values.money}
            onChange={onChange}
          />

          <TextField
            id="outlined-multiline-flexible"
            label="Link"
            name="link"
            multiline
            fullWidth
            variant="standard"
            margin="dense"
            defaultValue={values.link}
            onChange={onChange}
          />

          <TextField
            id="outlined-multiline-flexible"
            label="Sold at"
            name="soldAt"
            multiline
            fullWidth
            variant="standard"
            margin="dense"
            defaultValue={values.soldAt}
            onChange={onChange}
          />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>

    </Dialog>
  );
}
export default AssetEdit;

