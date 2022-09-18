import stylize
import fastapi
from fastapi import File, UploadFile, HTTPException
from starlette.responses import StreamingResponse
from PIL import Image
from io import StringIO
import uuid

app = fastapi.FastAPI()
model = stylize.Model()
# style_img = stylize.utils.load_img(r"stylize\style_images\Picasso1.jpg")


@app.post("/file/")
def create_upload_file(file1: UploadFile = File(),file2: UploadFile = File()):
    if file1.content_type not in ["image/png", "image/jpeg"]:
        raise HTTPException(status_code=415, detail="Wrong file type, use png or jpeg")
    if file2.content_type not in ["image/png", "image/jpeg"]:
        raise HTTPException(status_code=415, detail="Wrong file type, use png or jpeg")
    content1 = file1.file
    content2 = file2.file
    content_img = stylize.utils.load_img_from_bytesio(content1)
    style_img = stylize.utils.load_img_from_bytesio(content2)
    img = model.stylize(content_img, style_img)
    buf = stylize.utils.img_to_bytesio(img, format="PNG")
    return StreamingResponse(buf, media_type="image/png")
