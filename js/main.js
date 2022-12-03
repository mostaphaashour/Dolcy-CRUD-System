let submit = document.getElementById("submit");
let thename = document.getElementById("Name");
let email = document.getElementById("Email");
let mobile = document.getElementById("Mobile");
let address = document.getElementById("Address");
let department = document.getElementById("Department");
let tbody = document.querySelector("tbody");
thename.innerHTML = "a";
let msg = document.querySelector(".msg");
let span = document.querySelector(".msg span");
let save = document.getElementById("Save");
if (!window.localStorage.id) window.localStorage.setItem("id", 1);

for (let i = 1; i < window.localStorage.id; i++) {
  if (window.localStorage.getItem(`id-${i}`)) {
    let arr = window.localStorage.getItem(`id-${i}`).split(",");
    create_element_with_data(
      arr[0],
      arr[1],
      arr[2],
      arr[3].substr(2),
      arr[4],
      arr[5]
    );
  }
}
submit.addEventListener("click", function () {
  window.localStorage.setItem(`id-${window.localStorage.id++}`, [
    window.localStorage.id - 1,
    thename.value,
    email.value,
    mobile.value,
    address.value,
    department.value,
  ]);
  create_element_with_data(
    window.localStorage.id,
    thename.value,
    email.value,
    mobile.value,
    address.value,
    department.value
  );

  msg.style.cssText = `
    display: block;
    background-color: rgba(0, 128, 0, 0.5);
    `;
  span.innerHTML = "Created";
  let a = setTimeout(() => {
    msg.style.cssText = `
    display: none;
    `;
  }, 3000);
});

function create_element_with_data(
  id,
  thename,
  email,
  mobile,
  address,
  department
) {
  let element = document.createElement("tr");
  element.classList.add("element", `element-${id}`);
  let th = document.createElement("th");
  th.setAttribute("scope", "row");
  let td_name = document.createElement("td");
  td_name.classList.add(`nam-${id}`);
  let td_email = document.createElement("td");
  td_email.classList.add(`ema-${id}`);
  let td_mobile = document.createElement("td");
  td_mobile.classList.add(`mob-${id}`);
  let td_address = document.createElement("td");
  td_address.classList.add(`add-${id}`);
  let td_department = document.createElement("td");
  td_department.classList.add(`dep-${id}`);
  let actions = document.createElement("td");
  actions.classList.add("text-center", "w-150");
  let actions_btn = document.createElement("div");
  actions_btn.classList.add("actions_btn");
  let btn_edit = document.createElement("button");
  btn_edit.classList.add("edit");
  let btn_delete = document.createElement("button");
  btn_delete.classList.add("delete");
  let thtext = document.createTextNode(id);
  let nametext = document.createTextNode(thename);
  let emailtext = document.createTextNode(email);
  let mobiletext = document.createTextNode(mobile);
  let addresstext = document.createTextNode(address);
  let departmenttext = document.createTextNode(department);
  let edit_txt = document.createTextNode("Edit");
  let delete_txt = document.createTextNode("Delete");

  th.appendChild(thtext);
  td_name.appendChild(nametext);
  td_email.appendChild(emailtext);
  td_mobile.appendChild(mobiletext);
  td_address.appendChild(addresstext);
  td_department.appendChild(departmenttext);
  btn_edit.appendChild(edit_txt);
  btn_delete.appendChild(delete_txt);

  element.appendChild(th);
  element.appendChild(td_name);
  element.appendChild(td_email);
  element.appendChild(td_mobile);
  element.appendChild(td_address);
  element.appendChild(td_department);
  actions_btn.appendChild(btn_edit);
  actions_btn.appendChild(btn_delete);
  actions.appendChild(actions_btn);
  element.appendChild(actions);
  tbody.appendChild(element);
  thename = "";
  email.value = "";
  mobile.value = "+20";
  address.value = "";
  department.value = "";

  btn_delete.addEventListener("click", function (e) {
    let maaain =
      e.target.parentNode.parentNode.parentNode.classList[1].substr(8);
    e.target.parentNode.parentNode.parentNode.remove();
    window.localStorage.removeItem(`id-${maaain}`);
    msg.style.cssText = `
    background-color: rgba(255, 0, 0, 0.5);
    display: block;
    `;
    span.innerHTML = "Deleted";
    let a = setTimeout(() => {
      msg.style.cssText = `
    display: none;
    `;
    }, 3000);
  });
  btn_edit.addEventListener("click", function (e) {
    let maaain =
      e.target.parentNode.parentNode.parentNode.classList[1].substr(8);

    let data = window.localStorage.getItem(`id-${maaain}`).split(",");
    let popup = document.querySelector(".edit_form ");
    let all = document.querySelector(".all");
    popup.style.cssText = `
      display: block
      `;

    all.style.cssText = `
      opacity: 0.3
      `;
    document.getElementById("eName").value = data[1];
    document.getElementById("eEmail").value = data[2];
    document.getElementById("eMobile").value = data[3];
    document.getElementById("eAddress").value = data[4];
    document.getElementById("eDepartment").value = data[5];
    save.addEventListener("click", function () {
      window.localStorage.setItem(`id-${maaain}`, [
        maaain,
        document.getElementById("eName").value,
        document.getElementById("eEmail").value,
        document.getElementById("eMobile").value,
        document.getElementById("eAddress").value,
        document.getElementById("eDepartment").value,
      ]);
      msg.style.cssText = `
    background-color: rgba(27, 120, 196, 0.5);
    display: block;
    z-index:10000;
    `;
      span.innerHTML = "Saved";
      let a = setTimeout(() => {
        msg.style.cssText = `
    display: none;
    `;
      }, 3000);
    });
  });
}
