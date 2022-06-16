import { useElectrifiedSelectStore, useElectrifiedPageStore } from '@store';

import './style.css';

function Template_1() {
  const { selected_electrified } = useElectrifiedSelectStore();
  const { electrified_page } = useElectrifiedPageStore();

  const url = new URL(`/public/assets/images/${selected_electrified}/${electrified_page.page.image}`, import.meta.url).href;

  return (
    <div className="container">
      <div className="contents-container">
        <h2 className="title">{electrified_page.page.title}</h2>
        <div className="comment">
          <p className="b2 comment">{electrified_page.page.comment}</p>
        </div>
        {electrified_page.page_class !== 'highlights' && (
          <p className="b2">
            {electrified_page.page_present + 1} / {electrified_page.page_length}
          </p>
        )}
      </div>
      <div className="img-container">
        <img className="img" src={url} />
      </div>
    </div>
  );
}

export default Template_1;
