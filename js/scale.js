const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const scaleValueInput = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');

const getCurrentScale = () => parseFloat(scaleValueInput.value);

const setScale = (value) => {
  scaleValueInput.value = `${value}%`;
  imgPreview.style.transform = `scale(${value/100})`;
};

const onScaleButtonClick = (evt) => {
  let step = 0;
  if (evt.target.matches('.scale__control--smaller')) {
    step = -1 * SCALE_STEP;
  }
  if (evt.target.matches('.scale__control--bigger')) {
    step = SCALE_STEP;
  }
  const newScaleValue = getCurrentScale() + step;
  if (newScaleValue <= MAX_SCALE && newScaleValue >= MIN_SCALE) {
    setScale(newScaleValue);
  }
};

const makePreviewScalable = () => {
  setScale(DEFAULT_SCALE);
  document.querySelector('.img-upload__scale').addEventListener('click', onScaleButtonClick);
};

const makePreviewUnScalable = () => {
  setScale(DEFAULT_SCALE);
  document.querySelector('.img-upload__scale').removeEventListener('click', onScaleButtonClick);
};

export {makePreviewScalable, makePreviewUnScalable};
