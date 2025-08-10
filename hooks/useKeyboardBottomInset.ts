import { useEffect, useState } from 'react';
import { Keyboard, Platform, KeyboardEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function useKeyboardBottomInset() {
  const insets = useSafeAreaInsets();
  const [bottomInset, setBottomInset] = useState(0);

  useEffect(() => {
    if (Platform.OS === 'web') return; // no-op on web

    const onShow = (e: KeyboardEvent) => {
      const height = e.endCoordinates?.height ?? 0;
      // Subtract safe area bottom so we don't double-count the inset
      setBottomInset(Math.max(0, height - (insets.bottom || 0)));
    };
    const onHide = () => setBottomInset(0);

    const showSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      onShow
    );
    const hideSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      onHide
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [insets.bottom]);

  return bottomInset;
}

export default useKeyboardBottomInset;


