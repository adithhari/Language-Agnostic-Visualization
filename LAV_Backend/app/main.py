from fastapi import FastAPI, Form
from fastapi.staticfiles import StaticFiles
from app.runner.python_runner import run_python_code
from app.runner.r_runner import run_r_code
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.mount("/static", StaticFiles(directory="app/static"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this to your frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/generate-visualization")
async def generate(code: str = Form(...), language: str = Form(...)):
    print("LANGUAGE RECEIVED:", language)
    if language == "python":
        output_path = run_python_code(code)
    elif language == "r":
        output_path = run_r_code(code)
    else:
        return {"error": "Unsupported language"}

    return {"url": f"/static/{output_path}"}

