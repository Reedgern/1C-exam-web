import { memo, useCallback, useRef, useState } from "react";
import AvatarEditor from 'react-avatar-editor'
import { Button, Slider, Typography } from "@mui/material";
import fileDownload from 'js-file-download'
import { FileInput } from "../file-input";

function readFile(file: any) {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.addEventListener('load', () => resolve(reader.result), false)
      reader.readAsDataURL(file)
    });
  }

export const PhotoEditor = memo(() => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    const editorRef = useRef<any>(null);

    const handleFileChange = useCallback(async (e: any) => {
        if (e.target.files && e.target.files.length > 0) {
          const file = e.target.files[0]
          let imageDataUrl = await readFile(file) as string;
    
          setImageSrc(imageDataUrl);
        }
      }, 
      []);

    const handleSaveClick = useCallback(() => {
      if (editorRef) {
        const canvasScaled: HTMLCanvasElement = editorRef.current.getImageScaledToCanvas();

        canvasScaled?.toBlob((blob) => {
          if (blob) {
            const date = new Date().toISOString();
            fileDownload(blob, `edited-image-${date}.png`);
          }
        });
      }

    }, []);

    const [zoom, setZoom] = useState<number | number[]>(1);
    
    const [rotation, setRotation] = useState<number | number[]>(0);


    if (!imageSrc) {
        return (
          <FileInput text={'Загрузить'} onChange={handleFileChange} />
        )
    };

    return (
      <div>
          <AvatarEditor
          ref={editorRef}
          image={imageSrc}
          width={250}
          height={250}
          border={50}
          scale={zoom as number}
          rotate={rotation as number}
          />
          
        <div>
          <div>
            <Typography
            variant="overline"
            >
              Масштаб
              </Typography>
              
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e, zoom) => setZoom(zoom)}
            />
          </div>
        <div>
            <Typography
              variant="overline"
            >
              Поворот
            </Typography>

            <Slider
              value={rotation}
              min={0}
              max={360}
              step={1}
              aria-labelledby="Rotation"
              onChange={(e, rotation) => setRotation(rotation)}
            />
      </div>
    </div>
      <FileInput text={'Поменять изображение'} onChange={handleFileChange} />
      <Button variant="contained" color="primary" onClick={handleSaveClick}>Save</Button>
      </div>
    )
})