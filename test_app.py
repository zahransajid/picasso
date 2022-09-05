import stylize
import fastapi
from fastapi import File, UploadFile
from starlette.responses import StreamingResponse
from PIL import Image
from io import StringIO
import uuid

app = fastapi.FastAPI()
model = stylize.Model()
style_img = stylize.utils.load_img(r"stylize\style_images\Picasso1.jpg")

@app.post("/file/")
def create_upload_file(file: UploadFile = File(...)):
    content = file.file
    content_img = stylize.utils.load_img_from_bytesio(content)
    img = model.stylize(content_img, style_img)
    buf = stylize.utils.img_to_bytesio(img, format="PNG")
    return StreamingResponse(buf, media_type="image/png")
