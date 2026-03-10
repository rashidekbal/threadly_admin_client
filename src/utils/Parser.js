 export function parseComments(comment) {
    let temp = comment.split(" ");
    if (temp.length < 0) return new Array();
    const tempArray = new Array();
    for (let i = 0; i < temp.length; i++) {
      if (!temp[i].includes("@")) {
        tempArray.push({ tag: false, value: temp[i] });
      } else {
        const temp2 = temp[i].split("@");
        if (temp2.length == 1) {
            tempArray.push({tag:true,value:temp[i]});
        } else {
          for (let j = 0; j < temp2.length; j++) {
            if (j == 0 && temp2[j]) {
              tempArray.push({ tag: false ,value:temp2[j]});
            }else if(temp2[j]){
                    tempArray.push({tag:true,value:"@"+temp2[j]});
            }
          }
        }
      }
    }
    return tempArray;
  }