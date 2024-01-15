import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import './styles.css';

const refs = {
  select: document.querySelector('.breed-select'),
  info: document.querySelector('.cat-info'),
  error: document.querySelector('.error'),
  loader: document.querySelector('.loader'),
};

refs.select.addEventListener('change', onChange);
refs.error.hidden = true;

const newSpan = ' <span class="css-loader"></span>';
refs.loader.insertAdjacentHTML('beforeEnd', newSpan);

fetchBreeds()
  .then(data => {
    refs.select.insertAdjacentHTML('beforeend', makeList(data));
    refs.loader.hidden = true;
  })
  .then(
    data =>
      new SlimSelect({
        select: refs.select,
      })
  )
  .catch(showError);

function makeList(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

function onChange(e) {
  const breedId = e.target.value;
  refs.info.classList.add('is-hidden');
  refs.error.hidden = true;
  refs.loader.hidden = false;
  fetchCatByBreed(breedId)
    .then(data => {
      if (data.length < 1) {
        throw new Error('Failed to load content! Try again later!');
      }
      data.map(({ breeds, url }) => {
        refs.info.innerHTML = markup(breeds, url);
        refs.loader.hidden = true;
        refs.info.classList.remove('is-hidden');
      });
    })
    .catch(showError);
}

function markup(arr, url) {
  return arr
    .map(
      ({ name, description, temperament }) => `
    <img src="${url}" alt="${name}" width="600">
    <div class="cat-descr"><h2>${name}</h2>
    <p class="description">${description}</p>
    <h3>Temperament: ${temperament}</h3></div>`
    )
    .join('');
}

function showError(err) {
  refs.loader.hidden = true;
  refs.error.hidden = false;
  refs.error.innerHTML =
    'Just look! Again these playful demons are plotting their vile machinations!';
  Notiflix.Notify.failure(`${err.name}: ${err.message}`, {
    timeout: 5000,
    width: '300px',
    fontSize: '16px',
  });
}
