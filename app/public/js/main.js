
 
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
                ({email:data}) => {
                    if (data.length > 0) {
                        var temp = '';
                        data.forEach((itemData, index) => {
                            temp += `<tr><td> ${index} </td><td> ${itemData.to} </td><td>${itemData.status}</td></tr>`;
                        });
                        document.getElementById('email_table').innerHTML = temp;
                    }
                }
            );
        }
    );
};

setEmailTable();
 
