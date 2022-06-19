import { Link } from 'react-router-dom';

import { useElectrifiedMenuStore, useElectrifiedSelectStore, useElectrifiedPageStore, useElectrifiedStore, useGestureStore } from '@store';

import './style.css';
import { MenuCloseIcon } from '@img';
import { useEffect, useState } from 'react';

function Menu() {
  const { hide, setHide } = useElectrifiedMenuStore();
  const { selectVehicle, getSelectedVehicleIndex } = useElectrifiedSelectStore();
  const { electrified_page, setMainPage } = useElectrifiedPageStore();
  const { electrifies } = useElectrifiedStore();
  const { checkGesture, noChange } = useGestureStore();
  const [ menu_animation, setMenuAnimations ] = useState<string>('menu-background-open');

  const onSelectHandler = (electrified_name: string) => {
    const electrified_index = getSelectedVehicleIndex(electrified_name, electrifies);
    const arg = {
      electrified_index,
      electrifies,
    };
    selectVehicle(electrified_name);
    setMainPage(arg);
    setHide();
  };

  const onCloseHandler = () => {
    setMenuAnimations('menu-background-close');
    setTimeout(() => {
      checkGesture(electrified_page.page_class);
      noChange();
      setHide();
      setMenuAnimations('menu-background-open');
    }, 600);
  }

  useEffect(() => {
    // setMenuAnimations('menu-background-open');
    setTimeout(() => {}, 600);
  }, [])

  return (
    <div hidden={hide} className={menu_animation}>
      <div className="menu-open-animation">
        <div className="vehicle-list">
          <h6 className="list-title white">electrified</h6>
          {electrifies &&
            electrifies.map((electrified) => (
              <li key={electrified.electrified_item_name}>
                <Link onClick={() => onSelectHandler(electrified.electrified_item_name)} to={'/vehicles'}>
                  <h3 className="list-item white">{electrified.electrified_item_name}</h3>
                </Link>
              </li>
            ))}
        </div>
        <button className="menu-close" onClick={onCloseHandler}>
          <img src={MenuCloseIcon} />
        </button>
      </div>
    </div>
  );
}

export default Menu;
