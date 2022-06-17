import * as R from 'ramda';

import './style.css';

import { PopupCloseIcon } from '@img';
import { useElectrifiedSelectStore, useElectrifiedStore, usePopupStore, useGestureStore } from '@store';

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
  return (
    <div className="popup-bg">
      <div className="popup-container bg-light-sand">
        <div>
          <button className="popup-close-btn" onClick={closePopup}>
            <img className="popup-close-img" src={PopupCloseIcon}></img>
          </button>
        </div>
        <div className="popup-tmp-container">
          <img className="popup-tmp-img" src={new URL(`/public/assets/images/${selected_electrified}/${electrified.calculation_image}`, import.meta.url).href} />
        </div>
      </div>
    </div>
  );
}

export default index;
