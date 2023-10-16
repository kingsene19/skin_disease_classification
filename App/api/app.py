from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from utils.classification.cl_utils import PREDS_DICT, preprocess_image, load_classification_model, enhance
from utils.segmentation.seg_utils import *
import uvicorn
from PIL import Image
import io
import numpy as np

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

cl_model = load_classification_model()
seg_model = load_segmentation_model()

def predict(image):
    mask = seg_model.predict(image.reshape(1,224,224,3),verbose=0)
    mask = enhance(mask)
    mask = np.concatenate((mask, mask, mask),axis=2)
    Image.fromarray((mask*225).astype(np.uint8)).save("data/segmentation.jpeg")
    image_seg = retrieve_base64("data/segmentation.jpeg")
    pred = cl_model.predict(mask.reshape(1,224,224,3),verbose=0)
    index = np.argmax(pred, 1)[0]
    confiance = float(pred[0][index])
    return PREDS_DICT[index], confiance, image_seg

@app.post('/predict')
async def get_prediction_result(request: Request):
    form = await request.form()
    file_content = await form.get("file").read()
    try:
        img = Image.open(io.BytesIO(file_content))
        img = preprocess_image(img)
        prediction, confiance, image_seg = predict(img)
    except Exception as e:
        return HTTPException(status_code=500, detail={"error", repr(e)})
    else:
        return {
            "statut": "OK",
            "prediction": prediction,
            "confiance": confiance,
            "image_seg": image_seg
        }

if __name__=="__main__":
    uvicorn.run('app:app', host='127.0.0.1', port=5000)
