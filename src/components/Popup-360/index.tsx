import * as R from 'ramda';

import './style.css';

import { PopupCloseIcon, PopupLeftArrowIcon, PopupRightArrowIcon } from '@img';
import { useElectrifiedSelectStore, usePopupStore, useElectrifiedStore, useGestureStore } from '@store';

function index() {
  const { electrifies } = useElectrifiedStore();
  const { selected_electrified } = useElectrifiedSelectStore();
  const { checkGesture, getGesture } = useGestureStore();
  const { closePopup } = usePopupStore();

  const onCloseHandler = () => {
    getGesture();
    checkGesture();
    closePopup();
  } 

  const i = R.findIndex(R.propEq('electrified_item_name', selected_electrified))(electrifies);
  const electrified = electrifies[i];
  const url = new URL(`/public/assets/images/${selected_electrified}/${electrified.rotation_image}`, import.meta.url).href;
  return (
    <div className="popup-360-bg">
      <div className="popup-360-container">
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
