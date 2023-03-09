export default (str?: string, num?: number) => {
    if (str === undefined) {
        return ""
    }
    if (num === undefined) {
        num = 10
    }
    if (num > str.length){
      return str;
    } else{
      str = str.substring(0,num);
      return str+"...";
    } 
}
