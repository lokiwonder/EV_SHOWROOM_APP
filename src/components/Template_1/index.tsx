import { useElectrifiedSelectStore, useElectrifiedPageStore, usePopupStore, useGestureStore } from '@store';
import { Popup_Video } from '@components';

import './style.css';

function Template_1() {
  const { selected_electrified } = useElectrifiedSelectStore();
  const { electrified_page } = useElectrifiedPageStore();
  const { checkGesture, getGesture } = useGestureStore();
  const {popup, openPopup} = usePopupStore();

  const onVideoHandler = () => {
    checkGesture();
    getGesture();
    openPopup('video');
  }

  const url = new URL(`/public/assets/images/${selected_electrified}/${electrified_page.page.image}`, import.meta.url).href;

  return (
    <div className="container">
      <div className="contents-container">
        <div>
          <h2 className="title">{electrified_page.page.title}</h2>
          <p className="b2 comment">{electrified_page.page.comment}</p>
          <p className="b4 description">{electrified_page.page.description}</p>
        </div>
        <div className="contents-bottom">
          {electrified_page.page_class !== 'highlights' && (
            <div className="page_number">
              <h2 className="primary-blue">
                {electrified_page.page_present + 1}
                <span className="page-lenght"> /{electrified_page.page_length}</span>
              </h2>
            </div>
          )}
          {electrified_page.page.video_image && (
            <div className="vedio_img_container">
              <h6 className="primary-blue">How to charge</h6>
              <button onClick={onVideoHandler}>
                <img className="video_img" src={new URL(`/public/assets/images/${selected_electrified}/${electrified_page.page.video_image}`, import.meta.url).href} />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="img-container">
        <img className="img" src={url} />
      </div>
      {popup === 'video' && <Popup_Video video={new URL(`/public/assets/images/${selected_electrified}/${electrified_page.page.video_image}`, import.meta.url).href}/>}
    </div>
  );
}

export default Template_1;
