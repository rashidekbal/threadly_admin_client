export function generatePreviewUrl(url){
    let fragments=url.split(".");
    fragments[fragments.length-1]="jpg";
    const result =fragments.join(".");
    return result;
    
}
