"""Uploads the production build to the google bucket"""
from pathlib import Path
from google.cloud import storage


def upload_blob(bucket_name, source_file_name, destination_blob_name):
    """Uploads a file to the bucket."""
    # bucket_name = "your-bucket-name"
    # source_file_name = "local/path/to/file"
    # destination_blob_name = "storage-object-name"

    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)

    blob.upload_from_filename(source_file_name)

    print(f'File {source_file_name} uploaded to {destination_blob_name}')


def upload_app(bucket_name, source_path, destination_path):
    """Uploads whole app to the bucket."""
    for path in Path(source_path).rglob('*'):
        if not path.is_dir():
            upload_blob(bucket_name, str(path), destination_path + str(path)[len(source_path):])


upload_app('quantifyme.app', '../build/', 'x/')
