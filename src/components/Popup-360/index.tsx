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
  const url = new URL(`/public/assets/images/${selected_electrified}/${electrified.rotation_image}`, import.meta.url).href
  return (
    <div className="popup-bg">
      <div className="popup-container">
        <div>
          <button className="popup-close-btn" onClick={onCloseHandler}>            
          <img className="popup-close-img" src={PopupCloseIcon}/>
          </button>
        </div>
        <div className="popup-contents-container">
          <button><img className="popup-contents-btn" src={PopupLeftArrowIcon} /></button>
          <img className="popup-contents-img" src={url}></img>
          <button><img className="popup-contents-btn" src={PopupRightArrowIcon} /></button>
        </div>
      </div>
    </div>
  );
}

export default index;
