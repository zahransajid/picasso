import json
from typing import Dict
import stylize
import fastapi
from fastapi import File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import StreamingResponse, FileResponse
from PIL import Image
import os

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
styles: Dict[str, any] = {style['id'] : style for style in style_info}

@app.get("/styles/image/{image}")
def get_style_image (image:str) :
    style = styles.get(image)
    if not style : 
        raise HTTPException(status_code=415, detail="Style not found")
    return FileResponse(os.path.join(style_path, style["file"]))

@app.get("/styles/info")
def get_styles_info () :
    return style_info

@app.post("/stylize")
def upload_file(style:str= Form(), image: UploadFile = File()):

    if image.content_type not in ["image/png", "image/jpeg"]:
        raise HTTPException(status_code=415, detail="Wrong file type, use png or jpeg")

    content1 = image.file
    content2 = open(os.path.join(style_path, styles[style]['file']), "rb")
    content_img = stylize.utils.load_img_from_bytesio(content1)
    style_img = stylize.utils.load_img_from_bytesio(content2)
    img = model.stylize(content_img, style_img)
    buf = stylize.utils.img_to_bytesio(img, format="PNG")
    return StreamingResponse(buf, media_type="image/png")
