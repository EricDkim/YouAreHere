showBuilding = function() {
	var theSelect = selectBuilding;
	var h = buildingValue[buildingValue.selectedIndex].value;
	alert(h);
}
showFloor = function(){
	var theSelect2 = selectfloor;
	var g = floorValue[floorValue.selectedIndex].value;
	alert(g);
}
	var buildingValue = selectBuilding;
	var floorValue = selectfloor;
	var roomValue = searchroom;

	var floorDiv = document.getElementById('FloorSelector');
	var roomDiv = document.getElementById('RoomSelector');

	var a = buildingValue[buildingValue.selectedIndex].value;
	var b = floorValue[floorValue.selectedIndex].value;

show = function() {
	if (a == ""){
		alert("opt 1");
		floorDiv.style.display = "none";
		roomDiv.style.display = "none";
	} else if (a == "H"){
		alert("opt H");
		floorDiv.style.display = "block";
		roomDiv.style.display = "room";
	} else if (a != null && b != null){
		alert("opt 3");
		floorDiv.style.display = "block";
		roomDiv.style.display = "block";
	} else {
		alert("error");
	}
}
	if (a == ""){
		alert("opt 1");
		floorDiv.style.display = "none";
		roomDiv.style.display = "none";
	} else if (a == "H"){
		alert("opt 2");
		floorDiv.style.display = "block";
		roomDiv.style.display = "room";
	} else if (a != null && b != null){
		alert("opt 3");
		floorDiv.style.display = "block";
		roomDiv.style.display = "block";
	} else {
		alert("error");
	}

