$( document ).ready(function() {
  let user_role = localStorage.getItem("user_role");
  if (user_role == "learner") {
    var match_role = "speaker";
  }
  else {
    var match_role = "learner";
  }
  let profileList = document.getElementById("profileList");
  profileList.innerHTML = USERS.filter(u => u.role == match_role).map(u => buildProf(u)).join('');
});

function buildProf(obj) {
    return `<div class="col-md-4 mb-3">
              <div class="profile centerBlock pb-3">
                <span class="badge badge-pill badge-primary">${obj.mins} mins</span>
                <img src="media/${obj.img}" height="250px" width="250px" class="img-fluid" />
                <h4>${obj.name}</h4>
                <p>${obj.location}</p>
                <button type="button" class="btn btn-primary" onclick="location.href='scheduled.html';">Schedule conversation</button>
              </div>
            </div>`;
}
