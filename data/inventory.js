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
  
  var res = db.exec("SELECT * FROM items");
  
  console.log(res);
  field.innerHTML =
    res[0].columns + "<br>"
    +res[0].values[0] + "<br>"
    +res[0].values[1];
});
