$(document).ready(function() {

	jQuery.ajaxSetup({async:false});

var userList = ["freecodecamp", "storbeck", "terakilobyte", "habathcx",
"RobotCaleb","comster404","brunofin","thomasballinger","noobs2ninjas",
"beohoff", "MedryBW", "lifesaglitchtv"],
usersOnline = [];
usersOffline = [];
userList = userList.alphaSort();
var userData = {};
var buttonClicked = "all";

userList.forEach( function(user) {
	userData[user] = {icon: null, online: null}; ;
});

makeUserRow( userList );

userList.forEach( function( username ) {
	getUserInfo( username );
});

$('#allButton').click( function() {
	buttonClicked = "all";
	userList.forEach( function(username) {
		$('#allButton').addClass("active");
		$('#onlineButton').removeClass("active");
		$('#offlineButton').removeClass("active");
		if (matchesText($('#userSearch').val(), username)) {
			$('.'+username).show();
		}
		$('#usersList li.show').last().css("border", "none");
	});
});

$('#onlineButton').click( function() {
	buttonClicked = "online";
	userList.forEach( function(username) {
		$('#allButton').removeClass("active");
		$('#onlineButton').addClass("active");
		$('#offlineButton').removeClass("active");
		if ( matchesText($('#userSearch').val(), username) && matchesClass(buttonClicked, username)) {
			$('.'+username).show();
		} else {
			$('.'+username).hide();
		}
		$('#usersList li.show').last().css("border", "none");
	});
});

$('#offlineButton').click( function() {
	buttonClicked = "offline";
	$('#allButton').removeClass("active");
	$('#onlineButton').removeClass("active");
	$('#offlineButton').addClass("active");
	userList.forEach( function(username) {
		if ( matchesText($('#userSearch').val(), username) && matchesClass(buttonClicked, username)) {
			$('.'+username).show();
		} else {
			$('.'+username).hide();
		}
		$('#usersList li.show').last().css("border", "none");
	});
});

$('#userSearch').keyup( function() {
	userList.forEach( function(username) {
		if ( matchesText($('#userSearch').val(), username) && matchesClass(buttonClicked, username)) {
			$('.'+username).show();
		} else {
			$('.'+username).hide();
		}
	});
});



/* == EXTERNAL FUNCTIONS == */

function makeUserRow( userList ) {
	userList.forEach( function(username) {
		$("#usersList").append('<a href="#" class="'+username+'"><li class="'+username+'"><img class="logo" src="images/anonymous_avatar.gif"> <span>Anonymus</span></li></a>');
	});
}

function getUserInfo( username ) {
	$.ajax({
		type: 'GET',
		url: "https://api.twitch.tv/kraken/users/"+username,
		jsonp: "callback",
    dataType: "jsonp",
		success: function(response) {
			if (response.logo === null) {
				userData[username] = {logo: "images/anonymous_avatar.gif", online: null};
			} else {
				userData[username] = {logo: response.logo, online: null};
			}
			$('li.'+username+' img').attr("src", userData[username].logo);
			$('li.'+username+' span').text(username);
		}
	});

	$.ajax({
		type: 'GET',
		url: "https://api.twitch.tv/kraken/streams/"+username,
		jsonp: "callback",
    dataType: "jsonp",
		success: function(response) {
			if (response.stream === null) {
				userData[username].online = false;
				usersOffline.push(username)
				$('li.'+username).addClass("bg-danger");
			} else {
				userData[username].online = true;
				usersOnline.push(username);
				$('li.'+username).addClass("bg-success");
			}
			$('a.'+username).attr("href", "http://www.twitch.tv/"+username);
		}
	});
}

function matchesText(inputText, username) {
	if (inputText.length === 0) {
		return true;
	} else {
		var searchTyped = inputText.toLowerCase();
		var matching = username.slice(0, inputText.length).toLowerCase();
		if (searchTyped === matching) {
			return true;
		} else {
			return false;
		}
	}
}

function matchesClass(buttonClicked, username) {
	if (buttonClicked === "all") {
		return true;
	} else if (buttonClicked === "online") {
		if ($('li.'+username).hasClass("bg-success")) {
			return true;
		} else {
			return false;
		}
	} else if (buttonClicked === "offline") {
		if ($('li.'+username).hasClass("bg-danger")) {
			return true;
		} else {
			return false;
		}
	}
}

});
