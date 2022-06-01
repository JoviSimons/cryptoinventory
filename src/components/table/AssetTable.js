import React from "react";
import { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Dialog from "../dialog/AssetEdit";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AssetTable = ({assets, url, handleSuccesAlert, fetchAssets}) => {

  const [open, setOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState();

  const handleClickOpen = (value) => {
    setSelectedAsset({ ...value, value });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteAsset = (data) => {
    try {
      axios
        .delete(`http://localhost:8080/api/private/assets/${data.id}`)
        .then(() => {
            handleSuccesAlert()
            fetchAssets()
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog
        selectedAsset={selectedAsset}
        open={open}
        onClose={handleClose}
        url={url}
        handleSuccesAlert={handleSuccesAlert}
        fetchAssets={fetchAssets}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Crypto</TableCell>
              <TableCell align="left">Bought at</TableCell>
              <TableCell align="left">Token Amount</TableCell>
              <TableCell align="left">Amount in $</TableCell>
              <TableCell align="left">Link</TableCell>
              <TableCell align="left">Sold at</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assets.map((asset) => (
              <TableRow
                key={asset.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {asset.date}
                </TableCell>
                <TableCell data-testid="asset-name" align="left">
                  {asset.crypto}
                </TableCell>
                <TableCell data-testid="asset-description" align="left">
                  {asset.boughtAt}
                </TableCell>
                <TableCell data-testid="asset-description" align="left">
                  {asset.amount}
                </TableCell>
                <TableCell data-testid="asset-description" align="left">
                  {asset.money}
                </TableCell>
                <TableCell data-testid="asset-description" align="left">
                  {asset.link}
                </TableCell>
                <TableCell data-testid="asset-description" align="left">
                  {asset.soldAt}
                </TableCell>
                <TableCell align="left">
                  <Button onClick={() => handleClickOpen(asset)}>
                    <EditIcon/>
                  </Button>
                  <Button onClick={() => deleteAsset(asset)}>
                    <DeleteIcon/>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default AssetTable;
