# Example

```js
import { Client } from 'meteor/smaltcreation:manager-api';

const client = new Client({
    protocol: 'http', // optional, default: 'https' 
    serverIp: 'localhost',
    serverPort: 3000, // optional, default: 80
    serviceName: 'MyService',
    servicePassword: 'my-password'
});

// Log in
client.logIn(error => {
    if (error) {
        // Handle error
        console.log('error on log in', error);
    } else {
        // Logged in, add point to chart #1 (y = 300)
        client.addChartPoint(1, 300, error => {
            if (error) {
                // Handle error
                console.log('error on add chart point', error);

                // Point added, log out
                client.logOut(error => {
                    if (error) {
                        // Handle error
                        console.log('error on log out', error);
                    }
                });
            }
        });
    }
});
```
