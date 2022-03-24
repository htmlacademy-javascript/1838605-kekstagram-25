const slider = document.querySelector('.effect-level__slider');

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower',
});
