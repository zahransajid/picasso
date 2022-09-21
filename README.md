# picasso

Download the model from https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2
and extract it into stylize/

The directory structure should look like this

```
stylize/
├─ magenta_arbitrary-image-stylization-v1-256_2/
│  ├─ saved_model.pb
│  ├─ assets/
│  ├─ variables/
.../

```

To install requirements and start server

```
poetry install
poetry run python -m uvicorn app:app
```

To install and start the frontend web application
```
npm install
npm start
```

Make sure you are not using the Windows Store version of the Python interpreter.
