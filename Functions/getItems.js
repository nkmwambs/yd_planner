
export default getItems = async (endPoint) => {

    let data = []

    await fetch(endPoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    })
        .then(response => response.json())
        .then(json => {
            data = json.data;
        })
        .catch(err => { console.error(err); })

    return data;

}