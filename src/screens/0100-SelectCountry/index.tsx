import { HyundaiLogo2, BottomArrowIcon } from '@img';
import { useSettingStore } from '@store';
import { Setting } from '@interface';
import { useState } from 'react';

import data from '@data';
import './style.css';

class CountrySelector {
  image: string;
  name: string;
  continue_string: string;
  constructor(image: string, name: string, continue_string: string) {
    this.image = image;
    this.name = name;
    this.continue_string = continue_string;
  }
}

const Countries: CountrySelector[] = [
  new CountrySelector('CZ_Flag.png', 'Česko', 'pokračovat'),
  new CountrySelector('DE_Flag.png', 'Deutschland', 'fortsetzen'),
  new CountrySelector('ES_Flag.png', 'España', 'seguir'),
  new CountrySelector('FR_Flag.png', 'France', 'continuez'),
  new CountrySelector('IT_Flag.png', 'Italia', 'continua'),
  new CountrySelector('NL_Flag.png', 'Nederland', 'doorgaan'),
  new CountrySelector('NO_Flag.png', 'Norge', 'fortsette'),
  new CountrySelector('PL_Flag.png', 'Polska', 'kontynuować'),
  new CountrySelector('SK_Flag.png', 'Slovensko', 'ďalej'),
  new CountrySelector('TR_Flag.png', 'Türkiye', 'devam et'),
  new CountrySelector('GB_Flag.png', 'United Kingdom', 'continue'),
];

function index() {
  const { setting, setSetting } = useSettingStore();
  const [input_status, setInputStatus] = useState<boolean>(false);
  const [input_text, setInputText] = useState<string>('b3');

  const [country, setCountry] = useState<CountrySelector>({ image: '', name: '', continue_string: '' });

  const flag_url = (image: string) => new URL(`/src/assets/images/flags/${image}`, import.meta.url).href;

  const onInputHandler = () => {
    if (input_status) {
      setInputStatus(false);
      setInputText('b3');
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
      default_language: data.setting.default_language 
    }
    setSetting(setting);
  }

  const SelectBox = () => {
    return (
      <div className="selector-box-container">
        <div className="selector-box">
          <ul>
            {Countries.map((country) => (
              <li key={country.name} onClick={() => onSelectHandler(country)}>
                <img className="flag-image" src={flag_url(country.image)} />
                <span className="b3 conuntry-name">{country.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="country-background">
      <div className="country-container">
        {!input_status && (
          <>
            <span className="showroom-logo b2 white">EV SHOWROOM</span>
            <div className="country-selector" onClick={onInputHandler}>
              {country.name === '' ? (
                <>
                  <span className={input_text}>Please select your country</span>
                  <img className="selectort-arrow" src={BottomArrowIcon} />
                </>
              ) : (
                <>
                  <div className="selected-countiry">
                    <img className="flag-image" src={flag_url(country.image)} />
                    <span className="b3 conuntry-name">{country.name}</span>
                  </div>
                  <img className="selectort-arrow" src={BottomArrowIcon} />
                </>
              )}
            </div>
          </>
        )}
        {input_status && <SelectBox />}
        <div className="select-country-nav">
          <img className="select-nav-logo" src={HyundaiLogo2} />
          {country.name !== '' && <button onClick={onContinueHandler} className="confirm-button white">{country.continue_string}</button>}
        </div>
      </div>
    </div>
  );
}

export default index;
