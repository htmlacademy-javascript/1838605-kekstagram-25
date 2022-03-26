const slider = document.querySelector('.effect-level__slider');
const effectLevelElement = document.querySelector('.effect-level__value');
const imgPreview = document.querySelector('.img-upload__preview img');

// Слова для применения style.filter
const FILTERS = {
  none: '',
  chrome: 'grayscale',
  sepia: 'sepia',
  marvin: 'invert',
  phobos: 'blur',
  heat: 'brightness'
};

let filterType = FILTERS.none;

// Настройки слайдера для различных фильтров
const SLIDER_OPTIONS = {
  DEFAULT: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1, // Как обратиться к range.max? Так можно?
    step: 0.1,
    connect: 'lower',
    format: {
      to: function (value) {
        return value;
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  },
  CHROME: {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1,
    format: {
      to: function (value) {
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  },
  SEPIA: {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1,
    format: {
      to: function (value) {
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  },
  MARVIN: {
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1,
    format: {
      to: function (value) {
        return `${value}%`;
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  },
  PHOBOS: {
    range: {
      min: 0,
      max: 3
    },
    start: 3,
    step: 0.1,
    format: {
      to: function (value) {
        return `${value.toFixed(1)}px`;
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  },
  HEAT: {
    range: {
      min: 1,
      max: 3
    },
    start: 3,
    step: 0.1,
    format: {
      to: function (value) {
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  }
};

/**
 * Применяет фильтр к изображению
 * @param {string} filterId - id фильтра из html
 */
function changeFilter(filterId) {
  let filter;
  let sliderOptions;
  switch (filterId) {
    case 'effect-none':
      filter = 'effects__preview--none';
      filterType = FILTERS.none;
      slider.setAttribute('hidden', true);
      sliderOptions = SLIDER_OPTIONS.DEFAULT;
      break;
    case 'effect-chrome':
      filter = 'effects__preview--chrome';
      filterType = FILTERS.chrome;
      slider.removeAttribute('hidden', true);
      sliderOptions = SLIDER_OPTIONS.CHROME;
      break;
    case 'effect-sepia':
      filter = 'effects__preview--sepia';
      filterType = FILTERS.sepia;
      slider.removeAttribute('hidden', true);
      sliderOptions = SLIDER_OPTIONS.SEPIA;
      break;
    case 'effect-marvin':
      filter = 'effects__preview--marvin';
      filterType = FILTERS.marvin;
      slider.removeAttribute('hidden', true);
      sliderOptions = SLIDER_OPTIONS.MARVIN;
      break;
    case 'effect-phobos':
      filter = 'effects__preview--phobos';
      filterType = FILTERS.phobos;
      slider.removeAttribute('hidden', true);
      sliderOptions = SLIDER_OPTIONS.PHOBOS;
      break;
    case 'effect-heat':
      filter = 'effects__preview--heat';
      filterType = FILTERS.heat;
      slider.removeAttribute('hidden', true);
      sliderOptions = SLIDER_OPTIONS.HEAT;
      break;
  }
  imgPreview.className = '';
  imgPreview.classList.add(filter);
  slider.noUiSlider.updateOptions(sliderOptions);
}

/**
 * Обработчик при изменении фильтра
 * @param {any} evt
 */
function onFilterChange(evt) {
  if (evt.target.closest('.effects__item')) {
    changeFilter(evt.target.id);
  }
}

/**
 * Подключает настройку фильтров у изображения
 */
function enableFilters() {
  effectLevelElement.value = 1;
  filterType = FILTERS.none;

  noUiSlider.create(slider, SLIDER_OPTIONS.DEFAULT);
  slider.setAttribute('hidden', true);
  document.querySelector('.img-upload__form').addEventListener('change', onFilterChange);

  slider.noUiSlider.on('update', () => {
    effectLevelElement.value = parseFloat(slider.noUiSlider.get());
    // Можно как-то сделать по другому???
    if (filterType !== FILTERS.none) {
      imgPreview.style.filter = `${filterType}(${slider.noUiSlider.get()})`;
    } else {
      imgPreview.style.filter = '';
    }
  });
}

/**
 * Отключает настройку фильтров у изображения
 */
function disableFilters() {
  document.querySelector('.img-upload__form').removeEventListener('change', onFilterChange);
  imgPreview.className = '';
  slider.noUiSlider.destroy();
}

export {enableFilters, disableFilters};
