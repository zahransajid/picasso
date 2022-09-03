import os
import tensorflow as tf
import numpy as np
import PIL.Image
import tensorflow_hub as hub
from matplotlib import pyplot as plt
from . import utils
import json


class Model:
    """- On init loads in the style transfer model.
    - Use the stylize method to use the model on images"""

    def __init__(self) -> None:
        self.hub_model = hub.load(
            os.path.join(
                os.path.dirname(__file__),
                "magenta_arbitrary-image-stylization-v1-256_2",
            )
        )

    def stylize(self, content_image: tf.Tensor, style_image: tf.Tensor) -> PIL.Image:
        """Stylizes an image using the model described by https://arxiv.org/abs/1508.06576.

        Inputs:
        - content_image : tf.Tensor
        - style_image : tf.Tensor

        Use the stylize.utils.load_img function to load in Tensors which have been modified to suit the models requirements."""
        content_image = tf.constant(content_image)
        style_image = tf.constant(style_image)
        stylized_image = self.hub_model(
            tf.constant(content_image), tf.constant(style_image)
        )[0]
        return utils.tensor_to_image(stylized_image)
