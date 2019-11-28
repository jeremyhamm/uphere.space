FROM python:latest

# Create tracking directory
WORKDIR /tracking

# Run populate_tle.py
COPY /server/tracking/populate_tle.py .

#RUN pip3 install -r skyfield
RUN pip3 install --upgrade pip && \
    pip3 install skyfield && \
    pip3 install redis

CMD ["python3", "populate_tle.py"]