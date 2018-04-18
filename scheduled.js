let scheduledUsers = [];

$(document).ready(function() {
  let scheduledState = localStorage.getItem('scheduled_users');
  if (scheduledState != null) {
    scheduledUsers = JSON.parse(scheduledState);
  }

  let scheduledList = document.getElementById("scheduledList");
  scheduledList.innerHTML = USERS.filter(u => scheduledUsers.includes(u.uid)).map(u => buildScheduledProf(u)).join('');

});

function buildScheduledProf(obj) {
  return `<div class="row border-bottom pb-4 justify-content-center">
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
				<p>Conversation Date & Time</p>
				<div>
					<i class="fa fa-calendar" aria-hidden="true"></i>
					<input size="18" type="text" value="2018-04-05" readonly class="form_datetime" id="date_${obj.uid}"><br>
				</div>
				<div>
					<i class="fa fa-clock-o" aria-hidden="true"></i>
					<input size="18" type="text" value="02:30 PM" readonly class="form_datetime" id="time_${obj.uid}">
				</div>
				<div><button type="button" class="btn btn-primary user_button" onclick="rescheduleCall(${obj.uid})"><i class="fa fa-repeat" aria-hidden="true"></i>   Propose new date & time</button></div>
				<div><button type="button" class="btn btn-success user_button" onclick="startCall(${obj.uid})"><i class="fa fa-phone" aria-hidden="true"></i>   Call now!</button></div>
				<div><button type="button" class="btn btn-danger user_button" onclick="cancelCall(${obj.uid})"><i class="fa fa-times" aria-hidden="true"></i>   Cancel call</button></div>
			</div>
		</div>
	</div>`;
}

function startCall(uid) {
  localStorage.setItem('curr_call_uid', uid);
  location.href = 'conversation_overview.html';
}

function cancelCall(uid) {
  scheduledUsers = scheduledUsers.filter(u => u != uid);
  localStorage.setItem('scheduled_users', JSON.stringify(scheduledUsers));
  let scheduledList = document.getElementById("scheduledList");
  scheduledList.innerHTML = USERS.filter(u => scheduledUsers.includes(u.uid)).map(u => buildScheduledProf(u)).join('');
}

function rescheduleCall(uid) {
  document.getElementById("time_" + uid).value = randomTime();
  document.getElementById("date_" + uid).value = randomDate(new Date(), new Date(new Date().setFullYear(new Date().getFullYear() + 1)));
}

function randomTime() {
  hrs = Math.round(Math.random() * 24);
  mins = Math.round(Math.random() * 60);
  let hFormat = (hrs < 10 ? "0" : "");
  let mFormat = (mins < 10 ? "0" : "");
  let amPm = (hrs < 12 ? "AM" : "PM");
  let is12 = (hrs % 12 === 0);

  return amPm === "AM" && !is12 ? String(hFormat + hrs + ":" + mFormat + mins + " " + amPm) :
    "AM" && is12 ? String(12 + ":" + mFormat + mins + " " + amPm) :
    is12 ? String(hFormat + hrs + ":" + mFormat + mins + " " + amPm) :
    String(hFormat + (hrs - 12) + ":" + mFormat + mins + " " + amPm);

}

function randomDate(start, end) {
  let d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}
