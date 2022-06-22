import './style.css';

import { PopupCloseIcon, ChargingThumb } from '@img';
import { usePopupStore, useGestureStore, useElectrifiedPageStore, useElectrifiedSelectStore } from '@store';
import { useEffect, useRef, useState, LegacyRef } from 'react';

interface Props {
  video: string;
}

function index(props: Props) {
  //
  const { selected_electrified } = useElectrifiedSelectStore();
  const { electrified_page } = useElectrifiedPageStore();
  const { checkGesture } = useGestureStore();
  const { closePopup } = usePopupStore();
  const [background_animation, setBackgroundAnimation] = useState<string>('hidden');
  const [media_animation, setMediaAnimation] = useState<string>('hidden');
  const [close_btn_animation, setCloseBtnAnimation] = useState<string>('popup-close-btn hidden');

  const ref = useRef<HTMLVideoElement>(null);

  const url = (electrified: string, video: string): string => {
    return new URL(`/public/assets/videos/${electrified}/${video}`, import.meta.url).href;
  };

  const onCloseHandler = () => {
    setBackgroundAnimation('popup-video-close-animation');
    setMediaAnimation('popup-media-close');
    setCloseBtnAnimation('popup-close-btn popup-close-btn-close-animation');

    setTimeout(() => {
      setMediaAnimation('hidden');
      checkGesture(electrified_page.page_class);
      closePopup();
    }, 1180);
  };

  useEffect(() => {
    setBackgroundAnimation('popup-video-open-animation');
    setMediaAnimation('popup-media-open');
    setCloseBtnAnimation('popup-close-btn popup-close-btn-open-animation');

    ref.current.play();
  }, []);

  return (
    <div className="popup-video">
      <div className={background_animation}></div>
      <div className="popup-container-open-animation">
        <div>
          <button className={close_btn_animation} onClick={onCloseHandler}>
            <img className="popup-close-img" src={PopupCloseIcon}></img>
          </button>
        </div>
        <div className="popup-tmp-container">
          <video ref={ref} className={media_animation} poster={ChargingThumb} controls src={url(selected_electrified, electrified_page.page.video)}></video>
        </div>
      </div>
    </div>
  );
}

export default index;
