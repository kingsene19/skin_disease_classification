import numpy as np
import cv2
import tensorflow as tf

def enhance(img):
    sub = img.flatten()
    for i in range(len(sub)):
        if sub[i] > 0.5:
            sub[i] = 1
        else:
            sub[i] = 0
    return sub.reshape(224,224,1)

def preprocess_image(img):
    img = np.array(img)
    img = cv2.resize(img, (224,224),interpolation=cv2.INTER_AREA)
    img = np.array(img, dtype='float32')
    img /= 255
    return img

def load_classification_model():
    return tf.keras.models.load_model('models/skin_disease_classification.h5')

PREDS_DICT = {
    0:'Actinic keratoses',
    1:'Basal cell carcinoma',
    2:'Benign keratosis-like lesions',
    3:'Dermatofibroma',
    4:'Melanocytic nevi',
    5:'Melanoma',
    6:'Vascular lesions'
}