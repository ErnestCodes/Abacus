const truncate = (str: string, num: number) => {
  if (str?.length > num) {
    let subStr = str.substring(0, num);
    return subStr + "...";
  } else {
    return str;
  }
};

export default truncate;
