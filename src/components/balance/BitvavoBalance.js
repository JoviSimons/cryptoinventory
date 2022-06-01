import React, { useEffect } from "react";
import { useState } from "react";
import { Paper } from "@mui/material"
import axios from "axios";
import CryptoJS from 'crypto-js'


const BitvavoBalance = () => {

    const keys = {
        'akey' : process.env.REACT_APP_BITVAVO_API_KEY,
        'skey' : process.env.REACT_APP_BITVAVO_API_SECRET_KEY
    }
    
    const [balance, setBalance] = useState([])

    const payload = {
        'akey': keys.akey,
        'skey': keys.skey,
        'timestamp': '',
        'signature': ''
    }

    const getBalance = async () => {
        const time = Date.now()

        const query = `${time}GET/v2/balance`
        const signature = CryptoJS.HmacSHA256(query, keys.skey).toString(CryptoJS.enc.Hex)

        payload.signature = signature
        payload.timestamp = time

        axios.post("http://localhost:8080/api/public/bitvavo/balance", payload)
        .then((response) => {
            console.log(response.data)
            setBalance(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getBalance()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <h1>Balance:</h1>
            {balance.map((asset) =>(
                <Paper key={asset.symbol} variant="outlined">{asset.symbol}: {asset.available}</Paper>
            ))}
        </div>
    );
}
export default BitvavoBalance;
