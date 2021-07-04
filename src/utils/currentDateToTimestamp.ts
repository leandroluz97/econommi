import firebase from "../config/firebase-config";

export default function currentDateToTimestamp() {
  //get atual date
  const date = new Date();
  //const day = date.getDate();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;

  //get the last day of the atual month ( 1-31)
  const totalDayOfMonth = new Date(year, month + 1, 0).getDate();

  //check if localstorage doesn't have any dated
  const storagedDate = localStorage.getItem("@econommi:currentMonthId");
  if (storagedDate) {
    month = Number(JSON.parse(storagedDate));
  }

  //first and last day of the month
  const startOfMonth = `${year}-${month}-${1}`;
  const endOfMonth = `${year}-${month}-${totalDayOfMonth}`;
  //const startOfMonth = `${year}-${month + 1}-${21}`;
  //const endOfMonth = `${totalDayOfMonth}-${monthId}-${year}`;

  //convert the start day of month to firestore timpstamp
  const timestampStartOfMonth = firebase.firestore.Timestamp.fromDate(
    new Date(startOfMonth)
  );

  //convert the last day of month to firestore timpstamp
  const timestampEndOfMonth = firebase.firestore.Timestamp.fromDate(
    new Date(endOfMonth)
  );

  return { timestampStartOfMonth, timestampEndOfMonth };
}
