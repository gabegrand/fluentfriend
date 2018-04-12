$( document ).ready(function() {
    let curUser = "Marcus";
    let curr_call_uid = localStorage.getItem('curr_call_uid');

    if (curr_call_uid !== null){
        curUser = USERS[parseInt(curr_call_uid)];
    }

    let partnerPic = document.getElementById("partnerPic");
    partnerPic.innerHTML = `<img src="media/${curUser.img}" height="350px" width="350px" class="img-fluid" />`

    let partnerInfo = document.getElementById("partnerInfo");
    partnerInfo.innerHTML = `<h4>${curUser.name}</h4>
                            <p>Location: ${curUser.location}</p>
                            <button type="button" class="btn btn-primary"><i class="fa fa-commenting-o" aria-hidden="true"></i></button>
                            <button type="button" class="btn btn-primary m"><i class="fa" aria-hidden="true"></i>I'm Stuck!</button>
                            <button type="button" class="btn btn-danger ml-4" onclick="location.href='feedback.html';"><i class="fa fa-phone" aria-hidden="true"></i>  End Call</button>
                            <div class="row-md-8 formBlock">
                                <button type="button" class="btn btn-danger"><i class="fa fa-flag" aria-hidden="true"></i>  Report Inappropriate Call</button>
                            </div>`
});