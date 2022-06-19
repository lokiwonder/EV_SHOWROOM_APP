import * as R from 'ramda';

import './style.css';

import { PopupCloseIcon, PopupLeftArrowIcon, PopupRightArrowIcon } from '@img';
import { useElectrifiedSelectStore, usePopupStore, useElectrifiedStore, useGestureStore, useElectrifiedPageStore } from '@store';
import { useEffect, useState } from 'react';

function index() {
  const { electrifies } = useElectrifiedStore();
  const { selected_electrified } = useElectrifiedSelectStore();
  const { electrified_page } = useElectrifiedPageStore();
  const { checkGesture } = useGestureStore();
  const { closePopup } = usePopupStore();

  const [bg_animation, setBgAnimation] = useState<string>('hidden');
  const [content_animation, setContentAnimation] = useState<string>('hidden');

  const i = R.findIndex(R.propEq('electrified_item_name', selected_electrified))(electrifies);
  const electrified = electrifies[i];

  const onCloseHandler = () => {
    setContentAnimation('popup-360-container-close');
    setTimeout(() => {
      setBgAnimation('popup-360-bg-close');
    }, 200);
    setTimeout(() => {
      setContentAnimation('hidden');
      setBgAnimation('hidden');
      checkGesture(electrified_page.page_class);
      closePopup();
    }, 500);
  } 
  const url = new URL(`/public/assets/images/${selected_electrified}/${electrified.rotation_image}`, import.meta.url).href;
  
  useEffect(() => {
    setBgAnimation('popup-360-bg-open');
    setTimeout(() => {
      setContentAnimation('popup-360-container-open');
    }, 200)
  }, [])
  
  return (
    <div className="popup-360">
      <div className={bg_animation}></div>
      <div className={content_animation}>
        <div>
          <button className="popup-360-close-btn" onClick={onCloseHandler}>            
          <img className="popup-360-close-img" src={PopupCloseIcon}/>
          </button>
        </div>
        <div className="popup-360-contents-container">
          <button><img className="popup-360-contents-btn" src={PopupLeftArrowIcon} /></button>
          <img className="popup-360-contents-img" src={url}></img>
          <button><img className="popup-360-contents-btn" src={PopupRightArrowIcon} /></button>
        </div>
      </div>
    </div>
  );
}

export default index;
