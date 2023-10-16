import tensorflow as tf
from keras import backend as K
from tensorflow import keras
import base64

def jaccard_distance(y_true, y_pred, smooth=100):
    y_true = tf.cast(y_true, tf.float32)
    intersection = K.sum(K.abs(y_true * y_pred), axis=-1)
    sum_ = K.sum(K.square(y_true), axis = -1) + K.sum(K.square(y_pred), axis=-1)
    jac = (intersection + smooth) / (sum_ - intersection + smooth)
    return (1 - jac)

def iou(y_true, y_pred, smooth = 100):
    y_true = tf.cast(y_true, tf.float32)
    intersection = K.sum(K.abs(y_true * y_pred), axis=-1)
    sum_ = K.sum(K.square(y_true), axis = -1) + K.sum(K.square(y_pred), axis=-1)
    jac = (intersection + smooth) / (sum_ - intersection + smooth)
    return jac

def precision(y_true, y_pred):
    y_true = tf.cast(y_true, tf.float32)
    true_positives = K.sum(K.round(K.clip(y_true * y_pred, 0, 1)))
    predicted_positives = K.sum(K.round(K.clip(y_pred, 0, 1)))
    precision = true_positives / (predicted_positives + K.epsilon())
    return precision

def recall(y_true, y_pred):
    y_true = tf.cast(y_true, tf.float32)
    true_positives = K.sum(K.round(K.clip(y_true * y_pred, 0, 1)))
    possible_positives = K.sum(K.round(K.clip(y_true, 0, 1)))
    recall = true_positives / (possible_positives + K.epsilon())
    return recall

def accuracy(y_true, y_pred):
    y_true = tf.cast(y_true, tf.float32)
    return K.mean(K.equal(y_true, K.round(y_pred)))

def double_conv_layer(x, size, dropout=0.4, batch_norm=True):
    if K.image_data_format() == 'th':
        axis = 1
    else:
        axis = 3
    conv = keras.layers.Conv2D(size, (3,3), padding='same')(x)
    if batch_norm is True:
        conv = keras.layers.BatchNormalization(axis=axis)(conv)
    conv = keras.layers.Activation('relu')(conv)
    conv = keras.layers.Conv2D(size, (3,3), padding='same')(conv)
    if batch_norm is True:
        conv = keras.layers.BatchNormalization(axis=axis)(conv)
    conv = keras.layers.Activation('relu')(conv)
    if dropout > 0:
        conv = keras.layers.SpatialDropout2D(dropout)(conv)
    return conv


def load_segmentation_model():
    INPUT_CHANNELS = 3
    OUTPUT_CHANNELS = 1
    dropout_val=0.50
    if K.image_data_format() == 'th':
        inputs = keras.layers.Input((INPUT_CHANNELS, 224, 224))
        axis = 1
    else:
        inputs = keras.layers.Input((224, 224, INPUT_CHANNELS))
        axis = 3
    filters = 32

    conv_224 = double_conv_layer(inputs, filters)
    pool_112 = keras.layers.MaxPooling2D(pool_size=(2, 2))(conv_224)
    conv_112 = double_conv_layer(pool_112, 2*filters)
    pool_56 = keras.layers.MaxPooling2D(pool_size=(2, 2))(conv_112)
    conv_56 = double_conv_layer(pool_56, 4*filters)
    pool_28 = keras.layers.MaxPooling2D(pool_size=(2, 2))(conv_56)
    conv_28 = double_conv_layer(pool_28, 8*filters)
    pool_14 = keras.layers.MaxPooling2D(pool_size=(2, 2))(conv_28)
    conv_14 = double_conv_layer(pool_14, 16*filters)
    pool_7 = keras.layers.MaxPooling2D(pool_size=(2, 2))(conv_14)
    conv_7 = double_conv_layer(pool_7, 32*filters)
    up_14 = keras.layers.concatenate([keras.layers.UpSampling2D(size=(2, 2))(conv_7), conv_14], axis=axis)
    up_conv_14 = double_conv_layer(up_14, 16*filters)
    up_28 = keras.layers.concatenate([keras.layers.UpSampling2D(size=(2, 2))(up_conv_14), conv_28], axis=axis)
    up_conv_28 = double_conv_layer(up_28, 8*filters)
    up_56 = keras.layers.concatenate([keras.layers.UpSampling2D(size=(2, 2))(up_conv_28), conv_56], axis=axis)
    up_conv_56 = double_conv_layer(up_56, 4*filters)
    up_112 = keras.layers.concatenate([keras.layers.UpSampling2D(size=(2, 2))(up_conv_56), conv_112], axis=axis)
    up_conv_112 = double_conv_layer(up_112, 2*filters)
    up_224 = keras.layers.concatenate([keras.layers.UpSampling2D(size=(2, 2))(up_conv_112), conv_224], axis=axis)
    up_conv_224 = double_conv_layer(up_224, filters, dropout_val)

    conv_final = keras.layers.Conv2D(OUTPUT_CHANNELS, (1, 1))(up_conv_224)
    conv_final = keras.layers.Activation('sigmoid')(conv_final)
    pred = keras.layers.Reshape((224,224))(conv_final)

    model = keras.models.Model(inputs, pred, name="UNET")
    model.compile(optimizer= keras.optimizers.legacy.Adam(learning_rate = 0.003), loss= [jaccard_distance],metrics=[iou, precision, recall, accuracy])
    model.load_weights('models/unet_100_epoch.h5')

    return model

def retrieve_base64(path):
    with open(path, 'rb') as f:
        base64image = base64.b64encode(f.read())
    return base64image
