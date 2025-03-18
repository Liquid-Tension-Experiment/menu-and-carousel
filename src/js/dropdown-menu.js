const dropDownMenus = document.querySelectorAll(".drop-down-menu");

dropDownMenus.forEach((element) => {
  console.log("test");
  console.log(element);
  element.addEventListener("mouseenter", displayDropDown);
  element.addEventListener("mouseleave", hideDropDown);
});

function displayDropDown(e) {
  const target = e.target;
  const subMenu = target.querySelector(".drop-down-choices");
  subMenu.style.display = "block";
}

function hideDropDown(e) {
  const target = e.target;
  console.log(target);
  const subMenu = target.querySelector(".drop-down-choices");
  subMenu.style.display = "none";
}
