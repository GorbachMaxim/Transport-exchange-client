import React from 'react';
import { checkImageFile } from '../../core/utils/checkImageFile';
import loaderImage from '../../assets/icons/file-icon.svg';
import styles from './ImageEditor.module.scss';

interface ImageEditorProps {
  onLoad: (image: string | null) => void;
  className?: string;
}

const ImageEditor = (props: ImageEditorProps) => {
  const onLoadFile = (newFile: File): void => {
    const reader: FileReader = new FileReader();
    reader.onloadend = () => props.onLoad(reader.result?.toString() || null);
    reader.readAsDataURL(newFile);
  };

  const onInputLoad = (
    event: React.SyntheticEvent<HTMLInputElement, Event>,
  ): void => {
    checkImageFile(event.currentTarget.files) &&
      onLoadFile(event.currentTarget.files![0]);
  };

  return (
    <label className={`${styles.imageEditor} ${props.className || ''}`}>
      <img src={loaderImage} alt="loader" />
      <input
        type="file"
        className={styles.input}
        accept="image/png, image/gif, image/jpeg"
        onChange={onInputLoad}
      />
    </label>
  );
};

export default ImageEditor;
