import React, {useEffect, useState} from 'react'
import QRCode from 'qrcode'

export default function UserPage(props) {
    const [url,setUrl] = useState('')
    useEffect(() => {
        console.log(props.match.params.id)
        let id = props.match.params.id
        let qr = QRCode.create(id)
        QRCode.toDataURL(qr.segments, {color: {dark:'#000', light:'#fff'}},function (err, url2) {
            if (err) throw err
            var img = document.getElementById('img2')
            img.src = url2
            setUrl(url2)
            console.log(url2)
          })
    },[])

    return (
        <div>
            <a href={url} download={JSON.stringify(new Date()).slice(0,-2)+'.png'}>
                <img alt='qrcode' id="img2" />
            </a>
        </div>
    )
}
