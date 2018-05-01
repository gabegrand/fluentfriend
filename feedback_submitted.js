let conversationTimes = {};

$(document).ready(function() {
    let feedback = localStorage.getItem('feedback');
    let feedbackResponse = document.getElementById("feedbackResponse");
		let schedulingWidget = document.getElementById("schedulingWidget");

    let curr_call_uid = localStorage.getItem('curr_call_uid');
    console.log(curr_call_uid);

    if (curr_call_uid !== null){
        curUser = USERS[parseInt(curr_call_uid)];
    }

    console.log(feedback);
    if (feedback == "yes"){
        console.log("reached yes");
				let scheduledDateTime = localStorage.getItem('conversationtimes');
				if (scheduledDateTime != null) {
					conversationTimes = JSON.parse(scheduledDateTime);
				}

				if (!conversationTimes[curUser.uid]) {
					conversationTimes[curUser.uid] = "05/01/2018 04:00 PM";
				}

        feedbackResponse.innerHTML = `<p>We have just rescheduled a call with ${curUser.name} and have updated our algorithm to match you with more friends like ${curUser.name}!</p>`;

				schedulingWidget.innerHTML =
				`<div class="row border-bottom p-4 justify-content-center">
					<div class="col-md-3 profile p">
						<img src="media/${curUser.img}" class="img-fluid rounded" />
					</div>
					<div class="col-md-3">
						<h4>${curUser.name}</h4>
						<p>Location: ${curUser.location}</p>
						<button type="button" class="btn btn-primary" id="tooltip_chat_${curUser.uid}" data-toggle="tooltip" data-placement="bottom" title="You can chat with ${curUser.name}! Send a message to coordinate a time that works better for your call, or to see if ${curUser.name} is available now!"><i class="fa fa-commenting-o" aria-hidden="true"></i>  Send message</button>
					</div>
					<div class="col-md-4">
						<div class="formBlock p-3 darkbox">
							<p align="center">Conversation Date & Time</p>

							<div id="conversationdatetime_${curUser.uid}">
								<span id="tooltip_${curUser.uid}" data-toggle="tooltip" title="We've scheduled the conversation based on when you're both free!">${conversationTimes[curUser.uid]}</span>
								<button type="button" class="btn btn-primary btn-check rescheduling" data-toggle="tooltip" title="Click here to reschedule conversation" onclick="reschedule(${curUser.uid})"><i class="fa fa-repeat" aria-hidden="true"></i></button>
							</div>
						</div>
					</div>
				</div>`;
    }
    else if (feedback == "no"){
        feedbackResponse.innerHTML = `<p>We're sorry you didn't enjoy your call with ${curUser.name}. We have updated our algorithm to match you with different friends!</p>`;
    }else{
        feedbackResponse.innerHTML = `<p>We're so sorry ${curUser.name} was inappropriate towards you. We will investigate the matter immediately and have removed ${curUser.name} from your match pool.</p>`;
    }

  });

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
