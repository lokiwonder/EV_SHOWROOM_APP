import { useElectrifiedSelectStore, useElectrifiedPageStore } from '@store';

import './style.css';

function Template_3() {
  const { selected_electrified } = useElectrifiedSelectStore();
  const { electrified_page } = useElectrifiedPageStore();

  const url = new URL(`/public/assets/images/${selected_electrified}/${electrified_page.page.image}`, import.meta.url).href;

  return <img className="template-3-image" src={url} />;
}

export default Template_3;
