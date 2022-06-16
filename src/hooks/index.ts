import data from '@data';

import {useElectrifiedStore} from '@store';

export const useSetEletrified = () => {
    const { setElectrified } = useElectrifiedStore();
    for (const translation of data.translations) {
        if (data.setting.default_language === translation.language) {
          setElectrified(translation.electrifies);
          break;
        }
      }
}