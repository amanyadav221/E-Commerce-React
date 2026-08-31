export default function ImageValidator(e) {
    if (e.target.files.length == 0)
        return "Pic Field is Mandatory!!! hello"
    else if (e.target.files.length == 1) {
        let pic = e.target.files[0]
        console.log(pic.length)
        if (!(pic.type === "image/jpeg" || pic.type === "image/jpg" || pic.type === "image/png" || pic.type === "image/gif"))
            return "Invalid Pic Format, Please upload An Image of Type .jpeg, .jpg, .png, gif."
        else if (pic.size > 1048576)
            return "Pic Size Too High, Please Upload an Image upto 1MB."

    } else {
        let files = Array.from(e.target.files)
        let errorMessage = []
        files.forEach((files, index) => {
            if (!(files.type === "image/jpeg" || files.type === "image/jpg" || files.type === "image/png" || files.type === "image/gif"))
                errorMessage.push(`Invalid Pic Format  ${index + 1}, Please upload An Image of Type .jpeg, .jpg, .png, gif.`)
            else if (files.size > 1048576)
                errorMessage.push(`Pic Size ${index + 1}  Too High, Please Upload an Image upto 1MB.`)
        })
        return errorMessage.length ? errorMessage : ""
    }

}
