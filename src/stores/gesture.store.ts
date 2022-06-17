import create from 'zustand';

import { Electrified } from '@interface';
import * as R from 'ramda';

//        interface        //
interface GestureState {
  gesture: boolean;
  gesture_check: boolean;
  getGesture: () => void;
  notGesture: () => void;
  checkGesture: () => void;
}
//        interface        //

const useStore = create<GestureState>((set) => ({
  gesture: true,
  gesture_check: true,
  getGesture: () =>
    set((state) => ({
      gesture: true,
    })),
  notGesture: () =>
    set((state) => ({
      gesture: false,
    })),
  checkGesture: () => 
    set((state) => ({
      gesture_check: !state.gesture_check
    }))
}));

export default useStore;
