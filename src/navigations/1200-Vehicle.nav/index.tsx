import { useElectrifiedSelectStore, useElectrifiedPageStore, useElectrifiedMenuStore, useElectrifiedStore, useGestureStore, usePopupStore } from '@store';
import { VehicleMenuView } from '@screen';

import './style.css';
import { RotationIcon, BarIcon, CalculatorIcon, HomeIcon, MenuIcon } from '@img';

function main_nav() {
  const { electrifies } = useElectrifiedStore();
  const { selected_electrified, getSelectedVehicleIndex, resetSelectVehicle } = useElectrifiedSelectStore();
  const { electrified_page, setMainPage } = useElectrifiedPageStore();
  const { setHighlightPage, setChargingPage, setBenefitPage, resetElectrifiedPage } = useElectrifiedPageStore();
  const { setShow } = useElectrifiedMenuStore();
  const { checkGesture, getGesture } = useGestureStore();
  const { openPopup } = usePopupStore();

  const electrified_index = getSelectedVehicleIndex(selected_electrified, electrifies);
  const index_arg = { electrified_index, electrifies };

  const onHomeHandler = () => {
    resetSelectVehicle();
    resetElectrifiedPage();
  };

  const onHighlightsHandler = () => {
    checkGesture();
    getGesture();
    setHighlightPage(index_arg);
  }

  const onChargingHandler = () => {
    checkGesture();
    getGesture();
    setChargingPage(index_arg);
  }

  const onBenefitsHandler = () => {
    checkGesture();
    getGesture();
    setBenefitPage(index_arg);
  }

  const on360Handler = () => {
    checkGesture();
    getGesture();
    openPopup('360');
  }

  const onCalculationsHandler = () => {
    checkGesture();
    getGesture();
    openPopup('calculator');
  }

  const onElectrifiedMenuHandler = () => {
    checkGesture();
    getGesture();
    setShow();
  }

  return (
    <>
      {electrified_page.page_class !== '' && electrified_page.page_class !== 'main' && <progress value={electrified_page.page_present + 1} max={electrified_page.page_length}></progress>}
      <nav className="nav">
        <div className="nav-left">
          <button onClick={() => onHomeHandler()}>
            <img className="nav-img" src={HomeIcon} />
          </button>
          <img className="left-bar" src={BarIcon} />
          <button onClick={() => setMainPage(index_arg)}>
            <h6>{selected_electrified}</h6>
          </button>
        </div>
        <div className="nav-center">
          <div>
            <button className={'nav-center-item'} onClick={onHighlightsHandler}>
              <h6 className={electrified_page.page_class === 'main' ? '' : electrified_page.page_class === 'highlights' ? 'active' : 'passive'}>Highlights</h6>
            </button>
            <button className={'nav-center-item'} onClick={onChargingHandler}>
              <h6 className={electrified_page.page_class === 'main' ? '' : electrified_page.page_class === 'charging' ? 'active' : 'passive'}>Charging</h6>
            </button>
            <button className={'nav-center-item'} onClick={onBenefitsHandler}>
              <h6 className={electrified_page.page_class === 'main' ? '' : electrified_page.page_class === 'benefits' ? 'active' : 'passive'}>Benefits</h6>
            </button>
          </div>
        </div>
        <div className="nav-right">
          <button onClick={on360Handler}>
            <img className="nav-img" src={RotationIcon} />
          </button>
          <button onClick={onCalculationsHandler}>
            <img className="nav-img" src={CalculatorIcon} />
          </button>
          <button onClick={onElectrifiedMenuHandler}>
            <img className="menu-img" src={MenuIcon} />
          </button>
        </div>
      </nav>
      <VehicleMenuView />
    </>
  );
}

export default main_nav;
