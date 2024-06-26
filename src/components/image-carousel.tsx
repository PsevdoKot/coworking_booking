import { useState } from 'react';
import getImageURL from '../shared/get-image-url';

type ImageCarouselProps = {
  wrapperClasses?: string;
  leftButtonClasses?: string;
  rightButtonClasses?: string;
  imageClasses?: string;
  bulletContainerClasses?: string;
  bulletClasses?: string;

  imageAlt: string;
  mainImage?: string;
  images: string[];
};

export default function ImageCarousel({ wrapperClasses = '', leftButtonClasses = '', rightButtonClasses = '',
  imageClasses = '', bulletContainerClasses = '', bulletClasses = '',
  imageAlt, mainImage, images }: ImageCarouselProps): JSX.Element {
  const leftBorder = 0; // 0 = avatar
  const rightBorder = images.length;

  const [onLeftBorder, setOnLeftBorder] = useState(true);
  const [onRightBorder, setOnRightBorder] = useState(leftBorder === rightBorder);

  const [, setCurrentImageNumber] = useState(leftBorder);
  const [currentImageURL, setCurrentImageURL] = useState(getImageURL(mainImage));

  const updateCurrentImage = (currentNumber: number) => {
    if (currentNumber <= leftBorder) {
      setCurrentImageURL(getImageURL(mainImage));
    } else {
      setCurrentImageURL(getImageURL(images[currentNumber - 1]));
    }
  };

  const handlePreviousImageClick = () => {
    setCurrentImageNumber((prev) => {
      if (onLeftBorder) {
        return leftBorder;
      }

      const newValue = prev - 1;
      setOnLeftBorder(newValue <= leftBorder);
      setOnRightBorder(false);
      updateCurrentImage(newValue);
      return newValue;
    });
  };
  const handleNextImageClick = () => {
    setCurrentImageNumber((prev) => {
      if (onRightBorder) {
        return rightBorder;
      }

      const newValue = prev + 1;
      setOnLeftBorder(false);
      setOnRightBorder(newValue >= rightBorder);
      updateCurrentImage(newValue);
      return newValue;
    });
  };

  return (
    <div className={`${wrapperClasses} image-carousel`}>
      <button className={`${leftButtonClasses} image-carousel__left-btn btn-reset`}
        onClick={handlePreviousImageClick} disabled={onLeftBorder}
      />
      <img className={`${imageClasses} image-carousel__image`} src={currentImageURL} alt={imageAlt} />
      <button className={`${rightButtonClasses} image-carousel__right-btn btn-reset`}
        onClick={handleNextImageClick} disabled={onRightBorder}
      />
      <div className={`${bulletContainerClasses} image-carousel__bullets`}>
        <span className={`${bulletClasses} image-carousel__bullet ${onLeftBorder ? 'image-carousel__bullet--active' : ''}`} />
        <span className={`${bulletClasses} image-carousel__bullet ${onLeftBorder || onRightBorder ? '' : 'image-carousel__bullet--active'}`} />
        <span className={`${bulletClasses} image-carousel__bullet ${onRightBorder ? 'image-carousel__bullet--active' : ''}`} />
      </div>
    </div>
  );
}
