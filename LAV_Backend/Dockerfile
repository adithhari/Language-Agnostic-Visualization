FROM rocker/r-ver:4.3.1

# Install Python & pip
RUN apt-get update && apt-get install -y python3 python3-pip

# Install system libraries for R packages and Pandoc
RUN apt-get install -y \
    libcurl4-openssl-dev libssl-dev libxml2-dev \
    libgit2-dev libharfbuzz-dev libfribidi-dev \
    libfontconfig1-dev libfreetype6-dev pkg-config build-essential \
    pandoc

# Install Python packages
RUN pip3 install fastapi uvicorn plotly python-multipart pandas

# Install R packages
RUN R -e "install.packages(c('plotly', 'ggplot2', 'htmlwidgets'), repos='https://cloud.r-project.org')"

# Copy backend app
WORKDIR /app
COPY . .

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
