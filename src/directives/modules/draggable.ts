import type { Directive } from 'vue';
interface ELType extends HTMLElement {
  parentNode: any;
}

const draggable: Directive = {
  mounted(el: ELType) {
    el.style.cursor = 'move';
    el.style.position = 'absolute';
    el.onmousedown = function (e) {
      let disX = e.pageX - el.offsetLeft;
      let disY = e.pageY - el.offsetTop;

      document.onmousemove = function (e) {
        let x = e.pageX - disX;
        let y = e.pageY - disY;

        let maxX = el.parentNode.offsetWidth - el.offsetWidth;
        let maxY = el.parentNode.offsetHeight - el.offsetHeight;

        if (x < 0) {
          x = 0;
        } else if (x > maxX) {
          x = maxX;
        }

        if (y < 0) {
          y = 0;
        } else if (y > maxY) {
          y = maxY;
        }

        el.style.left = x + 'px';
        el.style.top = y + 'px';
      };

      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null;
      };
    };
  },
};

export default draggable;
