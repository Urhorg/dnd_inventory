let field = document.getElementById("p");

function loadBinaryFile(path, success) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", path, true);
  xhr.responseType = "arraybuffer";
  xhr.onload = function() {
    var data = new Uint8Array(xhr.response);
    var arr = new Array();
    for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
    success(arr.join(""));
  };
  xhr.send();
};

loadBinaryFile('./data/inventory.sqlite', function(data) {
  const db = new SQL.Database(data);
  // Database is ready

  const res = db.exec("SELECT * FROM items");

  console.log(res);
  /*field.innerHTML =
    res[0].columns + "<br>" +
    res[0].values[0] + "<br>" +
    res[0].values[1];*/


  const table1 = document.createElement("table");
  
  //añadir header
  const thead = table1.createTHead();
  const rowh = thead.insertRow();
  res[0].columns.forEach(popRow, rowh);

//añadir body
const tbody = table1.createTBody();
res[0].values.forEach(popCol, tbody);

function popCol(index) {
  let tb = this;
  let row = tb.insertRow(index);
  res[0].values.forEach(popRow, row)
};

  function popRow(value, index) {
    let row = this;
    let cell = row.insertCell(index);
    cell.innerHTML = value;
  };



  //res[0].values.forEach(popRow);





  document.getElementById("divtable").appendChild(table1);
});