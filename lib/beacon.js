var bleno = require('bleno'),
    advertisement = require('./advertisement'),
    header_length = 10,
    max_uri_length = 21,
    max_advertisement_length = header_length + max_uri_length;

var createScanData = function(name) {
    var data = new Buffer(name.length + 2);

    data.writeUInt8(name.length + 1, 0); // Length
    data.writeUInt8(0x9, 1); // Complete Local Name
    data.write(name, 2);

    return data;
};

var advertise = function(uri) {

    // scan data is optional, OK to pass new Buffer(0);
    var scanData = new Buffer(createScanData("URI Beacon")); // maximum 31 bytes

    var advertisementData = advertisement.makeBuffer(uri);

    if (advertisementData.length > max_advertisement_length) {
        throw "Encoded URI must be less than " + max_uri_length +
            " bytes. It is currently " + advertisementData.length + " bytes.";
    }

    bleno.startAdvertisingWithEIRData(advertisementData, scanData);

};

module.exports = {
    advertise: advertise
};
