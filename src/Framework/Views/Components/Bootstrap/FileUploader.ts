export interface Props {
  mimeType?: string;
  onLoad?: (e: ProgressEvent<XMLHttpRequestEventTarget>) => void;
  onProgress?: (e: ProgressEvent<XMLHttpRequestEventTarget>) => void;
  url: string;
}

export class FileUploader {
  private xhr: XMLHttpRequest;

  constructor({ mimeType, url, onLoad, onProgress }: Props) {
    this.xhr = new XMLHttpRequest();

    if (onProgress) {
      this.xhr.upload.addEventListener('progress', onProgress, false);
    }

    if (onLoad) {
      this.xhr.upload.addEventListener('load', onLoad, false);
    }

    this.xhr.open('POST', url, true);

    if (mimeType) {
      this.xhr.overrideMimeType(mimeType);
    }
  }

  upload(file: File) {
    const reader = new FileReader();
    reader.onload = (evt: ProgressEvent<FileReader>) => {
      if (evt.target) {
        this.xhr.send(evt.target.result);
      }
    };
    reader.readAsBinaryString(file);
  }
}
