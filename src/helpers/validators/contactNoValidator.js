
// validator for contact no with country code => 
// Contact Number will be like =>
// XXX-XXX-XXXX
// XXX.XXX.XXXX
// XXX XXX XXXX
const regexValidateWithCountryCode = /^\+?([0-9]{2})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{5})$/


// validator for 10 digit conatact number (without country code) => 
// Contact Number will be like =>
// xxx-xxx-xxxx
// xxx.xxx.xxxx
// xxx xxx xxxx
const regexValidateWithoutCountryCode1 = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/


// simple 10 digit phone number =>  I used this
const regexValidate10digit = /^\d{10}$/;


module.exports = (contactNo) => {
    console.log(contactNo);
    return String(contactNo).match(regexValidate10digit);
}
