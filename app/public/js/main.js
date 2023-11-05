
 
const setEmailTable = () => {
    fetch('/email/get_email', {
        method: 'POST',
        body: JSON.stringify({
            title: 'foo',
            body: 'bar',
            userId: 1
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then(
        res => {
            res.json().then(
                ({email:data, stats_data:stats_data = {}}) => {
                    if (data.length > 0) {
                        var temp = '';
                        data.forEach((itemData, index) => {
                            temp += `<tr><td> ${index} </td><td> ${itemData.to} </td><td>${itemData.status}</td></tr>`;
                        });
                        document.getElementById('email_table').innerHTML = temp;
                    }
                    document.getElementById('no_of_emails').innerHTML = `<div>${stats_data.no_of_emails || 0}</div>`;
                    document.getElementById('no_of_new').innerHTML = `<div>${stats_data.no_of_new|| 0}</div>`;
                    document.getElementById('no_of_opened').innerHTML = `<div>${stats_data.no_of_opened|| 0}</div>`;
                    document.getElementById('no_of_failed').innerHTML = `<div>${stats_data.no_of_failed|| 0}</div>`;
                }
            );
        }
    );
};

setEmailTable();
 
