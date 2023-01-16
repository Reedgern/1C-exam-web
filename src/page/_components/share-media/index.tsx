import classNames from "classnames/bind";
import { memo } from "react";
import styles from './index.module.scss';
import { TelegramShareButton, TelegramIcon, WhatsappShareButton, WhatsappIcon } from 'react-share'
import { Typography } from "@mui/material";

const cn = classNames.bind(styles);

const BLOCK_NAME = 'Share-media';

const SHARE_TITLE = 'Редактировать фотографии можно тут:';

const SHARE_INFO_TEXT = 'Вы можете поделиться этой страницей в соц сетях:';

export const ShareMedia = memo(() => {
    return (
        <div className={cn(BLOCK_NAME)}>
            <div className={cn(`${BLOCK_NAME}__text`)}>
                <Typography>{SHARE_INFO_TEXT}</Typography>
            </div>
            <div className={cn(`${BLOCK_NAME}__icons`)}>
            <TelegramShareButton title={SHARE_TITLE} url={window.location.href}>
            <TelegramIcon round />
            </TelegramShareButton>
            <WhatsappShareButton title={SHARE_TITLE} url={window.location.href}>
            <WhatsappIcon round />
            </WhatsappShareButton>
        </div>
      </div>
    )
})