import { Link } from 'react-router-dom';

import { useElectrifiedMenuStore, useElectrifiedSelectStore, useElectrifiedPageStore, useElectrifiedStore } from '@store';
import data from '@data';

import './style.css';
import { MenuCloseIcon } from '@img';

function Menu() {
  const { hide, setHide } = useElectrifiedMenuStore();
  const { selectVehicle, getSelectedVehicleIndex } = useElectrifiedSelectStore();
  const { setMainPage } = useElectrifiedPageStore();
  const { electrifies } = useElectrifiedStore();

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

  return (
    <div hidden={hide} className="background">
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
      <button className="menu-close" onClick={setHide}>
        <img src={MenuCloseIcon} />
      </button>
    </div>
  );
}

export default Menu;
