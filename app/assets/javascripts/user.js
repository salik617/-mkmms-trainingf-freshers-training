function constructUserList(){
	var listHtml = "";

	listHtml += "<h1>Users <button  onclick='createNewUser()' type='button'>create</button> </h1>";

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
function editUser(id){
	$.ajax({
		url: "/users/" + id,
		dataType: 'json',
		success: function(response){
			editResUser(response);
		},
		error: function(){

		}
	})
}

function editResUser(user){
	var html= "";
	var dobarray=user.dob.split('-');

	var paramName = document.getElementsByName('csrf-param')[0].content;
	var token = $("[name='csrf-token']").attr('content');

	html += '<form id ="edit-form" data-type="json" action="/users/'+ user.id +'" accept-charset="UTF-8" method="post" data-remote=true>'
	html += '<input type="hidden" name="_method" value="patch">'
	html += '<input type="hidden" name="'+ paramName +'" value="'+ token +'"/>'


	html += '<p>Name:<input type="text" name="user[name]" value="'+ user.name+'"/></p>'
	html += '<p>Email:<input type="email" name="user[email]" value="'+ user.email+'"/></p>'
	html += '<p>Phone:<input type="text" name="user[phone]" value="'+ user.phone+'"/></p>'
	html += '<p>Address:<textarea name="user[address]">'+ user.address+'</textarea></p>'
	html += '<p>Date of birth:'
	html += "<select name='user[dob(3i)]' value='"+ dobarray[2]+"'>"
	for(var a=1;a<=31;a++)
	{
		if (dobarray[2]==a){
			html += "<option selected value='"+ a+ "'>"+ a +"</option>"
		}
		else{
			html += "<option value ='"+ a +"'>"+ a +"</option>"
	    }
	}
	html += "</select>"

	html += "<select id='months' name = 'user[dob(2i)]' value='"+dobarray[1]+"'>"
	html += "<option value ='01'>01</option>"
	html += "<option value ='02'>02</option>"
	html += "<option value ='03'>03</option>"
	html += "<option value ='04'>04</option>"
	html += "<option value ='05'>05</option>"
	html += "<option value ='06'>06</option>"
	html += "<option value ='07'>07</option>"
	html += "<option value ='08'>08</option>"
	html += "<option value ='09'>09</option>"
	html += "<option value ='10'>10</option>"
	html += "<option value ='11'>11</option>"
	html += "<option value ='12'>12</option>"
	html += "</select>"

	html += "<select id='year'  name='user[dob(1i)]' value='"+dobarray[0]+"'>"
	html += "<option value ='1990'>1990</option>"
	html += "<option value ='1991'>1991</option>"
	html += "<option value ='1992'>1992</option>"
	html += "<option value ='1993'>1993</option>"
	html += "<option value ='1994'>1994</option>"
	html += "<option value ='1995'>1995</option>"
	html += "<option value ='1996'>1996</option>"
	html += "<option value ='1997'>1997</option>"
	html += "<option value ='1998'>1998</option>"
	html += "<option value ='1999'>1999</option>"
	html += "<option value ='2008'>2008</option>"
	html += "</select>"
	html += '</p>'
	html += '<p>Gender:<input type="text" name="user[gender]" value="'+ user.gender+'"/></p>'

	html += '<button type="submit">Submit</button>'

	html += '</form>'

	$("#user-modal").html( html );
	document.getElementById('months').value= dobarray[1];
	$('#year').val(dobarray[0]); //jquery
	$("#myModal").modal('show'); 
	$("#edit-form").on("ajax:success",function(e,response){
		debugger

		showResUser(e.detail[0])
		getUserListContent();

	})
}
function createNewUser(){
	var html="";
	var paramName = document.getElementsByName('csrf-param')[0].content;
	var token = $("[name='csrf-token']").attr('content');

	html += '<form id ="create-form" data-type="json" action="/users" accept-charset="UTF-8" method="post" data-remote=true>'
	html += '<input type="hidden" name="'+ paramName +'" value="'+ token +'"/>'


	html += '<p>Name:<input type="text" name="user[name]" /></p>'
	html += '<p>Email:<input type="email" name="user[email]"/></p>'
	html += '<p>Phone:<input type="text" name="user[phone]" /></p>'
	html += '<p>Address:<textarea name="user[address]"></textarea></p>'
	html += '<p>Date of birth:'
	html += "<select name='user[dob(3i)]' >"
	for(var a=1;a<=31;a++)
	{
		html += "<option value ='"+ a +"'>"+ a +"</option>"
	    
	}
	html += "</select>"

	html += "<select id='months' name = 'user[dob(2i)]' >"
	html += "<option value ='01'>01</option>"
	html += "<option value ='02'>02</option>"
	html += "<option value ='03'>03</option>"
	html += "<option value ='04'>04</option>"
	html += "<option value ='05'>05</option>"
	html += "<option value ='06'>06</option>"
	html += "<option value ='07'>07</option>"
	html += "<option value ='08'>08</option>"
	html += "<option value ='09'>09</option>"
	html += "<option value ='10'>10</option>"
	html += "<option value ='11'>11</option>"
	html += "<option value ='12'>12</option>"
	html += "</select>"

	html += "<select id='year'  name='user[dob(1i)]' >"
	html += "<option value ='1990'>1990</option>"
	html += "<option value ='1991'>1991</option>"
	html += "<option value ='1992'>1992</option>"
	html += "<option value ='1993'>1993</option>"
	html += "<option value ='1994'>1994</option>"
	html += "<option value ='1995'>1995</option>"
	html += "<option value ='1996'>1996</option>"
	html += "<option value ='1997'>1997</option>"
	html += "<option value ='1998'>1998</option>"
	html += "<option value ='1999'>1999</option>"
	html += "<option value ='2008'>2008</option>"
	html += "</select>"
	html += '</p>'
	html += '<p>Gender:<input type="text" name="user[gender]"/></p>'

	html += '<button type="submit">Submit</button>'

	html += '</form>'
	$("#user-modal").html( html );

	$("#myModal").modal('show');
	$("#create-form").on("ajax:success",function(e){


      showResUser(e.detail[0]);
      getUserListContent();
	}
	)



}
function deleteUser(id){
	if (confirm("are you sure want to delete?")) {
		var paramName = document.getElementsByName('csrf-param')[0].content;
	     var token = $("[name='csrf-token']").attr('content');

		$.ajax({
			data:{
				authenticity_token:token

			},
		url: "/users/" + id,
		dataType: 'json',
		method:'delete',
		success: function(response){
			getUserListContent();
		},
		error: function(){

		}
	})



	}

}

//"user"=>{"name"=>"Shivani ", "email"=>"shivisankhla@gmail.com", "phone"=>"7597556898", "address"=>"6th block koramangala", "dob(1i)"=>"2008", "dob(2i)"=>"2", "dob(3i)"=>"2", "gender"=>"Female"}

//{"_method"=>"patch", "authenticity_token"=>"wXbAJ/LWEZQ9GBPzgt8/XvLVd0GwPponR0hNtqPGHc0aaFXtxjztZ51EZ/Dn8DBWZaZAmaMEAg3KBHxyoZGAzg==", "name"=>"Shivani ", "email"=>"shivisankhla@gmail.com", "phone"=>"7597556898", "address"=>"6th block koramangala", "dob(3i)"=>"2", "dob(2i)"=>"07", "dob(1i)"=>"2008", "gender"=>"Female"



function initializeApp(){
	constructUserList();

	getUserListContent();

}