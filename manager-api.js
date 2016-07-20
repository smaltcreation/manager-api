import { HTTP } from 'meteor/http';

export const name = 'smaltcreation:manager-api';

export class Client {
  constructor({ protocol = 'https', serverIp, serverPort = 80, serviceName, servicePassword }) {
    this.protocol = protocol;
    this.serverIp = serverIp;
    this.serverPort = serverPort;
    this.serviceName = serviceName;
    this.servicePassword = servicePassword;

    this.authToken = null;
    this.userId = null;
  }

  getUrl(route) {
    return `${this.protocol}://${this.serverIp}:${this.serverPort}/api/${route}`;
  }

  getAuthenticationHeader() {
    return {
      'X-Auth-Token': this.authToken,
      'X-User-Id': this.userId,
    };
  }

  logIn(callback) {
    HTTP.post(this.getUrl('login'), {
      data: {
        username: this.serviceName,
        password: this.servicePassword
      }
    }, (error, result) => {
      if (!error) {
        this.authToken = result.data.data.authToken;
        this.userId = result.data.data.userId;
      }

      callback(error);
    });
  }

  logOut(callback) {
    HTTP.post(this.getUrl('logout'), {
      headers: this.getAuthenticationHeader()
    }, error => {
      callback(error);
    });
  }

  addChartPoint(chartId, yValue, callback) {
    HTTP.post(this.getUrl('chartPoints'), {
      headers: this.getAuthenticationHeader(),
      data: {
        chartId: parseInt(chartId),
        x: new Date(),
        y: yValue
      }
    }, error => {
      callback(error);
    });
  }
}
