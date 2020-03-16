export const fetchResults = (body) => {
  fetch('https://glacial-dusk-32569.herokuapp.com/test', {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json'
    },
    'body': JSON.stringify(body)
  })
  .then(res => res.json());
};