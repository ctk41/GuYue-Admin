import { ref, onMounted, onUnmounted, type Ref } from 'vue';

const useContextMenu = (containerRef: Ref) => {
  const showMenu = ref(false);
  const x = ref(0);
  const y = ref(0);

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    showMenu.value = true;
    x.value = e.clientX;
    y.value = e.clientY;
  };

  const closeMenu = () => {
    showMenu.value = false;
  };

  onMounted(() => {
    const div = containerRef.value;
    div.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('click', closeMenu, true);
    window.addEventListener('contextmenu', closeMenu, true);
  });

  onUnmounted(() => {
    const div = containerRef.value;
    div?.removeEventListener('contextmenu', handleContextMenu);
    window?.removeEventListener('click', closeMenu, true);
    window?.removeEventListener('contextmenu', closeMenu, true);
  });

  return {
    showMenu,
    x,
    y,
  };
};

export default useContextMenu;
