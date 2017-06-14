import parser from '../src/parser';

const describe = require('mocha').describe;
const it = require('mocha').it;

describe('xml', () => {
  describe('parser function', () => {
    it('should return json', () => {
      parser(
        `<data>
          <numberOfRecords>1</numberOfRecords>
          <numberOfReturn>1</numberOfReturn>
          <startRecord>1</startRecord>
          <records>
            <record>
              <recordData>
                <meetingRecord>
                  <session>186</session>
                  <nameOfHouse>name of house</nameOfHouse>
                  <nameOfMeeting>name of meeting</nameOfMeeting>
                  <issue>1号</issue>
                  <date>2014-06-11</date>
                  <speechRecord>
                    <speechOrder>0</speechOrder>
                    <speaker>speaker name is here</speaker>
                    <speech>speech is here.</speech>
                  </speechRecord>
                  <speechRecord>
                    <speechOrder>1</speechOrder>
                    <speaker>speaker name is here</speaker>
                    <speech>speech is here.</speech>
                  </speechRecord>
                </meetingRecord>
              </recordData>
            </record>
          </records>
        </data>`).then(data => console.log(data))
                 .catch(err => console.log(err));
    });
  });
});
