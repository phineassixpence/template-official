import { fromEvent } from 'rxjs';

export function switcherArrowFn() {
  let slideLeft: any = document.querySelector('.slide-left');
  let slideRight: any = document.querySelector('.slide-right');


  // used to remove is-expanded class and remove class on clicking arrow buttons
  function slideClick() {
    let slide = document.querySelectorAll<HTMLElement>('.slide');
    let slideMenu = document.querySelectorAll<HTMLElement>('.slide-menu');
    slide.forEach((element, index) => {
      if (element.classList.contains('is-expanded') == true) {
        element.classList.remove('is-expanded');
      }
    });
    slideMenu.forEach((element, index) => {
      if (element.classList.contains('open') == true) {
        element.classList.remove('open');
        element.style.display = 'none';
      }
    });
  }

  checkHoriMenu();


  fromEvent(slideLeft, 'click').subscribe(() => {
    slideClick();
    let menuWidth: any = document.querySelector<HTMLElement>('.app-sidebar');
    let menuItems: any = document.querySelector<HTMLElement>('.side-menu');
    let mainSidemenuWidth: any =
      document.querySelector<HTMLElement>('.main-menu');

    let menuContainerWidth =
      menuWidth?.offsetWidth - mainSidemenuWidth?.offsetWidth;
    let marginLeftValue =
      Math.ceil(
        Number(window.getComputedStyle(menuItems).marginLeft.split('px')[0])
      ) + 100;
    let marginRightValue =
      Math.ceil(
        Number(window.getComputedStyle(menuItems).marginRight.split('px')[0])
      ) + 100;

    if (!(document.querySelector('html')?.getAttribute('dir') === "rtl")) {
      if (marginLeftValue < 0) {
        // menuItems.style.marginRight = 0;
        menuItems.style.marginLeft =
          Number(menuItems.style.marginLeft.split('px')[0]) + 100 + 'px';
        if (
          menuWidth?.offsetWidth - menuContainerWidth <
          menuItems.scrollWidth
        ) {
          document.querySelector('.slide-left')?.classList.remove('d-none');
          document.querySelector('.slide-right')?.classList.remove('d-none');
        }
      } else {
        document.querySelector('.slide-left')?.classList.add('d-none');
      }

      if (marginLeftValue >= 0) {
        // menuItems.style.marginRight = 0;
        menuItems.style.marginLeft = '0px';
        if (menuWidth?.offsetWidth < menuItems.scrollWidth) {
          document.querySelector('.slide-left')?.classList.add('d-none');
        }
      }

      // to remove dropdown when clicking arrows in horizontal menu
      let subNavSub = document.querySelectorAll<HTMLElement>('.sub-nav-sub');
      subNavSub.forEach((e) => {
        e.style.display = '';
      });
      let subNav = document.querySelectorAll<HTMLElement>('.nav-sub');
      subNav.forEach((e) => {
        e.style.display = '';
      });
    } else {
      if (marginRightValue < 0) {
        menuItems.style.marginLeft = '0px';
        menuItems.style.marginRight =
          Number(menuItems.style.marginRight.split('px')[0]) + 100 + 'px';
        document.querySelector('.slide-right')?.classList.remove('d-none');
        document.querySelector('.slide-left')?.classList.remove('d-none');
      } else {
        document.querySelector('.slide-left')?.classList.add('d-none');
      }

      if (marginRightValue >= 0) {
        // document.querySelector('.slide-left')?.classList.add('d-none');
        menuItems.style.marginLeft = '0px';
        menuItems.style.marginRight = '0px';
      }
      // to remove dropdown when clicking arrows in horizontal menu
      let subNavSub = document.querySelectorAll<HTMLElement>('.sub-nav-sub');
      subNavSub.forEach((e) => {
        e.style.display = '';
      });
      let subNav = document.querySelectorAll<HTMLElement>('.nav-sub');
      subNav.forEach((e) => {
        e.style.display = '';
      });
      //
    }
    //
  });
  fromEvent(slideRight, 'click').subscribe(() => {
    slideClick();
    let menuWidth: any = document.querySelector<HTMLElement>('.app-sidebar');
    let menuItems: any = document.querySelector<HTMLElement>('.side-menu');
    let mainSidemenuWidth: any =
      document.querySelector<HTMLElement>('.main-menu');
    let menuContainerWidth = menuWidth?.offsetWidth - mainSidemenuWidth?.offsetWidth;
    let marginLeftValue = Math.ceil(Number(window.getComputedStyle(menuItems).marginLeft.split('px')[0])) - 100;
    let marginRightValue = Math.ceil( Number(window.getComputedStyle(menuItems).marginRight.split('px')[0])) - 100;
    let check = menuItems.scrollWidth + (0 - menuWidth?.offsetWidth) + menuContainerWidth;
    if (!(document.querySelector('html')?.getAttribute('dir') === 'rtl')) {
      if (marginLeftValue > -check) {
        // menuItems.style.marginRight = 0;
        menuItems.style.marginLeft = Number(menuItems.style.marginLeft.split('px')[0]) - 100 + 'px';
      } else {
        // menuItems.style.marginRight = 0;
        menuItems.style.marginLeft = -check + 'px';
        document.querySelector('.slide-right')?.classList.add('d-none');
      }
      if (marginLeftValue != 0) {
        document.querySelector('.slide-left')?.classList.remove('d-none');
      }
      // to remove dropdown when clicking arrows in horizontal menu
      let subNavSub = document.querySelectorAll<HTMLElement>('.sub-nav-sub');
      subNavSub.forEach((e) => {
        e.style.display = '';
      });
      let subNav = document.querySelectorAll<HTMLElement>('.nav-sub');
      subNav.forEach((e) => {
        e.style.display = '';
      });
      //
    } else {
      if (marginRightValue > -check) {
        menuItems.style.marginLeft = '0px';
        menuItems.style.marginRight =
          Number(menuItems.style.marginRight.split('px')[0]) - 100 + 'px';
      } else {
        menuItems.style.marginLeft = '0px';
        menuItems.style.marginRight = -check + 'px';
        document.querySelector('.slide-right')?.classList.add('d-none');
      }

      if (marginRightValue != 0) {
        document.querySelector('.slide-left')?.classList.remove('d-none');
      }
      // to remove dropdown when clicking arrows in horizontal menu
      let subNavSub = document.querySelectorAll<HTMLElement>('.sub-nav-sub');
      subNavSub.forEach((e) => {
        e.style.display = '';
      });
      let subNav = document.querySelectorAll<HTMLElement>('.nav-sub');
      subNav.forEach((e) => {
        e.style.display = '';
      });
    }
  });
}
export function checkHoriMenu() {
  let menuWidth: any = document.querySelector<HTMLElement>('.app-sidebar');
  let menuItems: any = document.querySelector<HTMLElement>('.side-menu');
  let mainSidemenuWidth: any = document.querySelector<HTMLElement>('.main-menu');

  let menuContainerWidth = menuWidth?.offsetWidth - mainSidemenuWidth?.offsetWidth; 
  let marginLeftValue = Math.ceil(Number(window.getComputedStyle(menuItems).marginLeft.split('px')[0]));
  let marginRightValue = Math.ceil(Number(window.getComputedStyle(menuItems).marginRight.split('px')[0]));
  let check = menuItems.scrollWidth + (0 - menuWidth?.offsetWidth) + menuContainerWidth;

  if (!(document.querySelector('html')?.getAttribute('dir') === "rtl")) {
    menuItems.style.marginRight = '0px';
  } else {
    menuItems.style.marginLeft = '0px';
  }

  setTimeout(() => {
    if ( menuItems.scrollWidth < menuWidth?.offsetWidth - menuContainerWidth) {
      document.querySelector('.slide-left')?.classList.add('d-none');
      document.querySelector('.slide-right')?.classList.add('d-none');
    } else if (marginLeftValue != 0 || marginRightValue != 0) {
      document.querySelector('.slide-right')?.classList.remove('d-none');
    } else if (marginLeftValue != -check || marginRightValue != -check) {
      document.querySelector('.slide-left')?.classList.remove('d-none');
    }
    if (menuItems.scrollWidth > menuWidth?.offsetWidth - menuContainerWidth) {
      document.querySelector('.slide-left')?.classList.remove('d-none');
      document.querySelector('.slide-right')?.classList.remove('d-none');
    }
    if (marginLeftValue == 0 || marginRightValue == 0) {
      document.querySelector('.slide-left')?.classList.add('d-none');
    }
    if (marginLeftValue !== 0 || marginRightValue !== 0) {
      document.querySelector('.slide-left')?.classList.remove('d-none');
    }
  }, 500);
}

export function parentNavActive() {
  let slideItemActive = document.querySelector(
    '.slide-item.active:not([href="/"])'
  );
  let SubslideItemActive = document.querySelector(
    '.sub-slide-item.active:not([href="/"])'
  );
  let SubslideItem2Active = document.querySelector(
    '.sub-slide-item2.active:not([href="/"])'
  );
  if (slideItemActive) {
    slideItemActive.parentElement?.parentElement?.parentElement?.firstElementChild?.classList.add(
      'active'
    );
  }
  if (SubslideItemActive) {
    SubslideItemActive.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.firstElementChild?.classList.add(
      'active'
    );
    SubslideItemActive.parentElement?.parentElement?.parentElement?.firstElementChild?.classList.add(
      'active'
    );
  }
  if (SubslideItem2Active) {
    SubslideItem2Active.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.firstElementChild?.classList.add(
      'active'
    );
    SubslideItem2Active.parentElement?.parentElement?.parentElement?.firstElementChild?.classList.add(
      'active'
    );
  }
}
