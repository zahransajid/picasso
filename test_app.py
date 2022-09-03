import stylize
import fastapi
from starlette.responses import StreamingResponse
from PIL import Image

app = fastapi.FastAPI()
model = stylize.Model()

@app.get("/image")
def image_endpoint():
    style_img = stylize.utils.load_img(
        r"C:\Users\zahra\Documents\Python3\StyleTransfer\tfST\stylize\style_images\Pooh1.jpg"
    )
    content_img = stylize.utils.load_img(
        r"C:\Users\zahra\Documents\Python3\StyleTransfer\tfST\content_images\minecraft.jpg"
    )
    img = model.stylize(content_img, style_img)
    buf = stylize.utils.img_to_bytesio(img, format="PNG")
    return StreamingResponse(buf, media_type="image/png")
