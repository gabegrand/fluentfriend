let reported = []

function reSchedule(){ 
    let selection = document.querySelector('input[name = "feedback"]:checked').value;
    console.log(selection)

    if (selection !== "yes"){
        let scheduledState = localStorage.getItem('scheduled_users');
        let scheduledUsers = JSON.parse(scheduledState);    
        let curr_call_uid = parseInt(localStorage.getItem('curr_call_uid'));

        scheduledUsers = scheduledUsers.filter(u => u != curr_call_uid);
        localStorage.setItem('scheduled_users', JSON.stringify(scheduledUsers));
    }
    /*
    if (selection == "report"){
        -make reported list
        -add this to localStorage
        -check for reported in scheduled.js and users.js while filtering
    }*/
    
    location.href='feedback_submitted.html';
}

