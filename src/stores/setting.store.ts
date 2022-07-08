import create from 'zustand';

import { Setting } from '@interface';

import data from '@data';

//        interface        //
interface SettingState {
  setting: Setting;

  setSetting: (setting: Setting) => void;
}
//        interface        //

//        variable        //
const init_setting: Setting = { 
  app_id: data.setting.app_id, 
  app_version: data.setting.app_version, 
  app_type: data.setting.app_type, 
  nation: data.setting.nation, 
  electrified_version: data.setting.electrified_version,
  translation_version: data.setting.translation_version,
  languages: data.setting.languages, 
  default_language: data.setting.default_language 
}
//        variable        //

//        function        //
const useStore = create<SettingState>((set) => ({
  setting: init_setting,
  setSetting: (setting) =>
    set((state) => ({
      ...state,
      setting,
    })),
}));
//        function        //

export default useStore;
