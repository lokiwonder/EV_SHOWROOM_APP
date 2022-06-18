import './style.css';

import { PopupCloseIcon } from '@img';
import { usePopupStore, useGestureStore, useElectrifiedPageStore } from '@store';

interface Props {
  video: string;
}

function index(props: Props) {
  const { video } = props;
  const { electrified_page } = useElectrifiedPageStore();
  const { checkGesture } = useGestureStore();
  const { closePopup } = usePopupStore();

  const onCloseHandler = () => {
    checkGesture(electrified_page.page_class);
    closePopup();
  } 

  return (
    <div className="popup-bg">
      <div className="popup-container bg-light-sand">
        <div>
          <button className="popup-close-btn" onClick={onCloseHandler}>
            <img className="popup-close-img" src={PopupCloseIcon}></img>
          </button>
        </div>
        <div className="popup-tmp-container">
          <img className="popup-tmp-img" src={video} />
        </div>
      </div>
    </div>
  );
}

export default index;
