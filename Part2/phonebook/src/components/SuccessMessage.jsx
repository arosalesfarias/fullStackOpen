import React, { useState, useEffect } from 'react'

const SuccessMessage = ({message}) => {
    if (message === null) return null

    const styleSuccess = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    return(
        <div style={styleSuccess}>
        {message}
        </div>
    )
}

export default SuccessMessage