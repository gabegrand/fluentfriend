let reportedUsers = []

function reSchedule(){
    let selection = document.querySelector('input[name = "feedback"]:checked').value;
    console.log(selection)

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

    location.href='feedback_submitted.html';
}
