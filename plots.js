// d3.json("samples.json").then(function(data){
//     console.log(data);
// });

// //// returns wash frequencey in descending order

// d3.json("samples.json").then(function(data){
//     washFreq = data.metadata.map(person => person.wfreq).sort((a,b)=> b - a);
//     filteredWashFreq = washFreq.filter(element => element != null);
//     console.log(filteredWashFreq);
// })

// d3.json("samples.json").then(function(data){
//     wfreq = data.metadata.map(person => person.wfreq);
//     console.log(wfreq);
// });

// researcher1 = {
//     name: 'Roza',
//     age: 34,
//     hobby: 'Hiking'
// };

// console.log(Object.entries(researcher1));


// researcher1 = [['name', 'Roza'], ['age', 34], ['hobby',
// 'Hiking']];

// researcher1.forEach(([first, second]) => console.log(first +": "+second));
// name: Roza
// age: 34
// hobby: Hiking

d3.json("samples.json").then(function(data){
    firstPerson = data.metadata[0];
    Object.entries(firstPerson).forEach(([key, value]) =>
      {console.log(key + ': ' + value);});
});
// Creates dropdown list of participant ID's
function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  })}
  
  init();
/// Logs selected participant ID
function optionChanged(newSample) {
    buildMetadata(newSample);
    //buildCharts(newSample);
  }

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    PANEL.append("h6").text("ID: " + result.id);
    PANEL.append("h6").text("ETHNICITY: " + result.ethnicity);
    PANEL.append("h6").text("GENDER: " + result.gender);
    PANEL.append("h6").text("AGE: " + result.age);
    PANEL.append("h6").text("LOCATION: " + result.location);
    PANEL.append("h6").text("BBYTYPE: " + result.bbtype);
    PANEL.append("h6").text("WFREQ: " + result.wfreq);

    

  });
}