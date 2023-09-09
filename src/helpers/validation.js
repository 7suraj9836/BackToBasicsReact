// import * as moment from "moment";

const number = (value) => {
    return !isNaN(parseFloat(value));
};

const empty = (value) => {
    // const val = value ? value.trim() : value;
    return !Boolean(value);
};

const min2 = (value) => {
    return !empty(value) && value.length >= 2;
};

const minOf = (value, min) => {
    return !empty(value) && value.length >= min;
};

const name = (value) => {
    const reName = /^[a-zA-Z ]*$/; //^[a-zA-Z0-9 ]+$
    return value.length >= 2 && value.length <= 50 && reName.test(value);
};
const organizationName = (value) => {
    const reName = /^[a-zA-Z ]*$/; //^[a-zA-Z0-9 ]+$
    return value.length >= 2 && value.length <= 50 && reName.test(value);
};

const pinCodeLength = (value) => {
    console.log("value length ", value.length)
    return value.length === 6;
}

const email = (value) => {
    const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
};

const validatePassword = (value) => {
    const re = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
    return re.test(String(value));
}

const emailLength = (value) => {
    return value.length <= 100;
};

const panCardLength = (value) => {

    return value.length === 10
}

const IfscCodeLength = (value) => {
    return value.length === 11
}

const accountNumberLength = (value) => {
    return value.length <= 17
}

// const numericPhone = (value) => {
//   const reNum = /^[0-9]*$/;
//   return !empty(value) && value.length >= 5 && reNum.test(value);
// };

const phone = (value) => {
    const rePhone = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    return !empty(value) && value.length <= 10 && value.length >= 7 && rePhone.test(value);
};
const phoneLength = (value) => {
    return value.length <= 10 && value.length >= 7;
};

const phoneNumber = (value) => {
    const rePhone = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    return !empty(value) && value.length <= 10 && value.length >= 7 && rePhone.test(value);
};

const password = (value) => {
    // const re = /^[a-zA-Z0-9!@#$%^&]+$/;
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return !empty(value) && value.length >= 6 && re.test(value);
};

const year = (value) => {
    const re = /^(199\d|20[0-2]\d|2030)$/;
    return !empty(value) && value.length === 4 && re.test(value);
};

const date = (value) => {
    //   return moment(value).isValid();
};

const postalCode = (value) => {
    const regex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    return !empty(value) && regex.test(value);
};

const panCard = (value) => {
    const regex = /^([A-Z]){5}([0-9]){4}([A-Z]){1}?$/;
    return !empty(value) && regex.test(value);
}

const adhar = (value) => {
    const regex = /(^[0-9]{4}[0-9]{4}[0-9]{4}$)|(^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|(^[0-9]{4}-[0-9]{4}-[0-9]{4}$)/;
    return !empty(value) && regex.test(value);

}
const pinCode = (value) => {
    const regex = /^\d{6}$/;
    // const regex= /[0-9]{5}(?:-[0-9]{4})?$/;
    return !empty(value) && regex.test(value);
}
const address = (value) => {
    console.log("addresss name ", value);
    const reName = /^[A-Za-z0-9'\.\-\s\,]/;
    // /^[A-Za-z0-9\s!@#$%^&*()_+=`~\\\][{}|';:/.,?><]*$/; Old regex
    return value.length >= 2 && value.length <= 50 && reName.test(value);
};
const area = (value) => {
    const reName = /^[A-Za-z0-9'\.\-\s\,]/;
    return value.length <= 50 && reName.test(value);
};
const accountNumber = (value) => {
    const regex = /^\d{9,18}$/;
    return !empty(value) && regex.test(value);
}
const IfscCode = (value) => {
    const regex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    return !empty(value) && regex.test(value);
}

const panName = (value) => {
    const regex = /^[a-zA-Z ]*$/;
    return !empty(value) && value.length >= 2 && value.length <= 50 && regex.test(value);
}
//
const bankName = (value) => {
    const regex = /^[a-zA-Z ]*$/;
    return !empty(value) && value.length >= 2 && value.length <= 50 && regex.test(value);
}

const url = (str) => {
    const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(str)) {
        return true;
    } else {
        return false;
    }
};

const fancyValidation = (value) => {
    let regex2 = /([0-9]+)/;
    let regex3 = /([A-Z]+)/;
    let regex4 = /([a-z]+)/;
    let regex5 = /(?=.*[!@#$%&^?|])/;
    let obj = {
        eightCharacters: value.length > 7,
        oneNumber: regex2.test(value),
        oneCapitalLetter: regex3.test(value),
        oneLowerLetter: regex4.test(value),
        oneSpecialCharacter: regex5.test(value),
    };
    return obj;
};

export const Validation = {
    empty,
    min2,
    minOf,
    name,
    panName,
    number,
    // numericPhone,
    organizationName,
    email,
    IfscCodeLength,
    emailLength,
    phone,
    phoneLength,
    year,
    date,
    postalCode,
    panCard,
    pinCode,
    address,
    area,
    password,
    accountNumber,
    IfscCode,
    url,
    fancyValidation,
    adhar,
    bankName,
    panCardLength,
    accountNumberLength,
    pinCodeLength,
    phoneNumber
};

