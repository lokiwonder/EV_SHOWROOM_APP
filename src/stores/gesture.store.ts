import create from 'zustand';

import { Electrified } from '@interface';
import * as R from 'ramda';

//        interface        //
interface GestureState {
  gesture: boolean;
  getGesture: () => void;
  notGesture: () => void;
}
//        interface        //

const useStore = create<GestureState>((set) => ({
  gesture: true,
  getGesture: () =>
    set((state) => ({
      gesture: true,
    })),
  notGesture: () =>
    set((state) => ({
      gesture: false,
    })),
}));

export default useStore;
