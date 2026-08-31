import PasswordValidator from 'password-validator'

var schema = new PasswordValidator()
schema
    .is().min(8)
    .is().max(100)
    .has().uppercase(1)
    .has().lowercase(1)
    .has().digits(1)
    .has().symbols(1)
    .has().not().spaces()
export default function FormValidator(e) {
    let { name, value } = e.target
    switch (name) {
        case "name":
        case "fullName":
        case "email":
        case "username":
            if (!value || value.length === 0)
                return toSentenceCase(name) + " Field is Mandatory"
            else if (value.length < 3 || value.length > 30)
                return toSentenceCase(name) + " Field must be 3-30 Characters"
            else
                return ""

        case "message": {
            if (!value || value.length === 0)
                return toSentenceCase(name) + " Field is Mandatory"
            else if (value.length < 15)
                return toSentenceCase(name) + " Field must be greater than 15 Characters"
            else
                return ""
        }
        case "phone":
            if (!value || value.length === 0)
                return toSentenceCase(name) + " Field is Mandatory"
            else if (value.length < 10 || value.length > 10)
                return toSentenceCase(name) + " Field must be 10 Digits"
            else if (!(value.startsWith("6") || value.startsWith("7") || value.startsWith("8") || value.startsWith("9")))
                return toSentenceCase(name) + " Field Invalid "
            else
                return ""

        case "password":
            if (!value || value.length === 0) {
                return toSentenceCase(name) + " Field is Mandatory"
            } else if (!schema.validate(value)) {
                let error = schema.validate(value, { details: true })
                return error.map(x => x.message).join("")
            } else
                return ""
        case "basePrice":
            if (value === "" || value === null)
                return "Base Price Field is Mandatory"
            else if (Number(value) <= 0)
                return "Base Price must be greater than 0"
            else
                return ""

        case "discount":
            if (value === "" || value === null)
                return "Discount Field is Mandatory"
            else if (Number(value) < 0 || Number(value) > 100)
                return "Discount must be between 0 and 100"
            else
                return ""


        case "stockQuantity":
            if (value === "" || value === null)
                return "Stock Quantity Field is Mandatory"
            else if (Number(value) < 0)
                return "Stock Quantity cannot be negative"
            else
                return ""
        case "question":
        case "answer":
            if (value.length < 10)
                return toSentenceCase(name) + "Field must be more that 10 Characters"
            else
                return ""

        case "siteName":
            if (value.length < 3)
                return toSentenceCase(name) + "Field must be more than 3 Characters"
            else
                return ""
        case "addressOne":
        case "addressTwo":
        case "mapOne":
        case "mapTwo":
        case "email":
        case "phone":
        case "whatsapp":
        case "linkedIn":
        case "gitHub":
        case "instagram":
            if (value.length < 10)
                return toSentenceCase(name) + "Field must be more than 10 Characters"
            else
                return ""

        default:
            return ""

    }
}
function toSentenceCase(str) {
    if (!str) {
        return "";
    }
    // Convert the whole string to lowercase first for normalization
    str = str.toLowerCase();
    console.log("converting")
    // Capitalize the first character and append the rest of the string
    return str.charAt(0).toUpperCase() + str.slice(1);
}

