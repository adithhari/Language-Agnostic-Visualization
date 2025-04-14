import uuid
import subprocess
from pathlib import Path

def run_python_code(code: str) -> str:
    output_file = f"{uuid.uuid4()}.html"
    temp_file = Path(f"/tmp/{uuid.uuid4()}.py")
    
    code += f"\nimport plotly.io as pio\npio.write_html(fig, file='app/static/{output_file}', auto_open=False)"
    
    temp_file.write_text(code)
    
    subprocess.run(["python3", str(temp_file)], check=True)
    
    return output_file
