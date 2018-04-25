$(document).ready(function() {
    let feedback = localStorage.getItem('feedback');
    let feedbackResponse = document.getElementById("feedbackResponse");
    

    let curr_call_uid = localStorage.getItem('curr_call_uid');
    console.log(curr_call_uid);
    
    if (curr_call_uid !== null){
        curUser = USERS[parseInt(curr_call_uid)];
    }

    console.log(feedback);
    if (feedback == "yes"){
        console.log("reached yes");
        feedbackResponse.innerHTML = `<p>We have just rescheduled a call with ${curUser.name} and have updated our algorithm to match you with more friends like ${curUser.name}!</p>`
    }
    else if (feedback == "no"){
        feedbackResponse.innerHTML = `<p>We're sorry you didn't enjoy your call with ${curUser.name}. We have updated our algorithm to match you with different friends!</p>`
    }else{
        feedbackResponse.innerHTML = `<p>We're so sorry ${curUser.name} was inappropriate towards you. We will investigate the matter immediately and have removed ${curUser.name} from your match pool.</p>`
    }

  });