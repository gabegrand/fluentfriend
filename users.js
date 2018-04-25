let scheduledUsers = [];
let reportedUsers = [];

$( document ).ready(function() {
	// localStorage.clear();
  let user_role = localStorage.getItem("user_role");
  if (user_role == "learner") {
    var match_role = "speaker";
  }
  else {
    var match_role = "learner";
  }

	let scheduledState = localStorage.getItem('scheduled_users');
	if (scheduledState != null) {
		scheduledUsers = JSON.parse(scheduledState);
	}

	let reportedState = localStorage.getItem('reported_users');
	if (reportedState != null) {
		reportedUsers = JSON.parse(reportedState);
	}

  let profileList = document.getElementById("profileList");
  profileList.innerHTML = USERS.filter(u => u.role == match_role && !scheduledUsers.includes(u.uid) && !reportedUsers.includes(u.uid)).map(u => buildProf(u)).join('');
});

function buildProf(obj) {
    return `<div class="profile col-md-4 mb-3 pb-2">
              <div class="card text-center">
                <img class="card-img-top" src="media/${obj.img}" alt="Card image cap">
                <div class="card-body">
                  <h4 class="card-title">${obj.name}</h4>
                  <p class="card-text">${obj.location}</p>
                  <div class="card card-body mb-3" style="height: 40vh;">
                    <p class="text-left" style="font-size: 2.5vh;">${obj.about}</p>
                  </div>  
                  <button type="button" class="btn btn-primary user_button" onclick="addScheduled(${obj.uid})">Schedule chat</button>
                </div>
              </div>
            </div>`;
}

function addScheduled(uid) {
	scheduledUsers.push(uid);
	localStorage.setItem('scheduled_users', JSON.stringify(scheduledUsers));
	location.href="scheduled.html";
}
