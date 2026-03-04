export function formateToNormalDateTime(dateTime){
    return dateTime.split("T")[0];
}
export function formateTimeFromDateString(dateTime){
    return dateTime.split("T")[1].split(".")[0];
}