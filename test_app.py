import stylize
import fastapi
from starlette.responses import StreamingResponse
from PIL import Image

app = fastapi.FastAPI()
model = stylize.Model()
image_path = None


@app.get("/image")
def image_endpoint():
    style_img = stylize.utils.load_img(
        r"stylize\style_images\Picasso1.jpg"
    )
    content_img = stylize.utils.load_img(
        image_path
    )
    img = model.stylize(content_img, style_img)
    buf = stylize.utils.img_to_bytesio(img, format="PNG")
    return StreamingResponse(buf, media_type="image/png")
