import { Component, h, render } from 'vue';

interface Instance {
  id: number;
  destroy: () => void;
}

let curInstance: Instance | null = null;
let seed = 1;
const contextMenu = (e: MouseEvent, data: any, component: Component) => {
  if (curInstance) {
    curInstance.destroy();
  }
  curInstance = null;
  let id = seed++;
  const container = document.createElement('div');
  const appendTo = document.body;
  const props = {
    data,
    onClose: () => {
      if (curInstance) {
        curInstance.destroy();
      }
    },
  };
  const vnode = h(component, props);
  render(vnode, container);
  appendTo.appendChild(container.firstElementChild as HTMLElement);
  const curMenu = vnode.el as HTMLElement;
  const { offsetWidth, offsetHeight } = curMenu;
  const { clientWidth } = appendTo;
  const { clientX, clientY } = e;

  const leftOrRight = clientWidth - clientX > offsetWidth ? 'left' : 'right';

  const topOrBottom = window.innerHeight - clientY > offsetHeight ? 'top' : 'bottom';
  const offsetLeft = Math.abs(clientWidth - clientX);
  curMenu.style[leftOrRight] = leftOrRight === 'left' ? `${clientX + 20}px` : `${offsetLeft}px`;
  curMenu.style[topOrBottom] = topOrBottom === 'bottom' ? '2px' : `${clientY}px`;

  const instance: Instance = {
    id,
    destroy: () => {
      curInstance = null;
      render(null, container);
    },
  };
  curInstance = instance;
  return instance;
};

export default contextMenu;
