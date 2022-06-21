import { useElectrifiedMenuStore } from '@store';
import { VehicleMenuView } from '@screen';

import './style.css';
import { LanguageIcon, LanguageActiveIcon, Logo, MenuIcon } from '@img'
import { useEffect, useState } from 'react';

function main_nav() {
  const { setShow } = useElectrifiedMenuStore();
  const [ language_menu, setLanguageMenu ] = useState<boolean>(false);
  const [ language_animation, setLanguageAnimation ] = useState<string>('language-menu-open');

  const onLanguageHandler = () => {
    if(language_menu) {
      setLanguageAnimation('language-menu-close');
      setTimeout(() => {
        setLanguageAnimation('display-none');
        setLanguageMenu(!language_menu);
      }, 350)
    }
    else {
      setLanguageAnimation('language-menu-open');
      setLanguageMenu(!language_menu);
    }
  };

  const onLanguageSelectHandler = () => {
    if(language_animation) {
      setLanguageAnimation('language-menu-close');
      setTimeout(() => {
        setLanguageAnimation('display-none');
        setLanguageMenu(!language_menu);
      }, 350)
    }
    else {
      setLanguageAnimation('language-menu-open');
      setLanguageMenu(!language_menu);
    }
  };

  useEffect(() => {
    setLanguageAnimation('language-menu-open');
  }, [])

  return (
    <>
      <nav className="main-nav">
        <div className="main-nav-left">
          <img className="main-logo" src={Logo} />
        </div>
        <div className="main-nav-right">
          <button className="mrl-15" onClick={onLanguageHandler}>
            <img className="main-nav-img-btn" src={ language_menu ? LanguageActiveIcon : LanguageIcon} />
          </button>
          <button className="mrl-15" onClick={setShow}>
            <img className="main-nav-img-btn" src={MenuIcon} />
          </button>
        </div>
      </nav>
      <VehicleMenuView />
      { language_menu && (
        <div className={language_animation}>
        <div className="language-list">
          <p className='language-item-active' onClick={onLanguageSelectHandler} >Italino</p>
          <p className='language-item b3' onClick={onLanguageSelectHandler} >English</p>
        </div>
      </div>
      ) }
    </>
  );
}

export default main_nav;
