FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

COPY origin/httpbin /app

# Install HTTPBin and the optional dependencies required to run it as a service.
RUN pip install --no-cache-dir ".[mainapp]"

RUN useradd --system --no-create-home --shell /usr/sbin/nologin httpbin \
    && chown --recursive httpbin /app

USER httpbin

EXPOSE 8080

CMD ["gunicorn", "--bind", "0.0.0.0:8080", "--worker-class", "gevent", "httpbin:app"]
