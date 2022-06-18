import { useElectrifiedPageStore, useElectrifiedSelectStore, useGestureStore } from '@store';
import { useEffect, useState } from 'react';

import './style.css';

function Template_2() {
  const { electrified_page } = useElectrifiedPageStore();
  const { selected_electrified } = useElectrifiedSelectStore();
  const { gesture, change, setChange, noChange, checkGesture } = useGestureStore();

  const [img_animation, setImageAnimation] = useState<string>('template-2-img');
  const [commnet_animation, setCommentAnimation] = useState<string>('display-none');

  useEffect(() => {
    if ( window.innerWidth / window.innerHeight < 1.777 ) {
      if(gesture && change) {
        setImageAnimation('template-2-img-w template-2-img-animation');
        setTimeout(() => {
          setCommentAnimation('b2 template-2-comment-w template-2-comment-animation');
        }, 400)
      }
      else {
        setImageAnimation('template-2-img-w');
        setCommentAnimation('b2 template-2-comment-w')
      }
    } else {
      if(gesture && change) {
        setImageAnimation('template-2-img-h template-2-img-animation');
        setTimeout(() => {
          setCommentAnimation('b2 template-2-comment-h template-2-comment-animation');
        }, 400)
      }
      else {
        setImageAnimation('template-2-img-h');
        setCommentAnimation('b2 template-2-comment-h')
      }
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
