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
                <button type="button" class="btn btn-primary user_button" onclick="location.href='scheduled.html';">Schedule conversation</button>
                <button class="btn btn-info user_button" type="button" data-toggle="collapse" data-target="#collapseExample${obj.uid}" aria-expanded="false" aria-controls="collapseExample">
                  About ${obj.name}
                </button>
                <div class="collapse" id="collapseExample${obj.uid}">
                  <div class="card card-body">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                  </div>
                </div>
              </div>
            </div>`;
}
