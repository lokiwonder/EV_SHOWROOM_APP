import { useElectrifiedMenuStore } from '@store';
import { VehicleMenuView } from '@screen';

import './style.css';
import { LanguageIcon, Logo, MenuIcon } from '@img'

function main_nav() {
  const { setShow } = useElectrifiedMenuStore();

  return (
    <>
      <nav className="nav">
        <div className="nav-left">
          <img className="logo" src={Logo} />
        </div>
        <div className="nav-right">
          <button className="mrl-15">
            <img className="nav-img-btn" src={LanguageIcon} />
          </button>
          <button className="mrl-15" onClick={setShow}>
            <img className="nav-img-btn" src={MenuIcon} />
          </button>
        </div>
      </nav>
      <VehicleMenuView />
    </>
  );
}

export default main_nav;
