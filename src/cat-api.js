const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_Qg4oQv1fsTxxPr6j8YiDmk7PPDDl3qYUHrC0IpESpSGDhOm7YQbtlUyzgrJTvSKL';
const headers = new Headers({
  'Content-Type': 'application/json',
  'x-api-key': API_KEY,
});

var requestOptions = {
  method: 'GET',
  headers: headers,
  redirect: 'follow',
};

export function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds`, requestOptions).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `${BASE_URL}/images/search?breed_ids=${breedId}`,
    requestOptions
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
