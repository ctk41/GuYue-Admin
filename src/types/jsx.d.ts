// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JSX } from 'vue/jsx-runtime';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: JSX.IntrinsicElements['div'];
      'a-switch': JSX.IntrinsicElements['div'] & {
        checked?: boolean;
        checkedChildren?: string;
        unCheckedChildren?: string;
        onChange?: () => void;
      };
      'a-tag': JSX.IntrinsicElements['div'] & {
        color?: string;
      };
    }
  }
}
