import create from 'zustand';

//        interface        //
interface GestureState {
  gesture: boolean;
  change: boolean;
  checkGesture: (type: string) => void;
  setChange: () => void;
  noChange: () => void;
}
//        interface        //

let timeout: NodeJS.Timeout;

const useStore = create<GestureState>((set) => ({
  gesture: true,
  change: true,
  checkGesture: (class_name: string) => {
    if (class_name !== '' && class_name !== 'main') {
      set((state) => ({
        gesture: true,
      }));
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        set((state) => ({
          change: false,
          gesture: false,
        }))
      }, 10000);
    }
  },
  setChange: () =>
  set((state) => ({
     change: true,
   })),
 noChange: () =>
   set((state) => ({
     change: false,
   })), 

}));

export default useStore;
