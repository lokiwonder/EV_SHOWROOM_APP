import { useElectrifiedPageStore, useElectrifiedSelectStore } from '@store';

import './style.css';

function Template_2() {
  const { electrified_page } = useElectrifiedPageStore();
  const { selected_electrified } = useElectrifiedSelectStore();

  return (
    <div className="template-2-container">
      <div>
        {electrified_page.page.contents.length !== 0 &&
          electrified_page.page.contents.map((content: any) => (
            <div className="template-2-item">
              <img className="template-2-img" src={new URL(`/public/assets/images/${selected_electrified}/${content.image}`, import.meta.url).href} />
              <p className="b2 template-2-comment">{content.comment}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Template_2;
