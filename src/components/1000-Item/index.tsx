import * as R from 'ramda';

import { useElectrifiedStore, useGestureStore } from '@store';

import { MainButtonIcon } from '@img';
import './style.css';
import { useEffect, useState } from 'react';

//
interface Props {
  electrified_name: string;
  delay: number;
  onSelectHandler: (electrified_name: string, i: number) => void;
}

function main_item(props: Props) {
  //        variables
  const { electrifies } = useElectrifiedStore();
  const { electrified_name, delay, onSelectHandler } = props;
  const { gesture, change } = useGestureStore();
  const [ animation, setAnimation ] = useState<string>('hidden-fx');

  const i = R.findIndex(R.propEq('electrified_item_name', electrified_name))(electrifies);
  const electrified = electrifies[i];

  const url = new URL(`/public/assets/images/${electrified_name}/${electrified.main_image}`, import.meta.url).href;
  //        variables

  // description: 에니메이션 지연
  useEffect(() => {
    if(gesture && change) setTimeout(() => {setAnimation('item-animation')}, 400 * delay);
    else setAnimation('item');
  }, []);

  return (
    <div className={animation}>
      <div className="item-contents">
        <h3 className="opacity-80">{electrified.electrified_item_name}</h3>
        <div className="electrified-image-container">
          <img className="vehicle-img" src={url} />
        </div>
        <div>
          <button onClick={() => onSelectHandler(electrified_name, i)}>
            <img className="main-button-img opacity-80" src={MainButtonIcon} />
          </button>
        </div>
      </div>
    </div>
    
  );
}

export default main_item;
