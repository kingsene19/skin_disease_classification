import React from 'react';


export default function Popup ({prediction, confidance}) {

    
    return (
        <div className='main-container'>
            <div className='modal-container'>
                <div className='modal-input-label'>
                    <label className='modal-input-text'>Prediction</label>
                    <input
                        id="pred"
                        className='modal-input'
                        type='text'
                        value={prediction}
                        readOnly={true}
                    />
                </div>
                <div className='modal-input-label'>
                    <label className='modal-input-text'>Certitude</label>
                    <input
                        id="cert"
                        className='modal-input'
                        type='text'
                        value={confidance}
                        readOnly={true}
                    />
                </div>
            </div>
        </div>
    )
}
