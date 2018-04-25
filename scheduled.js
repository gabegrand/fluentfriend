let scheduledUsers = [];
let convDateTime = "04/25/2018 04:00 PM";
let conversationTimes = {};

$(document).ready(function() {
  let scheduledState = localStorage.getItem('scheduled_users');
  if (scheduledState != null) {
    scheduledUsers = JSON.parse(scheduledState);
  }

	let scheduledDateTime = localStorage.getItem('conversationtimes');
	if (scheduledDateTime != null) {
		conversationTimes = JSON.parse(scheduledDateTime);
	}

  let scheduledList = document.getElementById("scheduledList");
  scheduledList.innerHTML = USERS.filter(u => scheduledUsers.includes(u.uid)).map(u => buildScheduledProf(u)).join('');

	$('[data-toggle="tooltip"]').tooltip({
    trigger : 'hover'
	});

	$(".rescheduling").on('click', function () {
	    $(this).tooltip('hide')
	});
});

function buildScheduledProf(obj) {
	if (!conversationTimes[obj.uid]) {
		conversationTimes[obj.uid] = convDateTime;
	}

  return `<div class="row border-bottom p-4 justify-content-center">
		<div class="col-md-3 profile p">
			<img src="media/${obj.img}" class="img-fluid rounded" />
		</div>
		<div class="col-md-3">
			<h4>${obj.name}</h4>
			<p>Location: ${obj.location}</p>
			<button type="button" class="btn btn-primary"><i class="fa fa-commenting-o" aria-hidden="true"></i>  Send message</button>
		</div>
		<div class="col-md-4">
			<div class="formBlock p-3 darkbox">
				<p align="center">Conversation Date & Time</p>

				<div id="conversationdatetime_${obj.uid}">
					<span data-toggle="tooltip" title="We've scheduled the conversation based on when you're both free!">${conversationTimes[obj.uid]}</span>
					<button type="button" class="btn btn-primary btn-check rescheduling" data-toggle="tooltip" title="Click here to reschedule conversation" onclick="reschedule(${obj.uid})"><i class="fa fa-repeat" aria-hidden="true"></i></button>
				</div>


				<div><button type="button" class="btn btn-success user_button" onclick="startCall(${obj.uid})"><i class="fa fa-phone" aria-hidden="true"></i>   Call now!</button></div>
				<div><button type="button" class="btn btn-danger user_button" onclick="cancelCall(${obj.uid})"><i class="fa fa-times" aria-hidden="true"></i>   Cancel call</button></div>
			</div>
		</div>
	</div>`;
}

function reschedule(uid) {
	let conversationDateTime = document.getElementById("conversationdatetime_" + uid);
  conversationDateTime.innerHTML =
	`<div class="form-group user_button">
		<div class="input-group date" id="datetimepicker_${uid}" data-target-input="nearest" >
				<input type="text" class="form-control datetimepicker-input" data-target="#datetimepicker_${uid}" id="pickertext_${uid}" data-toggle="tooltip" title="We've scheduled the conversation based on when you're both free!"/>
				<div class="input-group-append" data-target="#datetimepicker_${uid}" data-toggle="datetimepicker">
						<div class="input-group-text"><i class="fa fa-calendar"></i></div>
				</div>
				<button type="button" id="confirm_btn" class="btn btn-success btn-check" data-toggle="tooltip" title="Click here to confirm date and time" onclick="confirm(${uid})"><i class="fa fa-check" aria-hidden="true"></i></button>
		</div>
	</div>`;

	$('#datetimepicker_' + uid).datetimepicker({});

	$('#datetimepicker_' + uid).on("change.datetimepicker", function (e) {
			let currTime = (e.date._d.getMonth() < 10 ? "0" : "") +
			(e.date._d.getMonth() + 1) + "/" + (e.date._d.getDate() < 10 ? "0" : "") +
			e.date._d.getDate() + "/" + e.date._d.getFullYear() + " " +
			(e.date._d.getHours() < 10 ? "0" : "") + (e.date._d.getHours() +
			(e.date._d.getHours() > 12 ? -12 : 0)) + ":" +
			(e.date._d.getMinutes() < 10 ? "0" : "") + e.date._d.getMinutes() + " " +
			(e.date._d.getHours() > 12 ? "PM" : "AM");
			conversationTimes[uid] = currTime;
	});
}

function confirm(uid) {
	localStorage.setItem('conversationtimes', JSON.stringify(conversationTimes));
	let conversationDateTime = document.getElementById("conversationdatetime_" + uid);
  conversationDateTime.innerHTML =
		`<span>${conversationTimes[uid]}</span>
		<button type="button" class="btn btn-primary btn-check rescheduling" data-toggle="tooltip" title="Click here to reschedule conversation" onclick="reschedule(${uid})"><i class="fa fa-repeat" aria-hidden="true"></i></button>`;
}

function startCall(uid) {
  localStorage.setItem('curr_call_uid', uid);
  location.href = 'conversation_overview.html';
}

function cancelCall(uid) {
  scheduledUsers = scheduledUsers.filter(u => u != uid);
	delete conversationTimes[uid];
	localStorage.setItem('conversationtimes', JSON.stringify(conversationTimes));
  localStorage.setItem('scheduled_users', JSON.stringify(scheduledUsers));
  let scheduledList = document.getElementById("scheduledList");
  scheduledList.innerHTML = USERS.filter(u => scheduledUsers.includes(u.uid)).map(u => buildScheduledProf(u)).join('');
}
