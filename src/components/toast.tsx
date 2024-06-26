import { PropsWithChildren } from 'react';
import CloseCrossSVG from './svg/close-cross';
import ModalWindow from './modal-window';

type ToastProps = PropsWithChildren<{
  toastClasses?: string;
  toastTitleClasses?: string;
  toastTextClasses?: string;

  title: string;
  text: string; // fill according to white-spase: pre-line

  show: boolean;
  onCloseClick: () => void;
}>;

export default function Toast({ toastClasses = '', toastTitleClasses = '', toastTextClasses = '',
  title, text, show, onCloseClick: handleCloseClick, children }: ToastProps): JSX.Element {

  return (
    <ModalWindow show={show} >
      <div className={`${toastClasses} toast`}>
        <button className="close-toast-btn btn-reset" onClick={() => handleCloseClick()}>
          <CloseCrossSVG />
        </button>
        <h2 className={`${toastTitleClasses} toast-title title-reset`}>{title}</h2>
        <p className={`${toastTextClasses} toast-text paragraph-reset`}>
          {text}
        </p>
        {children}
      </div>
    </ModalWindow>
  );
}
