"""Utility to execute R scripts and save Plotly visualizations as HTML files."""
import uuid
import subprocess
from pathlib import Path

def run_r_code(code: str) -> str:
    """Runs R code that generates a Plotly figure and saves it as an HTML file."""
    output_file = f"{uuid.uuid4()}.html"
    temp_file = Path(f"/tmp/{uuid.uuid4()}.R")

    code += f"\nlibrary(plotly)\nhtmlwidgets::saveWidget(fig, file='app/static/{output_file}', selfcontained = TRUE)"
    
    temp_file.write_text(code)
    
    subprocess.run(["Rscript", str(temp_file)], check=True)
    
    return output_file
