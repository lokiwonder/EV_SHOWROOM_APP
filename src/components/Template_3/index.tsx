import { useElectrifiedSelectStore, useElectrifiedPageStore, useGestureStore, usetemplate_3_Store } from '@store';
import { useEffect, useState } from 'react';

import './style.css';

function Template_3() {
  const { selected_electrified } = useElectrifiedSelectStore();
  const { electrified_page } = useElectrifiedPageStore();
  const { gesture, change, setChange, noChange, checkGesture } = useGestureStore();
  const { first, setFirst, notFirst } = usetemplate_3_Store();

  const [image_animation, setImageAnimation] = useState<string>('template-3-image');

  const url = new URL(`/public/assets/images/${selected_electrified}/${electrified_page.page.image}`, import.meta.url).href;

  useEffect(() => {
    if(first && gesture && change)
      setImageAnimation(`template-3-image template-3-image-animaion`);
    else if (!first && gesture && change)
      setImageAnimation(`template-3-image template-3-image-animaion2`);
    else
      setImageAnimation('template-3-image');
  }, [])

  return <div className="template-3-image-box"><img className={image_animation} src={url} /></div>;
}

export default Template_3;
