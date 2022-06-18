import * as R from 'ramda';

import './style.css';

import { PopupCloseIcon, PopupLeftArrowIcon, PopupRightArrowIcon } from '@img';
import { useElectrifiedSelectStore, usePopupStore, useElectrifiedStore, useGestureStore, useElectrifiedPageStore } from '@store';

function index() {
  const { electrifies } = useElectrifiedStore();
  const { selected_electrified } = useElectrifiedSelectStore();
  const { electrified_page } = useElectrifiedPageStore();
  const { checkGesture } = useGestureStore();
  const { closePopup } = usePopupStore();

  const i = R.findIndex(R.propEq('electrified_item_name', selected_electrified))(electrifies);
  const electrified = electrifies[i];

  const onCloseHandler = () => {
    checkGesture(electrified_page.page_class);
    closePopup();
  } 
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
