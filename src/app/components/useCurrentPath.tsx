import { useEffect } from 'react';

interface MenuItem {
  path: string;
  text: string;
}

type SetSelectedItem = (item: string) => void;

const useCurrentPath = (menuItems: MenuItem[], setSelectedItem: SetSelectedItem) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      const currentItem = menuItems.find(item => item.path === currentPath)?.text || 'Dashboard';
      setSelectedItem(currentItem);
      localStorage.setItem('selectedItem', currentItem); // ذخیره در localStorage
    }
  }, [menuItems, setSelectedItem]);
};

export default useCurrentPath;
