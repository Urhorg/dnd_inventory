let field = document.getElementById("p");

function loadBinaryFile(path, success) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", path, true);
  xhr.responseType = "arraybuffer";
  xhr.onload = function () {
    var data = new Uint8Array(xhr.response);
    var arr = new Array();
    for (var i = 0; i != data.length; ++i)
      arr[i] = String.fromCharCode(data[i]);
    success(arr.join(""));
  };
  xhr.send();
}

loadBinaryFile("inventory.sqlite", function (data) {
  const db = new SQL.Database(data);
  // Database is ready

  const res = db.exec("SELECT * FROM items");
  const table1 = document.createElement("table");
  popTable(res,table1);

  //función crea-tablas
  function popTable(array, table) {
    //añadir header
    const thead = table.createTHead();
    const rowh = thead.insertRow();
    array[0].columns.forEach(popRow, rowh);

    //añadir body
    const tbody = table.createTBody();
    array[0].values.forEach(popCol, tbody);

    function popCol(value, index) {
      let tbody = this;
      let row = tbody.insertRow(index);
      value.forEach(popRow, row);
    }

    function popRow(value, index) {
      let row = this;
      let cell = row.insertCell(index);
      cell.innerHTML = value;
    }

    let divTable = document.getElementById("divtable");
    divTable.innerHTML = "";
    divTable.appendChild(table);
  }
});
