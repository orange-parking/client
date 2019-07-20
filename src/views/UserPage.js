import React, {useEffect, useState} from 'react'
import QRCode from 'qrcode'
import axios from 'axios'
import db from '../firebase/index'

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
            hitGVision('https://firebasestorage.googleapis.com/v0/b/parkirhusni.appspot.com/o/platnomor%2Fplat5.jpg?alt=media&token=05f4c87e-d7d5-40fc-908e-f59055d9368e',id)
          })
    },[])

    function hitGVision(url,id){
        axios
        .post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDG55WGni8p3GyKugYcmBYsxGYVxVkpL8U',{"requests": [
                {
                    "image": {
                    "source": {
                        "imageUri": url
                    } 
                    },
                    "features": [
                    {
                        "type": "TEXT_DETECTION",
                        "maxResults": 10
                    },
                    {
                        "type": "LABEL_DETECTION",
                        "maxResults": 10
                    }
                    ]
                }
            ]
        })
        .then(({data}) => {
            getNumber(data,id)
        })
        .catch(err => {
            console.log(err)
        })
    }

    function getNumber(data,id) {
        console.log(data)
        let regex = new RegExp(/^([A-Za-z]{1,2})(\s|-)*([0-9]{1,4})(\s|-)*([A-Za-z]{0,3})$/i)
        let textList = data.responses[0].textAnnotations[0].description.split('\n')
        console.log(textList)
        var nopol = ''
        
        for (let i = 0; i < textList.length; i++) {
            if(regex.test(textList[i])) {
                console.log(textList[i])
                nopol = textList[i]
            }    
        }
        return db.collection('parkings').doc(id).update({
            nopol
        })
        .then(() => {
            // console.log(data, '========')
        })
    }

    return (
        <div>
            <a href={url} download={JSON.stringify(new Date()).slice(0,-2)+'.png'}>
                <img alt='qrcode' id="img2" />
            </a>
        </div>
    )
}
