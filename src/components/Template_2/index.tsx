import { useElectrifiedPageStore, useElectrifiedSelectStore, useGestureStore } from '@store';
import { useEffect, useState } from 'react';

import './style.css';

function Template_2() {
  const { electrified_page } = useElectrifiedPageStore();
  const { selected_electrified } = useElectrifiedSelectStore();
  const { gesture, change, setChange } = useGestureStore();

  const [img_animation, setImageAnimation] = useState<string>('template-2-img');
  const [commnet_animation, setCommentAnimation] = useState<string>('display-none');

  useEffect(() => {
    if(gesture && change) {
      setImageAnimation('template-2-img template-2-img-animation');
      setTimeout(() => {
        setCommentAnimation('b2 template-2-comment template-2-comment-animation');
      }, 300);
    }
    else {
      setImageAnimation('template-2-img');
      setCommentAnimation('b2 template-2-comment')
    }
  }, [])

  return (
    <div className="template-2-container">
      <div>
        {electrified_page.page.contents.length !== 0 &&
          electrified_page.page.contents.map((content: any) => (
            <div className="template-2-item">
              <img className={img_animation} src={new URL(`/public/assets/images/${selected_electrified}/${content.image}`, import.meta.url).href} />
              <p className={commnet_animation}>{content.comment}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Template_2;
