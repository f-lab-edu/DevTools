const btnParser = document.querySelector('.parser');
const btnClear = document.querySelector('.clear');
const btnJsonToCsvFile = document.querySelector('.jsonToCsvFile');
const btnJsonToXlsFile = document.querySelector('.jsonToXlsFile');
const textArea = document.getElementById('jp_TextArea');

let jsonDataBackup ;




//Ex 예시 데이터 
//[{"id":1,"first_name":"Eolanda","last_name":"Druce","email":"edruce0@cbsnews.com","gender":"Female"}]

/*
*
*
*[{"id":1,"first_name":"Eolanda","last_name":"Druce","email":"edruce0@cbsnews.com","gender":"Female"},
{"id":2,"first_name":"Hyman","last_name":"Steely","email":"hsteely1@columbia.edu","gender":"Male"},
{"id":3,"first_name":"Mommy","last_name":"Ghirardi","email":"mghirardi2@rambler.ru","gender":"Female"},
{"id":4,"first_name":"Darnall","last_name":"Earry","email":"dearry3@irs.gov","gender":"Male"},
{"id":5,"first_name":"Lionelloㄷ,"last_name":"Le Franc","email":"llefranc4@home.pl","gender":"Male"},
{"id":6,"first_name":"Chastity","last_name":"Egle","email":"cegle5@linkedin.com","gender":"Female"},
{"id":7,"first_name":"Moe","last_name":"Pryde","email":"mpryde6@clickbank.net","gender":"Male"},
{"id":8,"first_name":"Erminia","last_name":"Brigden","email":"ebrigden7@dedecms.com","gender":"Female"},
{"id":9,"first_name":"Ingram","last_name":"Nestoruk","email":"inestoruk8@weibo.com","gender":"Male"},
{"id":10,"first_name":"Joanie","last_name":"Von Der Empten","email":"jvonderempten9@bloomberg.com","gender":"Female"}]

* *
* */

//button event

//json parse
btnParser.addEventListener('click',() => {
    try{
        let jsonData =JSON.parse(textArea.value); //json Object 로 변환
        let jsonDataParse =JSON.stringify(jsonData,null,4); //json Object 로 변환된 값을 문자열로 변환 및 탭 처리
        textArea.value =jsonDataParse ;
        jsonDataBackup = jsonData; //파일 변환을 위한 json 데이터 백업

        btnJsonToCsvFile.removeAttribute("disabled");
    }catch (err){
        errTracker(err.message);
        let errMsg =textArea.value == ""? "값을 입력해주세요.":"Json형식의 데이터가 아닙니다. 다시 입력해주세요.";
        console.log("[ERROR]  ",err);
        alert("[ERROR]" + errMsg);
        //textArea.value ="";
        textArea.focus();
    }

});
//btn clear
btnClear.addEventListener('click',() =>{
    clear();
    textArea.focus();
});

//btn jsonToCsvFile
btnJsonToCsvFile.addEventListener('click',() => {

    let csvData = jsonToCSV(jsonDataBackup); //jsonData Csv 형식 데이터로 변환
    createDownLoadLink(csvData); //변환된 데이터 다운로드
});

/**
 * errTracker
 *  ValidationErr :  ','or '}' or ']' Json 데이터의 특정 기호를 누락하였거나 더 넣었을 경우 발생
 *  UnterminatedErr: 문자열 값의 (" ")  (더블 커테이션) 이 제대로 안닫혀있거나 표기를 안했을떄 발생
 *  UnexpectedErr : json형식 데이터가 아닌 임의에 다른 데이터를 넣었을떄나 아무런값도 집어넣지 않았을때 발생
 * */
function errTracker(errMsg){

    let errType = errMsg.startsWith('Expe')?'ValidationErr':errMsg.startsWith('Unte')?
                  'UnterminatedErr':errMsg.startsWith('Unex')?
                    'UnexpectedErr':errMsg;

    switch (errType){

        case "ValidationErr":
            console.log('ValidatinErr 입니다.');
            let errIndex = errMsg.slice(-2);
            findErrPosition(errIndex);

            break;
        case "UnterminatedErr":
            console.log('UnterminatedErr 입니다.');
            break;
        case "UnexpectedErr":
            console.log('UnexpectedErr 입니다.');
            break;
        default:
            console.error('[ERROR] ',errMsg);

    }
//   [{"id":1,"first_name":"Eolanda","last_name":"Druce","email":"edruce0@cbsnews.com","gender":"Female"}]
    console.log('jsonValidation : ',errMsg);
    console.log('errType : ',errType);



}

function findErrPosition(index){
    console.log('findErrPosition start');
    // textarea 태그의 값을 가져옵니다.
    const textareaValue = textArea.value
    // 스타일 속성을 선택하고 값을 변경합니다.
    const startIndex = index; // 시작 위치
    const length = 5; // 변경할 문자열의 길이
    const targetText = textareaValue.substring(startIndex, startIndex + length);
    const styledText = "<span style='color:red'>" + targetText + "</span>";
    const replacedText = textareaValue.substring(0, startIndex) + styledText + textareaValue.substring(startIndex + length);
    textArea.innerHTML = replacedText;
}

//임시 다운로드 링크 생성 및 클릭 이벤트
function  createDownLoadLink(data){
    let fileDown ="data:text;charset=utf-8,\ufeff" + data;
    let encodedUri = encodeURI(fileDown);
    let link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "numbers.csv");

    document.body.appendChild(link); //임시로 만든 링크를 append
    link.click(); //링크 클릭 이벤트
    document.body.removeChild(link); //클릭 이벤트가 종료되면 삭제 처리
}

//clear
function clear(){
    textArea.value = "";
    jsonDataBackup = "";
    btnJsonToCsvFile.setAttribute("disabled",true);
    btnJsonToXlsFile.setAttribute("disabled",true);
}


//jsonToCsv
function jsonToCSV(jsonData) {
    // 1. json 데이터 취득
    const json_array = jsonData;
    // 2. CSV 문자열 변수 선언: json을 csv로 변환한 문자열이 담길 변수
    let csv_string = '';
    // 3. 제목 추출: json_array의 첫번째 요소(객체)에서 제목(머릿글)으로 사용할 키값을 추출
    const titles = Object.keys(json_array[0]);
    // 4. CSV문자열에 제목 삽입: 각 제목은 컴마로 구분, 마지막 제목은 줄바꿈 추가
    titles.forEach((title, index)=>{
        csv_string += (index !== titles.length-1 ? `${title},` : `${title}\r\n`);
    });
    // 5. 내용 추출: json_array의 모든 요소를 순회하며 '내용' 추출
    json_array.forEach((content, index)=>{

        let row = ''; // 각 인덱스에 해당하는 '내용'을 담을 행

        for(let title in content){ // for in 문은 객체의 키값만 추출하여 순회함.
            // 행에 '내용' 할당: 각 내용 앞에 컴마를 삽입하여 구분, 첫번째 내용은 앞에 컴마X
            row += (row === '' ? `${content[title]}` : `,${content[title]}`);
        }

        // CSV 문자열에 '내용' 행 삽입: 뒤에 줄바꿈(\r\n) 추가, 마지막 행은 줄바꿈X
        csv_string += (index !== json_array.length-1 ? `${row}\r\n`: `${row}`);
    })
    // 6. CSV 문자열 반환: 최종 결과물(string)
    return csv_string;
}







//eof end of file