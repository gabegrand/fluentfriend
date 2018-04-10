$( document ).ready(function() {
	let scheduledUsers = [];
	let scheduledState = localStorage.getItem('scheduled_users');
	if (scheduledState != null) {
		scheduledUsers = JSON.parse(scheduledState);
	}

	console.log(scheduledUsers);
	let scheduledList = document.getElementById("scheduledList");
  scheduledList.innerHTML = USERS.filter(u => scheduledUsers.includes(u.uid)).map(u => buildScheduledProf(u)).join('');

});

function buildScheduledProf(obj) {
	return `<div class="row border-bottom pb-4">
		<div class="col-md-3 profile p">
			<img src="media/${obj.img}" class="img-fluid" />
		</div>
		<div class="col-md-6">
			<h4>${obj.name}</h4>
			<p>Location: ${obj.location}</p>
			<button type="button" class="btn btn-primary"><i class="fa fa-commenting-o" aria-hidden="true"></i>  Send message</button>
		</div>
		<div class="col-md-3">
			<div class="rightBlock formBlock profile p-3">
				<p>Conversation Date & Time</p>
				<div>
					<i class="fa fa-calendar" aria-hidden="true"></i>
					<input size="18" type="text" value="2018-04-05" readonly class="form_datetime"><br>
				</div>
				<div>
					<i class="fa fa-clock-o" aria-hidden="true"></i>
					<input size="18" type="text" value="02:30-3:00pm" readonly class="form_datetime">
				</div>
				<div><button type="button" class="btn btn-primary"><i class="fa fa-repeat" aria-hidden="true"></i>   Propose new date & time</button></div>
				<div><button type="button" class="btn btn-success" onclick="location.href='video_call.html';"><i class="fa fa-phone" aria-hidden="true"></i>   Call Now!</button></div>
			</div>
		</div>
	</div>`;
}