FROM python:3.11.2-slim

# set work directory
WORKDIR /app

# set env variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install fastapi
RUN pip install "uvicorn[standard]"
RUN pip install asyncpg
# copy project
COPY . .