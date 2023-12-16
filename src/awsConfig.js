import awsIot from 'aws-iot-device-sdk';

const thingShadows = awsIot.thingShadow({
  keyPath: '../../Downloads/63efc683ec-private.pem.key',
  certPath: '../../Downloads/63efc683ec-certificate.pem.crt',
  caPath: '../../Downloads/AmazonRootCA1.pem',
  host: 'a1xfh88u91agm5-ats.iot.us-east-2.amazonaws.com',
  clientId: 'Meter-001',
  region: 'us-east-2',
});

thingShadows.on('status', (thingName, stat, clientToken, stateObject) => {
  console.log(JSON.stringify(stateObject.state));
});

export default { thingShadows };