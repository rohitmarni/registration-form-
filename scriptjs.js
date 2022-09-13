function validateAge(today, dobobj) {
    var age = today.getFullYear() - dobobj.getFullYear();
    var m = today.getMonth() - dobobj.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dobobj.getDate())) {
      age--;
    }
    return age;
  }
  let dobelement = document.getElementById("dob");
  dobelement.addEventListener("change", () => {
    let [y,m,d] = document.getElementById("dob").value.split("-");
    let dob = new Date(y,m,d);
    let Today = new Date();
    age = validateAge(Today, dob);
    if (age < 18 || age > 55) {
      dobelement.setCustomValidity("Age must lie in 18 and 55 year`s only..");
   
      return;
    } else {
      dobelement.setCustomValidity("");
    }
  });
  let form = document.getElementById("user-form");
  
  const retriveEntries = () => {
    let entries = localStorage.getItem("userEntry");
  
    if (entries) {
      entries = JSON.parse(entries);
    } else {
      entries = [];
    }
    return entries;
  };
  
  let Entries = retriveEntries();
  
  const displayEntries = () => {
    const entries = retriveEntries();
  
    const tablerows = entries
      .map((entry) => {
        const name = `<td>${entry.name}</td>`;
        const email = `<td>${entry.email}</td>`;
        const password = `<td>${entry.password}</td>`;
        const dob = `<td>${entry.dob}</td>`;
        const acceptTerms = `<td>${entry.acceptTerms}</td>`;
  
        const row = `<tr>${name} ${email} ${password} ${dob} ${acceptTerms}</tr>`;
        return row;
      })
      .join("\n");
  
    let tableDiv = document.getElementById("entrytbale");
  
    tableDiv.innerHTML = `<table>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Password</th>
      <th>Dob</th>
      <th>Accepted terms?</th>
    </tr>
      ${tablerows}
    </table>`;
  };
  
  // const saveUserFrom = () => {
  const saveUserFrom = (event) => {
    event.preventDefault();
  
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let dob = document.getElementById("dob").value;
    let acceptTerms = document.getElementById("acceptTerms").checked;
  
    let entry_obj = {
      name,
      email,
      password,
      dob,
      acceptTerms,
    };
  
    Entries.push(entry_obj);
  
    localStorage.setItem("userEntry", JSON.stringify(Entries));
  
    displayEntries();
  };
  
  form.addEventListener("submit", saveUserFrom);
  
  displayEntries();
  const email = document.getElementById("email");
  email.addEventListener("input", () => validate(email));
  function validate(ele) {
    if (ele.validity.typeMismatch) {
      ele.setCustomValidity("The Email is not in the Right Format..");
      ele.reportValidity();
    } else {
      ele.setCustomValidity("");
    }
  }