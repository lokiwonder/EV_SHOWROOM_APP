import { useElectrifiedSelectStore, useElectrifiedPageStore, useElectrifiedMenuStore, useElectrifiedStore } from '@store';
import { VehicleMenuView } from '@screen';

import './style.css';
import { RotationIcon, BarIcon, CalculatorIcon, HomeIcon, MenuIcon } from '@img';

function main_nav() {
  const { electrifies } = useElectrifiedStore();
  const { selected_electrified, getSelectedVehicleIndex, resetSelectVehicle } = useElectrifiedSelectStore();
  const { electrified_page, setMainPage } = useElectrifiedPageStore();
  const { setHighlightPage, setChargingPage, setBenefitPage, resetElectrifiedPage } = useElectrifiedPageStore();
  const { setShow } = useElectrifiedMenuStore();

  const electrified_index = getSelectedVehicleIndex(selected_electrified, electrifies);
  const index_arg = { electrified_index, electrifies };

  const onHomeHandler = () => {
    resetSelectVehicle();
    resetElectrifiedPage();
  };

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
            <button className={'nav-center-item'} onClick={() => setHighlightPage(index_arg)}>
              <h6 className={electrified_page.page_class === 'main' ? '' : electrified_page.page_class === 'highlights' ? 'active' : 'passive'}>Highlights</h6>
            </button>
            <button className={'nav-center-item'} onClick={() => setChargingPage(index_arg)}>
              <h6 className={electrified_page.page_class === 'main' ? '' : electrified_page.page_class === 'charging' ? 'active' : 'passive'}>Charging</h6>
            </button>
            <button className={'nav-center-item'} onClick={() => setBenefitPage(index_arg)}>
              <h6 className={electrified_page.page_class === 'main' ? '' : electrified_page.page_class === 'benefits' ? 'active' : 'passive'}>Benefits</h6>
            </button>
          </div>
        </div>
        <div className="nav-right">
          <button>
            <img className="nav-img" src={RotationIcon} />
          </button>
          <button>
            <img className="nav-img" src={CalculatorIcon} />
          </button>
          <button onClick={() => setShow()}>
            <img className="menu-img" src={MenuIcon} />
          </button>
        </div>
      </nav>
      <VehicleMenuView />
    </>
  );
}

export default main_nav;
