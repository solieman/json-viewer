function drawTable(availableData,currentTable) {
    
    var tbl = document.createElement('table');
    
    for (let key in availableData) {
        
        var row = tbl.insertRow();

        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        
        // Add some text to the new cells:
        cell1.innerHTML = key;
        
        if(JSON.stringify(availableData[key]).includes("innerHTML")) {
            
        } else {
            if (typeof(availableData[key]) === 'object') {
                var subTbl = document.createElement('table');
                subTbl.className += "table table-striped bg-faded";
    
                cell2.appendChild(subTbl);
                drawTable(availableData[key],subTbl);
            } else {
                cell2.innerHTML = availableData[key];
            }
        }
        
        
     }

    // tbl.appendChild(tbdy);
    currentTable.appendChild(tbl);
}








//////////////////////////////
function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', './data/data.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }
 
 
 function init() {
     
     loadJSON(function(response) {
     // Parse JSON string into object
     
     const mainTable = document.getElementsByClassName("table")[0];
     drawTable(JSON.parse(response),mainTable);
    });
}










////////////////////////////////////////////
//Load local file to view it
function loadFile() {
    var input, file, fr;
    
    if (typeof window.FileReader !== 'function') {
        alert("The file API isn't supported on this browser yet.");
        return;
    }
    
    console.log('2');
    
    input = document.getElementById('fileinput');
    if (!input) {
        alert("Couldn't find the fileinput element.");
    }
    else if (!input.files) {
        alert("This browser doesn't seem to support the `files` property of file inputs.");
    }
    else if (!input.files[0]) {
        alert("Please select a file before clicking 'Load'");
    }
    else {
        file = input.files[0];
        fr = new FileReader();
        fr.onload = receivedText;
        fr.readAsText(file);
    }
    
    console.log('3');
    
    function receivedText(e) {
        var lines = e.target.result;
        var newArr = JSON.parse(lines); 
        console.log(newArr);
        
        const mainTable = document.getElementsByClassName("table")[0];
        
        //Clean the Table
        mainTable.innerHTML = "";
        for(var i = mainTable.rows.length - 1; i > 0; i--)
        {
            mainTable.deleteRow(i);
        }
        
        drawTable(newArr,mainTable);
    }
}