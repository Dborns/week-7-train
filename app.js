var trainData = new Firebase("https://mynewfireapp.firebaseio.com/");


$("#addtrainBtn").on("click", function(){

    
    var trainName = $("#trainNameInput").val().trim();
    var destinationName = $("#destinationInput").val().trim();
    var frequencyMinutes =$("#frequencyInput").val().trim();
    var firstTrainUnix = moment($("#firsttraintimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");

   
    var newTrain = {
        name:  trainName,
        destination: destinationName,
        start: firstTrainUnix,
        frequency: frequencyMinutes
    }

    
    trainData.push(newTrain);

   
    console.log(newTrain.name);
    console.log(newTrain.destination); 
    console.log(newTrain.start);
    console.log(newTrain.frequency)

    
    alert("Train successfully added");

   
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firsttraintimeInput").val("");
    $("#frequencyInput").val("");


    
    return false;
});



trainData.on("child_added", function(childSnapshot, prevChildKey){

    console.log(childSnapshot.val());

    
    var ttrainName = childSnapshot.val().name;
    var tdestinationName= childSnapshot.val().destination;
    var tfirstTrainUnix = childSnapshot.val().start;
    var tFrequency = childSnapshot.val().frequency;


    
    console.log(ttrainName);
    console.log(tdestinationName);
    console.log(tfirstTrainUnix);
    console.log(tFrequency);


    var differenceTimes = moment().diff(moment.unix(tfirstTrainUnix), "minutes");
    var tRemainder = moment().diff(moment.unix(tfirstTrainUnix), "minutes") % tFrequency ;
    var tMinutes = tFrequency - tRemainder;


    
    var tArrival = moment().add(tMinutes, "m").format("hh:mm A"); 
    console.log(tMinutes);
    console.log(tArrival);

    console.log(moment().format("hh:mm A"));
    console.log(tArrival);
    console.log(moment().format("X"));

    
    $("#trainTable > tbody").append("<tr><td>" + ttrainName + "</td><td>" + tdestinationName + "</td><td>" + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");





});

