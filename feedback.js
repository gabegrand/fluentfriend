let reportedUsers = []

$(document).ready(function() {
    let user_role = localStorage.getItem('user_role');
    if (user_role == 'learner'){
        let learnerQuestion = document.getElementById("learnerQuestion");
        learnerQuestion.innerHTML =
        `<p class="lead">Please rate your partner on their patience.</p>
        <input type="range" min="1" max="100" value="50" class="slider" id="ratePatience" oninput="patienceOutputId.value = Math.round(ratePatience.value/10)">
        <output name="patienceOutput" id="patienceOutputId">5</output>`;
    }
  });

function reSchedule(){
    let selection = document.querySelector('input[name = "feedback"]:checked').value;
    console.log(selection);

		let curr_call_uid = parseInt(localStorage.getItem('curr_call_uid'));

    if (selection !== "yes"){
        let scheduledState = localStorage.getItem('scheduled_users');
        let scheduledUsers = JSON.parse(scheduledState);

        scheduledUsers = scheduledUsers.filter(u => u != curr_call_uid);
        localStorage.setItem('scheduled_users', JSON.stringify(scheduledUsers));
    }

    if (selection == "report"){
			let reportedState = localStorage.getItem('reported_users');
			if (reportedState != null) {
				reportedUsers = JSON.parse(reportedState);
			}

			reportedUsers.push(curr_call_uid);
			localStorage.setItem('reported_users', JSON.stringify(reportedUsers));
    }

    localStorage.setItem('feedback', selection);

    location.href='feedback_submitted.html';
}
