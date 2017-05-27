  var config = {
    apiKey: "AIzaSyD86Vx3_GEypvOAzbeSqx5cHe8bhxqDnPM",
    authDomain: "train-32243.firebaseapp.com",
    databaseURL: "https://train-32243.firebaseio.com",
    storageBucket: "train-32243.appspot.com",
  };
    firebase.initializeApp(config);
    var database = firebase.database();
    var trainName = "";
    var dest = "";
    var firstTrain = "";
    var freq = 0;
    
    var minAway = "" ;
   
    // Capture Button Click
    $("#Submit").on("click", function() {
        event.preventDefault();
        trainName = $("#trainName").val().trim();
        dest = $("#dest").val().trim();
        firstTrain = $("#firstTrain").val().trim();
        freq = $("#freq").val().trim();
        var nextArrival = moment(firstTrain, "hmm").format("hh:mm A");
        database.ref().push({
            trainName: trainName,
            dest: dest,
            firstTrain: firstTrain,
            freq: freq,
            
        })
        $("#tName").html(trainName);
        $("#destination").html(dest);
        $("#frequency").html(freq);
        $("#nextArrival").html(nextArrival);
        $("#minutesAway").html(moment(minAway).diff(moment(), "months") * -1);
        console.log(minAway);
        console.log(nextArrival);
        console.log(firstTrain);
       
    });
    // database.ref().on("child_added",function(snapshot){
    //   $("#info").append("<td>" + trainName +  "</td><td>" + dest + "</td> <td>" + firstTrain +  "</td><td>" + freq + "</td><td>" + nextArrival + "</td><td>" + minAway +  "</td>");
    // });
    // $("#submit").on("click", function {
    // })