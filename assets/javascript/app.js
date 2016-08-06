trainCount = localStorage.getItem("currentTrainCount");

if (trainCount == null){
  trainCount = 0;
}

for(var i=0; i < trainCount +1; i++) {
var retrievedTrain = localStorage.getItem("trainNumber-" + i)
$("#trainBody").append(retrievedTrain)
}

$('#runSubmit').on('click', function(){

    var trainArray =[];

    // Add Train
    var addTrain = $('#trainName').val().trim();
    console.log(addTrain);

    // Add Destination
    var addDestination = $("#destination").val().trim();
    console.log(addDestination);

    // First Train Time
    var firstTrain = $('#trainTime').val().trim();
    console.log(firstTrain);

    // Frequency
    var frequencyMin = $('#frequency').val().trim();
    console.log(frequencyMin);

    //Next Arrival Time

    var nextArrivalTime;

    //Minutes Away Time
    var minutesAwayTime;

    var convertedTime = moment(firstTrain, 'HH:mm');
    console.log(convertedTime);

    var timeDifference = moment(convertedTime).diff( moment(), "minutes");
    console.log("timeDifference: " + timeDifference);

    var absoluteTimeDifference = Math.abs(timeDifference);
    console.log("absoluteTimeDifference: " + absoluteTimeDifference);

    if (timeDifference > 0) {
      nextArrivalTime = moment(convertedTime).format('hh:mm A');
      minutesAwayTime = timeDifference;
      console.log(minutesAwayTime);
    }else {
      var numberOfMultiples = Math.ceil(absoluteTimeDifference/frequencyMin);
      console.log("numberOfMultiples: " + numberOfMultiples);

      convertedTime.add(frequencyMin*numberOfMultiples, 'minutes');
      nextArrivalTime = moment(convertedTime).format('hh:mm A')

      console.log(nextArrivalTime);


      timeDifference = moment(convertedTime).diff( moment(), "minutes", true);
      minutesAwayTime = Math.ceil(timeDifference);
      
    }

    trainArray.push(addTrain)
    trainArray.push(addDestination)
    trainArray.push(frequencyMin)
    trainArray.push(nextArrivalTime)
    trainArray.push(minutesAwayTime)

    console.log(trainArray)

    var trainRow = $('<tr>');
    trainRow.attr('id', 'item-' + trainCount);

    for (i = 0; i < trainArray.length; i++){
      trainTD = $('<td>');
      trainTD.text(trainArray[i]);
      trainRow.append(trainTD);
    }

    $('#trainBody').append(trainRow);
      // Add each train's data into the table
  
    var currentTrain = trainRow.prop('outerHTML');

          console.log(currentTrain);

    localStorage.setItem("trainNumber-" + trainCount, currentTrain);

    trainCount++;
  
    localStorage.setItem("currentTrainCount", trainCount); 

  // trainRow.attr('id', 'item-' + trainCount)

  $('#trainName').val("");
  $('#destination').val("");
  $('#trainTime').val("");
  $('#frequency').val("");
    
  return false;

});