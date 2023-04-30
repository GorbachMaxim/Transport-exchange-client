import styles from './ImagePreviewer.module.scss';
import fileIcon from '../../../../assets/icons/file-icon.svg';

interface PreviewerProps {
  title: string;
  size: number;
  onCancel: () => void;
}

export const ImagePreviewer = (props: PreviewerProps): JSX.Element => (
  // eslint-disable-next-line react/react-in-jsx-scope
  <>
    {/* eslint-disable-next-line react/react-in-jsx-scope */}
    <span className={styles.label}>Загруженные изображения</span>
    {/* eslint-disable-next-line react/react-in-jsx-scope */}
    <div className={styles.previewer}>
      {/* eslint-disable-next-line react/react-in-jsx-scope */}
      <img src={fileIcon} alt="image uploaded" />
      {/* eslint-disable-next-line react/react-in-jsx-scope */}
      <div className={styles.information}>
        {/* eslint-disable-next-line react/react-in-jsx-scope */}
        <span className={styles.fileName} title={props.title}>
          {props.title}
        </span>
        {/* eslint-disable-next-line react/react-in-jsx-scope */}
        <span className={styles.fileSize} title={`${props.size} bytes`}>
          {/* eslint-disable-next-line react/react-in-jsx-scope */}
          File size: {(props.size / 1024 / 1024).toFixed(2)} Mb
        </span>
      </div>
      {/* eslint-disable-next-line react/react-in-jsx-scope */}
      <button className={styles.cancel} onClick={(): void => props.onCancel()}>
        ×
      </button>
    </div>
  </>
);
