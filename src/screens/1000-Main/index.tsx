import { MouseEvent, useState, useEffect } from 'react';

import { MainNav, VehicleNav } from '@nav';
import { Item, Template_1, Template_2, Template_3 } from '@components';
import { useElectrifiedSelectStore, useElectrifiedPageStore, useElectrifiedStore, useGestureStore } from '@store';
import { RightArrowIcon, HandNextIcon, HandPreviousIcon } from '@img';

import './style.css';

function main() {
  const { electrifies } = useElectrifiedStore();
  const { selected_electrified, getSelectedVehicleIndex } = useElectrifiedSelectStore();
  const { electrified_page, setMainPage, setChargingPage, setBenefitPage, increasePage, decreasePage } = useElectrifiedPageStore();
  const { gesture, getGesture, notGesture } = useGestureStore();

  const electrified_index = getSelectedVehicleIndex(selected_electrified, electrifies);
  const index_arg = { electrified_index, electrifies };

  const [next, setNext] = useState<boolean>(true);

  let mouseX = 0;

  // description: 화면을 눌렀을 때 (때지 않음)
  const touchStart = (e: MouseEvent<HTMLDivElement>) => {
    mouseX = e.clientX;
    getGesture();
    clearTimeout();
  };

  // todo: 훅으로 전환
  // description: 화면에서 땠을 때
  const touchEnd = (e: MouseEvent<HTMLDivElement>) => {
    // description: 오른쪽에서 왼쪽으로
    if (mouseX >= window.innerWidth / 2) {
      // description: 다음 화면으로 이동
      if (mouseX - e.clientX > window.innerWidth / 5) {
        // description: 페이지가 길이 - 1 낮으면 화면 전환
        if (electrified_page.page_present < electrified_page.page_length - 1) increasePage(index_arg);
        // description: 페이지가 길이 - 1 이면 오른쪽 설명 창 띄움 (state 먹이기) (false)
        else if (next && electrified_page.page_present == electrified_page.page_length - 1) setNext(false);
        // description: state가 false 이면 true 로 바꾸고 다음 창으로 전환
        else if (!next) {
          if (electrified_page.page_class === 'highlights') {
            // todo: constants로 변경
            // description: 현재 페이지가 highlights 일 때
            setNext(true);
            setChargingPage(index_arg);
          }
          // description: 현재 페이지가 charging 일 때
          else if (electrified_page.page_class === 'charging') {
            setNext(true);
            setBenefitPage(index_arg);
          }
          // description: 현재 페이지가 benefits 일 때
          else if (electrified_page.page_class === 'benefits') {
            setNext(true);
            setMainPage(index_arg);
          }
        }
      }
    }
    // description: 왼쪽에서 오른쪽으로
    else if (mouseX <= window.innerWidth / 2) {
      // description: 이전 화면으로 이동 (메인이 아니면)
      if ((mouseX - e.clientX) * -1 > window.innerWidth / 5) {
        // description: 페이지가 0보다 크면 화면 전환
        if (electrified_page.page_present > 0) decreasePage(index_arg);
      }
    }
  };

  useEffect(() => {
    if (gesture) setTimeout(() => notGesture(), 10000);
  }, [gesture]);

  new URL(`/public/assets/images/${selected_electrified}/${electrified_page.page.image}`, import.meta.url).href;

  return (
    <>
      {!selected_electrified ? (
        <div className="fx main-background">
          {electrifies && electrifies.map((electrified) => <Item electrified_name={electrified.electrified_item_name} />)}
          <MainNav />
        </div>
      ) : (
        <>
          {electrified_page.page_class === 'main' ? (
            <div className="vehicle-main-img-container">
              <img className="vehicle-main-img" src={new URL(`/public/assets/images/${selected_electrified}/${electrified_page.page.image}`, import.meta.url).href} />
            </div>
          ) : (
            <div onMouseDown={touchStart} onMouseUp={touchEnd}>
              {!next && (
                <div className="next-slide bg-primary-blue">
                  <div>
                    <h3 className="white">
                      Next&nbsp;
                      <img className="right-arrow" src={RightArrowIcon} />
                    </h3>
                    <p className="b2 white next-slide-content">Full Electric</p>
                  </div>
                </div>
              )}
              {!gesture && (
                <div className="gesture-guide">
                  <img src={HandPreviousIcon} />
                  <img src={HandNextIcon} />
                </div>
              )}
              {electrified_page.page.type === 'template_1' && <Template_1 />}
              {electrified_page.page.type === 'template_2' && <Template_2 />}
              {electrified_page.page.type === 'template_3' && <Template_3 />}
            </div>
          )}
          <VehicleNav />
        </>
      )}
    </>
  );
}

export default main;
