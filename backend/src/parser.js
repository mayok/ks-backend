import { parseString } from 'xml2js';

const parser = xml => new Promise((resolve, reject) => {
  parseString(xml, (err, res) => {
    if (err) reject(err);

    const data = res.data;

    // <numberOfRecords>1</numberOfRecords>
    // <numberOfReturn>1</numberOfReturn>
    // <startRecord>1</startRecord>
    // const numberOfRecords = data.numberOfRecords;
    // const numberOfReturn = data.numberOfReturn;
    // const startRecord = data.startRecord;

    // TODO 本来は numberOfReturn の数を考慮しないといけない
    // numberOfReturn.times do |i|
      // records =  data.records[i]

    const meetingRecord = data.records[0].record[0].recordData[0].meetingRecord[0];
    const nameOfHouse = meetingRecord.nameOfHouse[0];
    const nameOfMeeting = meetingRecord.nameOfMeeting[0];
    const date = meetingRecord.date[0];

    const speechRecord = meetingRecord.speechRecord;
    // TODO ここで，発言者ごとに区切りをいれたい
    // 人が変わるタイミング
    // 会長が以下の発言をした時
    // 以上で ~ の発言は終了いたしました
    // 次に，~ 君。

    resolve({
      nameOfHouse,
      nameOfMeeting,
      date,
      speechRecord,
    });
  });
});

export default parser;
