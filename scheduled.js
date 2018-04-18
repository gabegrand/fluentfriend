let scheduledUsers = [];

$(document).ready(function() {
  let scheduledState = localStorage.getItem('scheduled_users');
  if (scheduledState != null) {
    scheduledUsers = JSON.parse(scheduledState);
  }

  let scheduledList = document.getElementById("scheduledList");
  scheduledList.innerHTML = USERS.filter(u => scheduledUsers.includes(u.uid)).map(u => buildScheduledProf(u)).join('');
	console.log(scheduledUsers);
	for (let uid in scheduledUsers) {
		console.log('#datetimepicker_' + scheduledUsers[uid]);
		$('#datetimepicker_' + scheduledUsers[uid]).datetimepicker({
			defaultDate: (new Date().getMonth() + 1) + "/" + (new Date().getDate() + 1) + "/" + new Date().getFullYear(),
		});
	}
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

				<div class="form-group user_button">
                <div class="input-group date" id="datetimepicker_${obj.uid}" data-target-input="nearest">
                    <input type="text" class="form-control datetimepicker-input" data-target="#datetimepicker_${obj.uid}"/>
                    <div class="input-group-append" data-target="#datetimepicker_${obj.uid}" data-toggle="datetimepicker">
                        <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                    </div>
                </div>
            </div>

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
