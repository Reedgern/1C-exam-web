import { Button } from "@mui/material";
import classNames from "classnames/bind"
import React, { memo, useCallback, useRef } from "react"
import styles from './index.module.scss';

const cn = classNames.bind(styles);

const BLOCK_NAME = 'File-input'

  type PropsType = {
    onChange: (event: any) => void;
    text: string;
  }

export const FileInput = memo(({onChange, text}: PropsType) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, []);

  return (
    <div className={cn(BLOCK_NAME)}>
        <input ref={inputRef} className={cn(`${BLOCK_NAME}__input`)} type="file" onChange={onChange} accept="image/*" />

        <div>
          <Button onClick={handleButtonClick} variant="contained" color="primary">{text}</Button>
        </div>
    </div>
    )
})