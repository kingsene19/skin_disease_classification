import React, {useState} from 'react';
import {MdCloudUpload, MdDelete} from 'react-icons/md';
import {AiFillFileImage} from 'react-icons/ai';
import FormData from 'form-data'
import axios from 'axios';
import Popup from './Popup';

export default function Uploader() {

    const [image, setImage] = useState(null);
    const [seg_image, setSegImage] = useState(null);
    const [filename, setFileName] = useState('Aucun fichier choisi');
    const [prediction, setPrediction] = useState(null);
    const [confidance, setConfidance] = useState(null);

    const handleSubmit = async (file) => {
        const url = 'http://127.0.0.1:5000/predict';

        const form = new FormData();
        form.append("file", file, filename);
        const result = await axios.post(url, form);
        setSegImage(result.data.image_seg);
        setPrediction(result.data.prediction);
        setConfidance(result.data.confiance);
    }

    return (
        <div className='upload-div'>
            <form 
                action=''
                className='upload-form'
                onClick={() => document.querySelector('.input-field').click()}
            >
                <input
                    type = "file"
                    accept = "image/*"
                    className='input-field'
                    onChange={({target: {files}}) => {
                        files[0] && setFileName(files[0].name)
                        if (files) {
                            setImage(URL.createObjectURL(files[0]));
                            handleSubmit(files[0]);
                        }
                    }}
                    hidden
                />
                <div className='input-images'>
                    {
                        image?
                        <div className='input-images-div'>
                            <span>Image</span>
                            <img src={image} width={250} height={250} alt={filename}/>
                        </div>
                        :
                        <>
                            <MdCloudUpload color="#000" size={120}/>
                            <p>Choisir une image à analyser</p>
                        </>
                    }
                    {
                        seg_image?
                        <div className='input-images-div'>
                            <span>Image segmentée</span>
                            <img src={`data:image/jpeg;base64,${seg_image}`} width={250} height={250} alt={filename}/>
                        </div>
                        :
                        <></>
                    }

                </div>
            </form>

            <div className='upload-row'>
                    <AiFillFileImage color="#fff"/>
                    <span>
                        {filename}
                        <MdDelete
                            onClick={
                                () => {
                                setFileName("Aucun fichier choisi");
                                setImage(null);
                                setSegImage(null);
                                setPrediction(null);
                                setConfidance(null);
                            }}
                        />
                    </span>
            </div>

            {
                (prediction && confidance) ?
                <>
                    <Popup prediction={prediction} confidance={confidance} />
                </>
                :
                <></>
            }
            
        </div>
    );
}