getData();

async function getData() {
  const response = await fetch('/api');
  const data = await response.json();

  for (item of data) {
    const root = document.createElement('p');
    const data = `TEMP: ${item.temp}°, HUM: ${item.hum} %, PH: ${item.ph}`;
    var date = "";
    const dateString = new Date(item.timestamp).toLocaleString();
    date = dateString;
    root.textContent= data + date;
    document.body.append(root);
  }
  console.log(data);
}
