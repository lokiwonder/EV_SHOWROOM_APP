import { HyundaiLogo2, BottomArrowIcon } from '@img';
import { useState } from 'react';

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
  new CountrySelector('CZ_Flag.png', 'Česko', 'Pokračovat'),
  new CountrySelector('DE_Flag.png', 'Deutschland', 'Fortsetzen'),
  new CountrySelector('ES_Flag.png', 'España', 'Seguir'),
  new CountrySelector('FR_Flag.png', 'France', 'Continuez'),
  new CountrySelector('IT_Flag.png', 'Italia', 'Continua'),
  new CountrySelector('NL_Flag.png', 'Nederland', 'Doorgaan'),
  new CountrySelector('NO_Flag.png', 'Norge', 'Fortsette'),
  new CountrySelector('PL_Flag.png', 'Polska', 'kontynuować'),
  new CountrySelector('SK_Flag.png', 'Slovensko', 'ďalej'),
  new CountrySelector('TR_Flag.png', 'Türkiye', 'devam et'),
  new CountrySelector('GB_Flag.png', 'United Kingdom', 'continue'),
];

function index() {
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

  const SelectBox = () => {
    return (
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
    );
  };

  return (
    <div className="country-background">
      <div className="country-container">
        <img className="hyundai-logo" src={HyundaiLogo2} />
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
        {input_status && <SelectBox />}
        <div>
          <img className="hyundai-logo" src={HyundaiLogo2} />
          {country.name !== '' && <button className="confirm-button white">{country.continue_string}</button>}
        </div>
      </div>
    </div>
  );
}

export default index;
