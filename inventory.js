var upload=document.getElementById('upload');
upload.onchange = function(uploadFle) {
  if (!window.FileReader) {
    alert('Your browser does not support HTML5 "FileReader" function required to open a file.');
  } else {
    let fileis = upload.files[0];
    let fileredr = new FileReader();
    fileredr.onload = function (fle) {
      let arrayBuffer=fle.target.result;
      let uInt8Array=new Uint8Array(arrayBuffer);
      let db=new SQL.Database(uInt8Array);
    };
    fileredr.readAsArrayBuffer(fileis);
  }
};

let field = document.getElementById("field1");
field.textContent = "0";


