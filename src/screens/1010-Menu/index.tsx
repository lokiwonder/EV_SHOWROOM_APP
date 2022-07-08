import { Link } from 'react-router-dom';

import { useElectrifiedMenuStore, useElectrifiedSelectStore, useElectrifiedPageStore, useElectrifiedStore, useGestureStore, useSettingStore } from '@store';

import './style.css';
import { MenuCloseIcon } from '@img';
import { useEffect, useState } from 'react';

function Menu() {
  const { hide, setHide } = useElectrifiedMenuStore();
  const { setting } = useSettingStore();
  const { selectVehicle, getSelectedVehicleIndex } = useElectrifiedSelectStore();
  const { electrified_page, setMainPage } = useElectrifiedPageStore();
  const { electrifies } = useElectrifiedStore();
  const { checkGesture, noChange, setChange } = useGestureStore();
  const [menu_animation, setMenuAnimations] = useState<string>('hidden');

  const onSelectHandler = (electrified_name: string) => {
    setMenuAnimations('menu-background-close');
    setTimeout(() => {
      const electrified_index = getSelectedVehicleIndex(electrified_name, electrifies);
      const arg = {
        electrified_index,
        electrifies,
      };
      selectVehicle(electrified_name);
      setMainPage(arg);
      setHide();
      setChange();
    }, 580);
  };

  const onCloseHandler = () => {
    setMenuAnimations('menu-background-close');
    setTimeout(() => {
      checkGesture(electrified_page.page_class);
      noChange();
      setHide();
      setMenuAnimations('menu-background-open');
    }, 580);
  };

  useEffect(() => {
    setMenuAnimations('menu-background-open');
    setTimeout(() => {}, 600);
  }, []);

  return (
    <div hidden={hide} className={menu_animation}>
      <div className="menu-open-animation">
        <div className="vehicle-list">
          <h6 className="list-title white">electrified</h6>
          {electrifies &&
            electrifies.map((electrified) => (
              <li key={electrified.electrified_item_name}>
                <h3 onClick={() => onSelectHandler(electrified.electrified_item_name)} className="list-item white">
                  {electrified.electrified_item_name}
                </h3>
              </li>
            ))}
        </div>
        <div className="version-text">
          <p className="b6 opacity-70 white">{`Country ${setting.nation} / Language en / APP v${setting.app_version} / Electirified v${setting.electrified_version} / Translation v${setting.translation_version}`}</p>
        </div>
        <button className="menu-close" onClick={onCloseHandler}>
          <img src={MenuCloseIcon} />
        </button>
      </div>
    </div>
  );
}

export default Menu;
