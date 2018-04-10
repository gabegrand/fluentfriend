$( document ).ready(function() {

  console.log(USERS);

  // var profileList = $("#profileList");
  let profileList = document.getElementById("profileList");
  console.log(profileList);

  profileList.innerHTML = USERS.map(u => buildProf(u)).join('');
});

function buildProf(obj) {
    return `<div class="col-md-4">
              <div class="profile centerBlock pb-3">
                <span class="badge badge-pill badge-primary">${obj.mins}</span>
                <img src="${obj.img}" class="img-fluid" />
                <h4>${obj.name}</h4>
                <p>${obj.location}</p>
                <button type="button" class="btn btn-primary" onclick="location.href='scheduled.html';">Schedule conversation</button>
              </div>
            </div>`;
}
