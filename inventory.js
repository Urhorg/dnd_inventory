function loadBinaryFile(path, success) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", path, true);
  xhr.responseType = "arraybuffer";
  xhr.onload = function() {
    let data = new Uint8Array(xhr.response);
    let arr = new Array();
    for (let i = 0; i != data.length; ++i)
      arr[i] = String.fromCharCode(data[i]);
    success(arr.join(""));
  };
  xhr.send();
}

loadBinaryFile("inventory.sqlite", function(data) {
  const db = new SQL.Database(data);
  // Database is ready

  //FUNCIONS
  //función crea-tablas
  function popTable(array, table) {
    //añadir header
    let thead = table.createTHead();
    thead.id = "thItems";
    let rowh = thead.insertRow();
    array[0].columns.forEach(popRow, rowh);

    //añadir body
    let tbody = table.createTBody();
    array[0].values.forEach(popCol, tbody);

    function popCol(value, index) {
      let tbody = this;
      let row = tbody.insertRow(index);
      value.forEach(popRow, row);
    }

    //funcio replena-files
    function popRow(value, index) {
      let row = this;
      let cell = row.insertCell(index);
      cell.innerHTML = value;
    }

    //colocar la taula
    let divTable = document.getElementById("divtable");
    divTable.innerHTML = "";
    divTable.appendChild(table);
  }

  //crear taula items
  function createTableItems(order) {
    let table1 = document.getElementById("table1");
    if (table1) { table1.remove() };

    let res = db.exec('SELECT i.name as "Nombre ∇", upper(substr(t.name,1,1))||lower(substr(t.name,2,length(t.name))) as "Tipo ∇", i.price as "Precio", weight as "Peso", i.desc as "Descripción" FROM items i JOIN item_types t USING (id_type) ORDER BY ' + order);
    table1 = document.createElement("table");
    table1.id = "table1";
    popTable(res, table1);
    //añadir sort
  }

  //EXEC
  createTableItems("1");
  let tItems = document.querySelectorAll("#thItems td");
  console.log(tItems[1])

  tItems.item(0).onclick = createTableItems("1");
  tItems.item(0).onclick = console.log("hola")
  tItems.item(1).onclick = createTableItems("2");
  tItems.item(2).onclick = createTableItems("3");
  tItems.item(3).onclick = createTableItems("4");




});
