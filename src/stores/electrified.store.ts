import create from 'zustand';

import { Electrified } from '@interface';
import data from '@data';

//        interface
interface ElectrifiedState {
  electrifies: Electrified[];
  setElectrified: (electrified: Electrified[]) => void;
}
//        interface

//        function
const setInitElectrified = (): Electrified[] => {
  for (const translation of data.translations) if (data.setting.default_language === translation.language) return translation.electrifies;
};
const useStore = create<ElectrifiedState>((set) => ({
  electrifies: setInitElectrified(),
  setElectrified: (electrified) =>
    set((state) => ({
      ...state,
      electrified,
    })),
}));
//        function

export default useStore;
