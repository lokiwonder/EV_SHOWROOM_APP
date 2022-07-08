import { HyundaiLogo2, BottomArrowIcon, SelectLanguageLogo } from '@img';
import { useSettingStore } from '@store';
import { Setting } from '@interface';
import { SpinnerLottie } from '@lottie';
import { CountrySelector } from '@class';
import { COUNTRIES } from '@constant';
import { useState } from 'react';
import Lottie from 'react-lottie';
import Checkmark from 'react-typescript-checkmark';

import data from '@data';
import './style.css';

function index() {
  const { setting, setSetting } = useSettingStore();
  const [input_status, setInputStatus] = useState<boolean>(false);
  const [input_text, setInputText] = useState<string>('b3 active');

  const [country, setCountry] = useState<CountrySelector>(new CountrySelector());
  const [tmp, setTmp] = useState<boolean>(false);

  const [update_check, setUpdateCheck] = useState<number>(1);
  const [update1_check, setUpdate1Check] = useState<boolean>(false);
  const [update2_check, setUpdate2Check] = useState<boolean>(false);
  const [update3_check, setUpdate3Check] = useState<boolean>(false);

  // const flag_url = (image: string) => new URL(`/src/assets/images/flags/${image}`, import.meta.url).href;

  const lottie_options = {
    animationData: SpinnerLottie,
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const onBackgroundClickHandler = () => {
    if (input_status) {
      setInputStatus(false);
      setInputText('b3 active');
    }
  };

  const onInputHandler = () => {
    if (input_status) {
      setInputStatus(false);
      setInputText('b3 active');
    } else {
      setInputStatus(true);
      setInputText('b3 active');
    }
  };

  const onSelectHandler = (country: CountrySelector) => {
    setCountry(country);
    setInputStatus(false);
    setInputText('b3');
  };

  const onContinueHandler = () => {
    const setting: Setting = {
      app_id: '12341234',
      app_version: data.setting.app_version,
      app_type: data.setting.app_type,
      nation: data.setting.nation,
      languages: data.setting.languages,
      default_language: data.setting.default_language,
      electrified_version: 0,
      translation_version: 0,
    };

    // todo: 영상 제작용 차후 삭제
    setTmp(true);
    // setTimeout(() => {
    //   setSetting(setting);
    // }, 3600000);

    setTimeout(() => {
      setUpdate1Check(true);
      setTimeout(() => {
        setUpdateCheck(2);
        setTimeout(() => {
          setUpdate2Check(true);
          setTimeout(() => {
            setUpdateCheck(3);
            setTimeout(() => {
              setUpdate3Check(true);
              setTimeout(() => {
                setTimeout(() => {
                  setSetting(setting);
                }, 1000);
              }, 1500);
            }, 4000);
          }, 1500);
        }, 4000);
      }, 1500);
    }, 4000);
  };

  // component //
  // description: select box component
  const SelectBox = () => {
    return (
      <div className="selector-box-container">
        <div className="selector-box">
          <ul>
            {COUNTRIES.map((country) => (
              <li key={country.name} onClick={() => onSelectHandler(country)}>
                <p className="b3 conuntry-en-name dark-gray">{country.en_name}</p>
                <p className="b6 conuntry-name deep-gray">{country.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const UpdateCheckingBox = () => {};

  return (
    <div className="country-background" onClick={onBackgroundClickHandler}>
      {!tmp ? (
        <div className="country-container">
          <>
            {!input_status && (
              <div className="country-select-box">
                <img className="counter-select-logo-img" src={SelectLanguageLogo} />
                <span className="showroom-logo h2 white">Plaese select your country</span>
                <div className="country-selector" onClick={onInputHandler}>
                  {!country.name ? (
                    <>
                      <span className={input_text}>Select country</span>
                      <img className="selectort-arrow" src={BottomArrowIcon} />
                    </>
                  ) : (
                    <>
                      <div className="selected-country">
                        <span className="b3 conuntry-en-name dark-gray">{country.en_name}</span>
                      </div>
                      <img className="selectort-arrow" src={BottomArrowIcon} />
                    </>
                  )}
                </div>
              </div>
            )}
            {input_status && <SelectBox />}
            <div className="select-country-nav">
              <img className="select-nav-logo" src={HyundaiLogo2} />
              {country.name && (
                <button onClick={onContinueHandler} className="confirm-button white">
                  Continue
                </button>
              )}
            </div>
          </>
        </div>
      ) : (
        <div className="spinner-container">
          <div style={{ width: '13.8541vw', height: '16.51vw' }}>
            <Lottie style={{ width: '5.20833vw', height: '5.20833vw' }} options={lottie_options} />
            <div>
              <p className="h5 white spinner-comment">Checking update...</p>
              <div style={{ marginTop: '1.562499vw' }}>
                {update_check >= 1 && (
                  <div className="update-checker">
                    {!update1_check ? <Lottie style={{ width: '0.625vw', height: '0.625vw', display: 'flex', justifyContent: 'center' }} options={lottie_options} /> : <Checkmark size="xs" checkColor="#002c5f" backgroundColor="white" animationDuration={0.8} explosion={1.2} />}
                    <p className="b6 white opacity-70 spinner-sub-comment">Asset Update check {`( 1 / 3 )`}</p>
                  </div>
                )}
                {update_check >= 2 && (
                  <div className="update-checker">
                    {!update2_check ? <Lottie style={{ width: '0.625vw', height: '0.625vw', display: 'flex', justifyContent: 'center' }} options={lottie_options} /> : <Checkmark size="xs" checkColor="#002c5f" backgroundColor="white" animationDuration={0.8} explosion={1.2} />}
                    <p className="b6 white opacity-70 spinner-sub-comment">Electrified Update check {`( 2 / 3 )`}</p>
                  </div>
                )}
                {update_check >= 3 && (
                  <div className="update-checker">
                    {!update3_check ? <Lottie style={{ width: '0.625vw', height: '0.625vw', display: 'flex', justifyContent: 'center' }} options={lottie_options} /> : <Checkmark size="xs" checkColor="#002c5f" backgroundColor="white" animationDuration={0.8} explosion={1.2} />}
                    <p className="b6 white opacity-70 spinner-sub-comment">Translation Update check {`( 3 / 3 )`}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default index;
