import create from 'zustand';

import data from '@data';

//        interface        //
interface LanguageState {
  language: string;

  setLanguage: (language: string) => void;
}
//        interface        //

//        function        //
const useStore = create<LanguageState>((set) => ({
  language: data.setting.default_language,
  setLanguage: (language) =>
    set((state) => ({
      ...state,
      language,
    })),
}));
//        function        //

export default useStore;
