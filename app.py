import base64
import json
from typing import Dict
import stylize
import fastapi
from fastapi import File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import StreamingResponse, FileResponse
from PIL import Image
import os
from io import BytesIO


app = fastapi.FastAPI()
model = stylize.Model()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


style_path = "./stylize/style_images/"
style_info = json.loads(open("./stylize/styles.json").read())
styles: Dict[str, any] = {style["id"]: style for style in style_info}

# Load images into memory
images = {}
ids = list(styles.keys())
for id in ids:
    fp = os.path.join(style_path, styles[id]["file"])
    f = open(fp, "rb")
    images[id] = f.read()
    f.close()


@app.get("/styles/image/{image}")
def get_style_image(image: str):
    style = styles.get(image)
    if not style:
        raise HTTPException(status_code=415, detail="Style not found")
    return FileResponse(os.path.join(style_path, style["file"]))


@app.get("/styles/info")
def get_styles_info():
    return style_info


@app.post("/stylizeb64")
def upload_file(style: str = Form(), image: UploadFile = File()):
    """API route to return base64 encoded stylized image.

    Parameters:
    - style : str - is a string containing the appropriate id of style image
    - image : UploadFile - contains the content image submitted by the user"""
    # Check if input file or id is invalid
    if image.content_type not in ["image/png", "image/jpeg"]:
        raise HTTPException(status_code=415, detail="Wrong file type, use png or jpeg")
    if not (style in ids):
        raise HTTPException(status_code=400, detail="Invalid ID")
    # Load in style image from images list
    content2 = BytesIO(images[style])
    content2.seek(0)
    # Load in content image from request params
    content1 = image.file
    content_img = stylize.utils.load_img_from_bytesio(content1)
    style_img = stylize.utils.load_img_from_bytesio(content2)
    # Run stylization
    img = model.stylize(content_img, style_img)
    # Encode response as base64
    buf = stylize.utils.img_to_bytesio(img, format="PNG")
    buf = BytesIO(base64.b64encode(buf.read()))
    buf.seek(0)
    return StreamingResponse(buf, media_type="image/png;base64")


@app.post("/stylize")
def upload_file(style: str = Form(), image: UploadFile = File()):
    """API route to return stylized image. Debug only at this point.

    Parameters:
    - style : str - is a string containing the appropriate id of style image
    - image : UploadFile - contains the content image submitted by the user"""
    if image.content_type not in ["image/png", "image/jpeg"]:
        raise HTTPException(status_code=415, detail="Wrong file type, use png or jpeg")
    if not (style in ids):
        raise HTTPException(status_code=415, detail="Invalid ID")

    content1 = image.file
    content2 = BytesIO(images[style])
    content2.seek(0)
    content_img = stylize.utils.load_img_from_bytesio(content1)
    style_img = stylize.utils.load_img_from_bytesio(content2)
    img = model.stylize(content_img, style_img)
    buf = stylize.utils.img_to_bytesio(img, format="PNG")
    return StreamingResponse(buf, media_type="image/png")
