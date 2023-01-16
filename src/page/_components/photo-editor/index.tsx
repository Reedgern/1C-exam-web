import { memo, useCallback, useEffect, useRef, useState } from "react";
import AvatarEditor from 'react-avatar-editor'
import { Button, Slider, Typography } from "@mui/material";
import fileDownload from 'js-file-download'
import { FileInput } from "../file-input";
import styles from './index.module.scss';
import classNames from "classnames/bind";
import { readFile } from "./_utils/read-file";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { TelegramShareButton, TelegramIcon } from 'react-share'

const cn = classNames.bind(styles);

const BLOCK_NAME = 'Photo-editor';

type PropsType = {
  id?: string;
}

const INFO_TEXT = 'Чтобы начать работать с редактором, нужно загрузить фото с Вашего устройства.'


export const PhotoEditor = memo(({ id }: PropsType) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getRequest = async () => {
      if (!id) {
        return;
      }

      const { data } = await axios.get(`http://localhost:8081/image?id=${id}`);

      if (!data.error) {
        setImageSrc(decodeURIComponent(data.data.dataUrl));
      }
      else {
        navigate('/');

      }
    }

    getRequest();
  }, [id, navigate]);

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
    if (editorRef.current) {
      const canvasScaled: HTMLCanvasElement = editorRef.current.getImageScaledToCanvas();

      canvasScaled?.toBlob(async (blob) => {
        if (blob) {
          const date = new Date().toISOString();
          fileDownload(blob, `edited-image-${date}.png`);
        }
      });
    }
  }, []);

  const handleShareMedia = useCallback(async () => {
    if (editorRef.current) {
      const canvasScaled: HTMLCanvasElement = editorRef.current.getImageScaledToCanvas();

      canvasScaled?.toBlob(async (blob) => {
        if (blob) {
          const file = new File([blob], 'edited-image.png', {type: 'image/png'});

          let formData = new FormData();
          formData.append('blob', file);

          const { data } = await axios.post('http://localhost:8081/image', formData, {
            headers: {
              'Content-Type': `multipart/form-data`,
            },
         });

         console.log(data);
        }
      });

      // const dataUrl = canvasScaled.toDataURL();

      // const { data } = await axios.post('http://localhost:8081/image', { dataUrl: encodeURIComponent(dataUrl) });

      // if (!data.error) {
      //   console.log(data.data.id);
      //   window.open(`http://localhost:3000/${data.data.id}`, '_blank');
      // }
    }
  }, []);

  const [zoom, setZoom] = useState<number | number[]>(1);
  
  const [rotation, setRotation] = useState<number | number[]>(0);

  if (!imageSrc) {
      return (
        <div className={cn(BLOCK_NAME)}>
          <Typography>{INFO_TEXT}</Typography>
          <div className={cn(`${BLOCK_NAME}__upload`)}>
            <FileInput text={'Загрузить'} onChange={handleFileChange} />
          </div>
        </div>
      )
  };

  return (
    <div className={cn(BLOCK_NAME)}>
      <AvatarEditor
        className={cn(`${BLOCK_NAME}__canvas`)}
        ref={editorRef}
        image={imageSrc}
        width={700}
        height={400}
        border={25}
        scale={zoom as number}
        rotate={rotation as number}
      />
      <div className={cn(`${BLOCK_NAME}__scrolls-container`)}>
        <div className={cn(`${BLOCK_NAME}__scroll-row`)}>
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
        <div className={cn(`${BLOCK_NAME}__scroll-row`)}>
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
    <div className={cn(`${BLOCK_NAME}__buttons-container`)}>
      <FileInput text={'Поменять изображение'} onChange={handleFileChange} />
      <Button variant="contained" color="primary" onClick={handleSaveClick}>Сохранить</Button>
    </div>
    <TelegramIcon round onClick={handleShareMedia} />
  </div>
  )
})