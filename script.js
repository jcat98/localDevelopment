/*global fetch*/
/*global moment*/

document.getElementById("holidaySubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const country = document.getElementById("countryInput").value;
    const month = document.getElementById("monthInput").value;
    if (country === "" || month === "") 
        return;
    const url = "https://holidayapi.com/v1/holidays?pretty&key=2939ae61-a85a-4853-9f4d-aea185aa1c45&country=" + country + "&year=2021&month=" + month;
    const url2 = "https://countryflagsapi.com/svg/" + getCountry(country);
    console.log(url2);
    document.getElementById('flag').innerHTML = "<img src='"+url2+"' width=\'320px\' height=\'180px\'><br>";;
    fetch(url)
    .then(function(response) {
        return response.json();
    }).then(function(json) {	
        let results = "";
        document.getElementById("country").innerHTML = "<h2>Holidays in the " + getCountry(country) + " during " + getMonth(month) + "</h2><br>";
        results += '<table class="table-bordered">';
        results += "<thead>";
        results += "<tr><th>Name of Holiday</th><th>Date Celebrated</th><tr>"
        results += "<tbody>";
        for (let i=0; i < json.holidays.length; i++) {
            results += "<tr><td>" + json.holidays[i].name + "</td><td>" + moment(json.holidays[i].date).format('MMMM Do') + "</td></tr>";
        }
        document.getElementById("holidays").innerHTML = results;
    });

    function getMonth(num) {
        // console.log(num);
        let month = "";
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let nums = [1,2,3,4,5,6,7,8,9,10,11,12];
        for(let i=0; i <= 12; i++) {
            console.log(i);
            console.log(nums[i]);
            if(num == nums[i]) {
                month = months[i];
            }
        }
        return month;
    }

    function getCountry(abbrevation) {
        let country = "";
        let countrys = ["United States", "Argentina", "Australia", "Bangladesh", "Bolivia", "Brazil", "Canada", "Republic of the Congo", "Chile", 
        "China", "Colombia", "Dominican Republic", "Denmark", "Ecuador", "Egypt", "Finland", "Fiji", "France", "Georgia", "Ghana"];
        let abbrevations = ["US", "AG", "AU", "BD", "BO", "BR", "CA", "CG", "CL", "CN", "CO", "DO", "DK", "EC", "EG", "FI", "FJ", "FR", "GE", "GH"];
        for(let i=0; i < countrys.length; i++) {
            if(abbrevation == abbrevations[i]) {
                country = countrys[i]
            }
        }
        return country;
    }
});