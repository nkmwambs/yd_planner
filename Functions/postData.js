export default async (url, data) => {
  let return_data = [];
  await fetch(url, {
    method: "POST", // or 'PUT'
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => {
        return_data = json.data;
    })
    .catch((err) => {
      console.error(err);
    });

  return return_data;
};
