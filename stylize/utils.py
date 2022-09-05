import os
import tensorflow as tf
import numpy as np
import PIL.Image
import tensorflow_hub as hub
from matplotlib import pyplot as plt
from io import BytesIO, StringIO


def tensor_to_image(tensor: tf.Tensor) -> PIL.Image:
    """Converts a tensor to a PIL.Image object after applying the following transforms:
    - Scales value from 0 to 1 to 0-255
    - casts the datatypes to np.uint8"""
    tensor = tensor * 255
    tensor = np.array(tensor, dtype=np.uint8)
    if np.ndim(tensor) > 3:
        assert tensor.shape[0] == 1
        tensor = tensor[0]
    return PIL.Image.fromarray(tensor)


def load_img(path_to_img : str) -> tf.Tensor:
    """Takes path to file as input, returns a Tensor
    Performs the following operations:
    - Scales the image so the longest dimension of the image shape is 512
    - Expands dimensions in front"""
    max_dim = 512
    img = tf.io.read_file(path_to_img)
    img = tf.image.decode_image(img, channels=3)
    img = tf.image.convert_image_dtype(img, tf.float32)
    # Takes the shape of the image, which is a tensor and converts it to an array of 32-bit floats
    # Also removes the last element (The number of channels)
    shape = tf.cast(tf.shape(img)[:-1], tf.float32)
    long_dim = max(shape)
    scale = max_dim / long_dim

    new_shape = tf.cast(shape * scale, tf.int32)

    img = tf.image.resize(img, new_shape)
    img = img[tf.newaxis, :]
    return img

def load_img_from_bytesio(img : BytesIO) -> tf.Tensor:
    """Takes a BytesIO object as input, returns a Tensor
    Performs the following operations:
    - Scales the image so the longest dimension of the image shape is 512
    - Expands dimensions in front"""
    max_dim = 512
    img = tf.image.decode_image(img.read(), channels=3)
    img = tf.image.convert_image_dtype(img, tf.float32)
    # Takes the shape of the image, which is a tensor and converts it to an array of 32-bit floats
    # Also removes the last element (The number of channels)
    shape = tf.cast(tf.shape(img)[:-1], tf.float32)
    long_dim = max(shape)
    scale = max_dim / long_dim

    new_shape = tf.cast(shape * scale, tf.int32)

    img = tf.image.resize(img, new_shape)
    img = img[tf.newaxis, :]
    return img

def img_to_bytesio(img: PIL.Image, format="JPEG") -> BytesIO:
    """Converts a PIL Image object to and returns a BytesIO buffer
    Inputs:
    - img : PIL.Image object, the image to be saved.
    - format : A string of the file format, JPEG by default.
    Other options are PNG, BMP, TGA, TIFF."""
    buf = BytesIO()
    img.save(buf, format=format)
    buf.seek(0)
    return buf
