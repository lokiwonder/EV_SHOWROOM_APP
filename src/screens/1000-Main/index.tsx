import { MouseEvent, useEffect, useState } from 'react';

import { MainNav, VehicleNav } from '@nav';
import { Item, Template_1, Template_2, Template_3, Popup_360, Popup_Calculator } from '@components';
import { useElectrifiedSelectStore, useElectrifiedPageStore, useElectrifiedStore, useGestureStore, usePopupStore, usetemplate_3_Store } from '@store';
import { RightArrowIcon, HandNextIcon, HandPreviousIcon } from '@img';

import './style.css';

import * as R from 'ramda';

function main() {
  //                variable                //
  //                variable                //
  const { electrifies } = useElectrifiedStore();
  const { selected_electrified, selectVehicle, getSelectedVehicleIndex } = useElectrifiedSelectStore();
  const { electrified_page, setMainPage, setChargingPage, setBenefitPage, increasePage, decreasePage } = useElectrifiedPageStore();
  const { gesture, change,  checkGesture, setChange, noChange } = useGestureStore();
  const { popup } = usePopupStore();
  const { first, setFirst, notFirst } = usetemplate_3_Store();

  const electrified_index = getSelectedVehicleIndex(selected_electrified, electrifies);
  const index_arg = { electrified_index, electrifies };

  const [next, setNext] = useState<boolean>(true);

  // ? 이거 뭐지???
  new URL(`/public/assets/images/${selected_electrified}/${electrified_page.page.image}`, import.meta.url).href;
  const i = R.findIndex(R.propEq('electrified_item_name', selected_electrified))(electrifies);
  const electrified = electrifies[i];

  let mouseX = 0;
  //                variable                //
  //                variable                //
  

  //                function                //
  //                function                //
  // description: 클릭시 화면 제스쳐
  const onActionHandler = () => checkGesture(electrified_page.page_class)

  // description: 화면을 눌렀을 때 (때지 않음)
  const touchStart = (e: MouseEvent<HTMLDivElement>) => mouseX = e.clientX;

  // todo: 훅으로 전환
  // description: 화면에서 땠을 때
  const touchEnd = (e: MouseEvent<HTMLDivElement>) => {
    // description: 오른쪽에서 왼쪽으로
    if (mouseX >= window.innerWidth / 2) {
      // description: 다음 화면으로 이동
      if (mouseX - e.clientX > window.innerWidth / 5) {
        // description: 페이지가 길이 - 1 낮으면 화면 전환
        if (electrified_page.page_present < electrified_page.page_length - 1) {
          // description: 만약 화면이 template_3이면 
          if (electrified_page.page.type === 'template_3') notFirst();
          else setFirst();
          setNext(true);
          increasePage(index_arg);
          setChange();
        }
        // description: 페이지가 길이 - 1 이면 오른쪽 설명 창 띄움 (state 먹이기) (false)
        else if (next && electrified_page.page_present == electrified_page.page_length - 1) {
          setNext(false);
          noChange();
        }
        // description: state가 false 이면 true 로 바꾸고 다음 창으로 전환
        else if (!next) {
          if (electrified_page.page_class === 'highlights') {
            // todo: constants로 변경
            // description: 현재 페이지가 highlights 일 때
            if (electrified_page.page.type === 'template_3') notFirst();
            else setFirst();
            setNext(true);
            setChargingPage(index_arg);
            setChange();
          }
          // description: 현재 페이지가 charging 일 때
          else if (electrified_page.page_class === 'charging') {
            if (electrified_page.page.type === 'template_3') notFirst();
            else setFirst();
            setNext(true);
            setBenefitPage(index_arg);
            setChange();
          }
          // description: 현재 페이지가 benefits 일 때
          else if (electrified_page.page_class === 'benefits') {
            if (electrified_page.page.type === 'template_3') notFirst();
            else setFirst();
            setNext(true);
            setMainPage(index_arg);
            setChange();
          }
        }
      }
    }
    // description: 왼쪽에서 오른쪽으로
    else if (mouseX <= window.innerWidth / 2) {
      // description: 이전 화면으로 이동 (메인이 아니면서 페이지가 0보다 크면 화면 전환)
      if ((mouseX - e.clientX) * -1 > window.innerWidth / 5 && electrified_page.page_present > 0) {
          setNext(true);
          decreasePage(index_arg);
          setChange();
      }
    }
    checkGesture(electrified_page.page_class);
  };
  //                function                //
  //                function                //

  //                component                //
  //                component                //
  // description:
  const ShowroomMainComponent = () => {
    const [animation, setAnimation] = useState<string>('fx main-background');

    const onSelectHandler = (vehicle_name: string, i: number) => {
      // todo: 화면 전환 애니메이션 작성
      selectVehicle(vehicle_name);
      setMainPage({ electrified_index: i, electrifies });
    };

    useEffect(() => {
      return () => {
          setAnimation('fx main-background end-animation');
          setTimeout(() => {}, 1000);
      };
    }, [])
    return (
      <div className={animation}>
        {electrifies && electrifies.map((electrified, idx) => <Item electrified_name={electrified.electrified_item_name} delay={idx} onSelectHandler={onSelectHandler} />)}
        <MainNav />
      </div>
    );
  };

  // description:
  const ElectrifiedComponent = () => {
    return (
      <>
        {popup === '360' && <Popup_360 />}
        {popup === 'calculator' && <Popup_Calculator />}
        {electrified_page.page_class === 'main' ? <ElectrifiedMainComponent /> : <ElectrifiedContentsComponent />}
        <VehicleNav setNext={setNext} />
      </>
    );
  };

  // description:
  const ElectrifiedMainComponent = () => {
    const [titleAnimation, setTitleAnimation] = useState<string>('display-none');
    const [subAnimation, setSubAnimation] = useState<string>('display-none');

    useEffect(() => {
      setTimeout(() => {
        setTitleAnimation('electrified-title-animaion');
      }, 900);
      setTimeout(() => {
        setSubAnimation('b2 electrified-sub-animaion');
      }, 1200);
    }, []);

    return (
      <div className="vehicle-main-img-container">
        <div className="main-text-container">
          <h1 className={titleAnimation}>{selected_electrified}</h1>
          <p className={subAnimation}>{electrified.electrified_subtitle}</p>
        </div>
        <div className="vehicle-main-image-box">
          {/* <img className="vehicle-main-img" src={new URL(`/public/assets/images/${selected_electrified}/${electrified_page.page.image}`, import.meta.url).href} /> */}
          <img className="vehicle-main-img" src={new URL(`/public/assets/images/${selected_electrified}/${electrified_page.page.image}`, import.meta.url).href} />
        </div>
      </div>
    );
  };

  // description:
  const ElectrifiedContentsComponent = () => {
    return (
      <div onMouseDown={touchStart} onMouseUp={touchEnd} onClick={onActionHandler}>
        {!next && <NextSlideComponent />}
        {!gesture && <GesturePopupComponent />}
        {electrified_page.page.type === 'template_1' && <Template_1 />}
        {electrified_page.page.type === 'template_2' && <Template_2 />}
        {electrified_page.page.type === 'template_3' && <Template_3 />}
      </div>
    );
  };

  // description:
  const NextSlideComponent = () => {
    return (
      <div className="next-slide bg-primary-blue">
        <div>
          <h3 className="white">
            Next&nbsp;
            <img className="right-arrow" src={RightArrowIcon} />
          </h3>
          <p className="b2 white next-slide-content">Full Electric</p>
        </div>
      </div>
    );
  };

  // description:
  const GesturePopupComponent = () => {
    return (
      <div className="gesture-guide">
        <span className="gesture-box">
          <img className="gesture-img gesture-img-prev" src={HandPreviousIcon} />
          <p className="b1 white gesture-prev">Previous</p>
        </span>
        <span className="gesture-box">
          <img className="gesture-img gesture-img-next" src={HandNextIcon} />
          <p className="b1 white gesture-next">Next</p>
        </span>
      </div>
    );
  };
  //                component                //
  //                component                //

  return <>{!selected_electrified ? <ShowroomMainComponent /> : <ElectrifiedComponent />}</>;
}

export default main;
