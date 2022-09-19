import React from 'react'

export default function Alert(props) {
    return (
        <div class="alert alert-dark" role="alert">
            {props.message}
        </div>
    )
}
