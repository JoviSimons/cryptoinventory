import * as React from 'react';
import { 
    DataGrid
  } from '@mui/x-data-grid';
import axios from 'axios';




  const Table = ({assets}) => {

    const columns = [
      {
        field: 'date',
        headerName: 'Date',
        width: 150,
        editable: true,
        type: 'dateTime'
      },
      {
        field: 'crypto',
        headerName: 'Crypto',
        width: 150,
        editable: true,
      },
      {
        field: 'boughtAt',
        headerName: 'Bought at',
        width: 200,
        editable: true,
      },
      {
          field: 'amount',
          headerName: 'Token amount',
          width: 110,
          editable: true,
      },
      {
          field: 'money',
          headerName: 'Amount in $',
          width: 110,
          editable: true,
      },
      {
          field: 'link',
          headerName: 'Link to website',
          width: 110,
          editable: true,
      },
      {
          field: 'soldAt',
          headerName: 'Sold at',
          width: 110,
          editable: true,
      },
    ];

    const [rows, setRows] = React.useState(assets)

    React.useEffect(() => {
      setRows(assets)
    })

    const HandleEdit = (e) => {
      console.log(e)
      const { field, value, id} = e


      setRows((prevRows) => {
        const rowToUpdate = id - 1

        return prevRows.map((row, index) => 
         index === rowToUpdate ? {...row, [field]: value} : console.log("nee"),
        )
     })
    }
      //  axios
      // .put(`http://localhost:8080/api/private/assets` + selectedCard.id, values)
      // .catch(function () {console.log("kanker")})
      // .finally(function () {
      //   console.log('joepie!')
      // })
    return (
    <div>
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            onCellEditCommit={HandleEdit}
            />
        </div>

    </div>
    );
  }
  export default Table;