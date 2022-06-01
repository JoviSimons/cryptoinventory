import  React ,{forwardRef} from 'react';
import './App.css';
import Table from './components/table/AssetTable';
import Dialog from './components/dialog/Dialog';
import { Container, Button, Snackbar } from '@mui/material';
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import Order from './components/order/Order'

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const url = 'http://localhost:8080/api';

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [assets, setAssets] = React.useState([]);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  React.useEffect(() => {
    fetchAssets();
    // eslint-disable-next-line
  }, []);

  const fetchAssets = () => {
    axios
      .get(`${url}/public/assets`)
      .then(function (response) {
        setAssets(response.data);
      })
      .catch(function () {})
      .finally(function () {
      });
    handleClose();
  };

  const handleSuccesAlert = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="App">
      <Dialog 
      open={dialogOpen} 
      onClose={handleDialogClose}
      fetchAssets={fetchAssets}
      handleSuccesAlert={handleSuccesAlert}/>

      <h1>Your crypto assets:</h1>
      <Container>
        <Button variant="contained" onClick={handleClickOpen}>
          Add asset
        </Button>
        <br/>
        <br/>
        <Table
         assets={assets} 
         fetchAssets={fetchAssets}
         handleSuccesAlert={handleSuccesAlert}/>
         <br/>
         <Order/>
      </Container>

      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
            Action performed successfully
          </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
