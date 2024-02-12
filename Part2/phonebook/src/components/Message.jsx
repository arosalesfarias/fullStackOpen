import React from 'react'

const Message = ({message}) => {
    if (message.text === null) return null

    const styleMessage = {
        color: message.isSuccess? 'green':'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    return(
        <div style={styleMessage}>
        {message.text}
        </div>
    )
}

export default Message