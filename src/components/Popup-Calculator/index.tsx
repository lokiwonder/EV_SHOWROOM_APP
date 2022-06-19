import * as R from 'ramda';

import './style.css';

import { PopupCloseIcon } from '@img';
import { useElectrifiedSelectStore, useElectrifiedStore, usePopupStore, useGestureStore, useElectrifiedPageStore } from '@store';
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
  const url = new URL(`/public/assets/images/${selected_electrified}/${electrified.calculation_image}`, import.meta.url).href;

  const onCloseHandler = () => {
    setContentAnimation('popup-calculator-container-close bg-light-sand');
    setTimeout(() => {
      setBgAnimation('popup-calculator-bg-close');
    }, 200);
    setTimeout(() => {
      setContentAnimation('hidden');
      setBgAnimation('hidden');
      checkGesture(electrified_page.page_class);
      closePopup();
    }, 500);
  } 

  useEffect(() => {
    setBgAnimation('popup-calculator-bg-open');
    setTimeout(() => {
      setContentAnimation('popup-calculator-container-open bg-light-sand');
    }, 200)
  }, [])

  return (
    <div className="popup-calculator">
      <div className={bg_animation}></div>
      <div className={content_animation}>
        <div>
          <button className="popup-calculator-close-btn" onClick={onCloseHandler}>
            <img className="popup-calculator-close-img" src={PopupCloseIcon}></img>
          </button>
        </div>
        <div className="popup-calculator-contents-container">
          {/* constants 로 변경 */}
          <p className="b1">Charge every</p>
          <h3 className="popup-calculator-contents-days">
            <span className="popup-calculator-contents-dats-calc">25</span> days *
          </h3>
          <img className="popup-calculator-contents-img" src={url} />
          <div className="popup-calculator-contents-range-box">
            <h6 className="primary-blue">0 km</h6>
            <input min={0} max={300} step={10} className="popup-calculator-contents-range bg-active-blue" type="range" />
            <h6 className="primary-blue">300 km</h6>
          </div>
          <h5 className="popup-calculator-contents-subtitle">Your average distance per day</h5>
          <p className="b5 sand">*Driving range may vary slightly depending on road conditions, your driving style and the temperature. It is also dependent on the type of tyres equipped.</p>
        </div>
      </div>
    </div>
  );
}

export default index;