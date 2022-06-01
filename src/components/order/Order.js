import React, {  useState } from "react";
import {  Button, TextField } from "@mui/material"
import axios from "axios";
import CryptoJS from 'crypto-js'

const Order = () => {

    const keys = {
        'akey' : process.env.REACT_APP_BITVAVO_API_KEY,
        'skey' : process.env.REACT_APP_BITVAVO_API_SECRET_KEY
    }

    const payload = {
        'akey': keys.akey,
        'timestamp': '',
        'signature': '',
        'market': '',
        'side': 'buy',
        'orderType': 'market',
        'amount': ''
    }

    const [order, setOrder] = useState(payload)

    const onChange = (e) => {
        const { name, value } = e.target;
        setOrder({
          ...order,
          [name]: value
        }); 
    };

    const postOrder = () => {
        const time = Date.now()

        payload.amount = order.amount
        payload.market = `${order.market}-EUR`
        payload.timestamp = time

        const query = `${time}POST/v2/order{"market":"${payload.market}",
        "side":"${payload.side}",
        "orderType":"${payload.orderType}",
        "amount":"${payload.amount}"}`
        
        const signature = CryptoJS.HmacSHA256(query, keys.skey).toString(CryptoJS.enc.Hex)
        payload.signature = signature

        axios.post("http://localhost:8080/api/public/bitvavo/order", payload)
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
                
    }

    return(
        <div>
            <TextField
                margin="dense"
                id="market"
                label="Asset"
                type="market"
                name="market"
                fullWidth
                variant="standard"
                onChange={onChange}
            />
            <TextField
                margin="dense"
                id="amount"
                label="Amount"
                type="amount"
                name="amount"
                fullWidth
                variant="standard"
                onChange={onChange}
            />
            <Button
             variant="outlined"
             onClick={postOrder}>
                Buy asset
            </Button>
        </div>
    )
}

export default Order