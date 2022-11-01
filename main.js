import './style.css'
import { merge } from './merge.js'
import { AttractionData } from './attraction-data.js'
import { UI } from './ui.js'
import { testCases } from './test.js'

//set the desired URL
let apiUrl = '/data2.json'
//Init AttractionData
const attractionDataFromUrl = new AttractionData(apiUrl)
//Init UI
const ui = new UI()

let attractionDataFromFile = []

document.querySelector('#app').innerHTML = `
  <div id="app">
  <div id="addData">
    <label for="attractionDataFile" class="attractionDataFile">
    Add new data    
    <input type="file" id="attractionDataFile" title="attractionDataFile">
    </label>
  </div>
    <div id="attractionData">
    <table id="attractionDataTable"   class="order-column" style="width:100%; table-layout:fixed;">
      <thead>
          <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Theme</th>
              <th>Type</th>
              <th>Cost</th>
              <th>Estimated<br>Customers</th>
              <th>Maintenance<br>Time</th>
              <th>Workers<br>Required</th>
              <th>Updated</th>           
          </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
    </div>
    <div class="loadMoreContainer">
      <button id="loadMore" disabled="disabled">Load More</button>
    </div>
`;

// Get all the attraction data on DOM load
document.addEventListener('DOMContentLoaded', getAttractionData)

// Test case(s)
window.addEventListener('load', testCases)

document.getElementById("attractionDataFile").addEventListener("change", handleFiles);

function getAttractionData(arr2 = []){
  attractionDataFromUrl.getAttractionData()
    .then(results => {
      const arr1 = results;
      //If there is two data sources, merge into a single list
      let attractionData = (arr2?.length) ? merge(arr1, arr2) :  arr1.map(data => {return {...data}})
      ui.setTable(attractionData)
    })
    .catch(err => console.log(err))
}

function handleFiles() {
  let file = this.files[0];
  let reader = new FileReader();
  reader.onload = () => {
    const dataFromFile = reader.result
    const dataSource2 = tsvToArray(dataFromFile)
    let combined = []
  
    //If there is two data sources, merge into a single list
    if(attractionDataFromFile?.length){
      const mergedFileData = merge(attractionDataFromFile, dataSource2)
      combined.splice(0,combined.length, ...mergedFileData)
    } else {
      let fileData = dataSource2.map(data => {return {...data}})
      combined.splice(0,combined.length, ...fileData)
    }

    attractionDataFromFile.splice(0,attractionDataFromFile.length, ...combined)
    getAttractionData(attractionDataFromFile);
  }
  reader.readAsText(file)
}

function tsvToArray(data, delimiter = "\t"){
  const header = data.slice(0, data.indexOf("\n")).split(delimiter);
  const rows = data.slice(data.indexOf("\n")+1).split("\n");
  const arr = rows.map( row => {
    const row_data = row.split(delimiter);
    const val = header.reduce((obj, h, idx) => {
      obj[h] = row_data[idx];
      return obj
    }, {});
    return val;
  })
  return arr;
}

