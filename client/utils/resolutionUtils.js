import $ from 'cash-dom';

export const setWidthType = () => {
  const width = $(window).width();
  if (width < 600) {
    window.widthType = 'sm';
  } else if (width < 900) {
    window.widthType = 'md';
  } else {
    window.widthType = 'lg';
  }
};
