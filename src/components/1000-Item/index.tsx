import * as R from 'ramda';

import {useElectrifiedSelectStore, useElectrifiedPageStore, useElectrifiedStore} from '@store'

import { MainButtonIcon } from '@img';
import './style.css'

interface Props {
  electrified_name: string;
}

function main_item(props: Props) {
  
  //        variables        
  const { electrifies } = useElectrifiedStore();
  const { selectVehicle } = useElectrifiedSelectStore();
  const { setMainPage } = useElectrifiedPageStore();
  const { electrified_name } = props;

  const i = R.findIndex(R.propEq('electrified_item_name', electrified_name))(electrifies);
  const electrified = electrifies[i];

  const url = new URL(`/public/assets/images/${electrified_name}/${electrified.main_image}`, import.meta.url).href
  //        variables        

  //        function        
  const onSelectHandler = (vehicle_name: string) => {
    selectVehicle(vehicle_name);
    setMainPage({electrified_index: i, electrifies});
  }
  //        function        

  return (
    <div className="item">
      <div className="item-contents">
        <h3>{electrified.electrified_item_name}</h3>
        <img className="vehicle-img" src={url}/>
        <div>
          <button onClick={() => onSelectHandler(electrified_name)}>
            <img className="main-button-img" src={MainButtonIcon} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default main_item;
