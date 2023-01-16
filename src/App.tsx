import React from 'react';
import './App.css';
import classnames from 'classnames/bind';
import styles from './index.module.scss';
import { PhotoEditor } from './_components/photo-editor';

const cn = classnames.bind(styles)

function App() {
  return (
    <div className={cn('App')}>
      <PhotoEditor />
    </div>
  );
}

export default App;
