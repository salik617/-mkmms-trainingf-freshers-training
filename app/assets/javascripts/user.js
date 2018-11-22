function constructUserList(){
	var listHtml = "";

	listHtml += "<h1>Users</h1>";

	listHtml += "<table class='table'>";

		listHtml += "<thead>";
			listHtml += "<tr>";
				listHtml += "<th>Name</th>";
				listHtml += "<th>Email</th>";
				listHtml += "<th>Phone</th>";
				listHtml += "<th>Address</th>";
				listHtml += "<th>Date of Birth</th>";
				listHtml += "<th>Gender</th>";
				listHtml += "<th>Actions</th>";
			listHtml += "</tr>";
		listHtml += "</thead>";

		listHtml += "<tbody id='user-group'>";

		listHtml += "</tbody>"

	listHtml += "</table>";


	var appId = document.getElementById("home-content")

	appId.innerHTML = listHtml;
}

function updateUserList(users){
	var userHtml = "";

	for( var i=0; i < users.length; i++ ){
		userHtml += "<tr>"
			userHtml += "<td>" + users[i].name + "</td>"
			userHtml += "<td>" + users[i].email + "</td>"
			userHtml += "<td>" + users[i].phone + "</td>"
			userHtml += "<td>" + users[i].address + "</td>"
			userHtml += "<td>" + users[i].dob + "</td>"
			userHtml += "<td>" + users[i].gender + "</td>"
			userHtml += "<td>";
				userHtml += "<a href='javascript:void(0)' onclick='showUser("+ users[i].id +")'> Show </a>";
				userHtml += "<a href='javascript:void(0)' onclick='editUser("+ users[i].id +")'> Edit </a>";
				userHtml += "<a href='javascript:void(0)' onclick='deleteUser("+ users[i].id +")'> Delete </a>";
			userHtml += "</td>";
		userHtml += "</tr>"
	}

	var usersId = document.getElementById('user-group');
	usersId.innerHTML = userHtml;
}


function getUserListContent(){
	$.ajax({
		url: "/users",
		dataType: 'json',
		success: function(response){
			updateUserList(response)
		},
		error: function(){

		}
	})
}

function showUser(id){
	$.ajax({
		url: "/users/" + id,
		dataType: 'json',
		success: function(response){
			showResUser(response);
		},
		error: function(){

		}
	})
}

function showResUser(user){
	var html = "";

	html += "<p>Name: "+ user.name +"</p>";
	html += "<p>email: "+ user.email +"</p>";
	html += "<p>phone: "+ user.phone +"</p>";
	html += "<p>Address: "+ user.address +"</p>";
	html += "<p>date of birth: "+ user.dob +"</p>";
	html += "<p>gender: "+ user.gender +"</p>";

	$("#user-modal").html( html );
	$("#myModal").modal('show');

}


function initializeApp(){
	constructUserList();

	getUserListContent();

}