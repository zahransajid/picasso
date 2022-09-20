import axios from 'axios'

const base_api = axios.create({
    baseURL: 'http://localhost:8000/',
    timeout: 5000,
    timeoutErrorMessage: "Network Error"
})

export const send_files = async (image_dir: File, style_dir: string) => {
    const config = {headers: {
        'Accept': 'application/json',
        "content-type": "multipart/form-data"
      }}
    const formData = new FormData();
    formData.append("style", style_dir);
    formData.append("image", image_dir);
    const res = await base_api.post("stylize", formData, config);
    return res.data;
}

export const get_styles = async () : Promise<Array<{id: string, title: any; file: any; description: any;}>> => {
    const res =  await base_api.get("styles/info");
    return res.data;
}

export const get_style_image_path = (image_code: string) => {
    return base_api.defaults.baseURL + "styles/image/" + image_code
}


export default {
    send_files,
    get_styles,
    get_style_image_path,
}
