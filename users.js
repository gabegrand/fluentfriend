let scheduledUsers = [];

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
	console.log(scheduledUsers);

  let profileList = document.getElementById("profileList");
  profileList.innerHTML = USERS.filter(u => u.role == match_role && !scheduledUsers.includes(u.uid)).map(u => buildProf(u)).join('');
});

function buildProf(obj) {
    return `<div class="profile col-md-4 mb-3">
              <div class="card text-center" style="width: 20rem;">
                <img class="card-img-top" src="media/${obj.img}" alt="Card image cap">
                <div class="card-body">
                  <h4 class="card-title">${obj.name}</h4>
                  <p class="card-text">${obj.location}</p>
                  <button type="button" class="btn btn-primary user_button" onclick="addScheduled(${obj.uid})">Schedule conversation</button>
                  <button class="btn btn-info user_button" type="button" data-toggle="collapse" data-target="#collapseExample${obj.uid}" aria-expanded="false" aria-controls="collapseExample">
                    About ${obj.name}
                  </button>
                  <div class="collapse" id="collapseExample${obj.uid}">
                    <div class="card card-body">
                      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
}

function addScheduled(uid) {
	scheduledUsers.push(uid);
	localStorage.setItem('scheduled_users', JSON.stringify(scheduledUsers));
	location.href="scheduled.html";
}
