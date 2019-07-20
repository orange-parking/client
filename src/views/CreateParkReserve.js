import React, { useEffect } from 'react'
import db from '../firebase/index'

const CreateParkReserve = (props) => {

    useEffect(() => {
        console.log('bro')
        db.collection('parkings')
        .add({
            date: props.match.params.date,
            nopol: null
        })
        .then((data) => {
            props.history.replace('/user/'+data.id)
        })
    },[])

    return (
        <>
        </>
    )
}

export default CreateParkReserve
