export namespace Menu {
  export interface MenuOptions {
    path: string;
    name: string;
    component?: string | (() => Promise<unknown>);
    redirect?: string;
    meta: {
      icon: string;
      title: string;
      activeMenu?: string;
      isLink?: string;
      isHide: boolean;
      isFull: boolean;
      isAffix: boolean;
      isKeepAlive: boolean;
    };
    children?: MenuOptions[];
  }
}
