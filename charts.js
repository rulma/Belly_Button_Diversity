function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}
d3.json("samples.json").then(function(data){
  console.log(data);
});

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var idSamples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var sampleResultArray = idSamples.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var firstSample = sampleResultArray[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    console.log(firstSample);
    
    var sampleOtuIds = firstSample.otu_ids;
    console.log(sampleOtuIds);

    var sampleOtuLabels = firstSample.otu_labels;
    console.log(sampleOtuLabels);

    var sampleSampleValues = firstSample.sample_values;
    console.log(sampleSampleValues);
    
    // 3. Create a variable that holds the washing frequency.

    let idWash = data.metadata;
    var washFrequencyArray = idWash.filter(sampleObj => sampleObj.id == sample);
    var washFreq = washFrequencyArray[0]
    console.log(washFreq);
    var wf = washFreq.wfreq
    console.log(wf);
    // var wash = sample.metadata.washfreq;
    // console.log(wash);
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = 2
    

    // 8. Create the trace for the bar chart. 
    var barData = [{
      x: sampleSampleValues,
      y: sampleOtuIds,
      text: sampleOtuLabels,
      type: "bar",
      orientation: "h"
    }
    ];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
     title: "Belly Button Bacteria",
     xaxis: {title: "Count of Bacteria"},
     yaxis: {title: "Bacteria ID"}
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);

          // 1. Create the trace for the bubble chart.
    var bubbleData = [{
    x: sampleOtuIds,
    y: sampleSampleValues,
    mode: "markers",
    marker: { size: sampleSampleValues , sizeref: 0.05, sizemode: "area" },
    text: sampleOtuLabels,
    type: "scatter",
    transforms: [{ type: "groupby", groups: sampleOtuIds }],
    }    
    ];
      
    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
    title: "Bacteria Prevelance"
            
    };
      
          // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble",bubbleData, bubbleLayout);

    // // 4. Create the trace for the gauge chart.
    var gaugeData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: wf,
        title: { text: "Washing Frequency" },
        type: "indicator",
        mode: "gauge+number"
      }
     
    ];
    
    // // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 600, height: 500, margin: { t: 0, b: 0 }   
    };

    // // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge",gaugeData,gaugeLayout);
  });
}
