import { Typography } from '@mui/material';
import classnames from 'classnames/bind';
import styles from './index.module.scss';
import { PhotoEditor } from './_components/photo-editor';
import { memo } from 'react';
import { ShareMedia } from './_components/share-media';

const cn = classnames.bind(styles);

const BLOCK_NAME = 'App';

const Page = memo(() => {
  return (
    <div className={cn(BLOCK_NAME)}>
      <div className={cn(`${BLOCK_NAME}__header`)}>
        <Typography>Редактор изображений</Typography>
      </div>
      <PhotoEditor />
      <ShareMedia />
    </div>
  );
})

export const App = () => {
  return (
      // <Routes>
      //   <Route path=':imageUrl?' element={<Page />}>
      //   </Route>
      // </Routes>
      <Page />
  );
}
