 var config = {
    apiKey: "AIzaSyCD_VjR4e58o7bkSUTiUs8Dqxgls8z4ze4",
    authDomain: "trainscheduler-fa92a.firebaseapp.com",
    databaseURL: "https://trainscheduler-fa92a.firebaseio.com",
    projectId: "trainscheduler-fa92a",
    storageBucket: "trainscheduler-fa92a.appspot.com",
    messagingSenderId: "1012454472677"
  };
  
  firebase.initializeApp(config);


//Linking directly to my fire base database
var trainInfo = firebase.database().ref();

//The button to add trains should be created here.
$('#submitButton').on('click', function(){
	//Grab user input. make sure to not allow white space.
	var tName = $('#tNameInput').val().trim();
	var destination = $('#destinationInput').val().trim();
	var Time = moment($('#timeInput').val().trim(), "HH:mm").format("");
	var frequency = $('#frequencyInput').val().trim();

	//creating a local object to hold the train times. This object should push into database later.
	var newTrains = {
		name: tName,
		trainDestination: destination,
		trainFirst: Time,
		trainFreq: frequency,
	}

	//uploads that local object to database.
	trainInfo.push(newTrains);

	//Console checking here. Making sure it makes it to console.
	 console.log(newTrains.name);
	 console.log(newTrains.trainDestination);
	 console.log(newTrains.trainFirst);
	 console.log(newTrains.trainFreq);

	//alert the user tha trian was added
	alert("Train was added");

	//clear the boxes for user input
	$('#tNameInput').val("");
	$('#destinationInput').val("");
	$('#timeInput').val("");
	$('#frequencyInput').val("");


	// keeps the page from refreshing
	return false;
});

//when a new item is added, runs this function
trainInfo.on("child_added", function(Snapshot, Key){

	//store everything into a variable
	var tName = Snapshot.val().name;
	var destination = Snapshot.val().trainDestination;
	var Time = Snapshot.val().trainFirst;
	var frequency = Snapshot.val().trainFreq;

	//train info check through console log
	console.log(tName);
	console.log(destination);
	console.log(Time);
	console.log(frequency);

	//convert time
	var timeConverted = moment(Time, "HH:mm").subtract(1, "years");
	

	//current time
	var currentTime = moment();
	
	//difference between the times
	var diffTime = moment().diff(moment(timeConverted), "minutes");
	

	//time apart (modulus)
	var tRemainder = diffTime % frequency;
	

	//minute until train
	var tMinutesTillTrain = frequency - tRemainder;
	

	//next train
	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	var nextTrainConverted = moment(nextTrain).format("hh:mm a");
	

	//add each train into table
	$("#trainTable > tbody").append("<tr><td>" + tName + "</td><td>" + destination + "</td><td>" + "Every " + frequency + " minutes" + "</td><td>" + nextTrainConverted + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});
