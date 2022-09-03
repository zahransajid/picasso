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

To install requirements, run

```
python -m venv .
Scripts\Activate.ps1
pip install -r requirements.txt
```

Make sure you are not using the Windows Store version of the Python interpreter.
