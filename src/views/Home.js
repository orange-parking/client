import React, { useState, useEffect } from 'react'
import { Link } from  'react-router-dom'
import logo from '../logo.svg';
import QRCode from 'qrcode'
import db from '../firebase/index'


export default function Home() {
    const [data, setData] = useState(null)
    
    useEffect(() => {
        db.collection("parkings")
        .onSnapshot((onSnapshot) => {
            setData(onSnapshot)
        })
    },[])

    useEffect(() => {
        let qr = QRCode.create('http://192.168.0.110:3000/create/'+JSON.stringify(new Date()).slice(1,-2))
        QRCode.toDataURL(qr.segments, {color: {dark:'#000', light:'#0000'}},function (err, url) {
            if (err) throw err
            var img = document.getElementById('img')
            img.src = url
            console.log(url)
        })
    }, [data])

    return (
        <div>
            <header className="App-header">
              {/* <Link to={'/create/'+JSON.stringify(new Date()).slice(1,-2)}>
                <h1>Parkir</h1>
              </Link> */}
              <h1>Parkir</h1>
              <img style={{width:'200px', height:'200px'}} src={logo} className="App-logo" alt="logo" />
              <img style={{width:'500px', height:'500px'}} alt='qrcode' id="img" />
            </header>
        </div>
    )
}
