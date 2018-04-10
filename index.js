function myFunc(role) {
	localStorage.clear();
  console.log(role);
  localStorage.setItem("user_role", role);
  location.href="users.html";
}
