const btnParser = document.querySelector('.parser');
const btnClear = document.querySelector('.clear');
const btnJsonToCsvFile = document.querySelector('.jsonToCsvFile');
const btnJsonToXlsFile = document.querySelector('.jsonToXlsFile');

const textArea = document.getElementById('jp_TextArea');
let jsonDataBackup ;
//const fs = require('fs'); //node fs 모듈 사용


//Ex
//[{"id":1,"first_name":"Eolanda","last_name":"Druce","email":"edruce0@cbsnews.com","gender":"Female"}]

/*
*
*
*[{"id":1,"first_name":"Eolanda","last_name":"Druce","email":"edruce0@cbsnews.com","gender":"Female"},
{"id":2,"first_name":"Hyman","last_name":"Steely","email":"hsteely1@columbia.edu","gender":"Male"},
{"id":3,"first_name":"Mommy","last_name":"Ghirardi","email":"mghirardi2@rambler.ru","gender":"Female"},
{"id":4,"first_name":"Darnall","last_name":"Earry","email":"dearry3@irs.gov","gender":"Male"},
{"id":5,"first_name":"Lionello","last_name":"Le Franc","email":"llefranc4@home.pl","gender":"Male"},
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
        jsonDataBackup = jsonData;
        btnJsonToCsvFile.setAttribute()
    }catch (err){
        let errMsg =textArea.value == ""? "값을 입력해주세요.":"Json형식의 데이터가 아닙니다. 다시 입력해주세요.";
        alert("[ERROR]" + errMsg);
        textArea.value ="";
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
    let test = jsonToCSV(jsonDataBackup);
    console.log("test => ", test);
});










function clear(){
    textArea.value = "";
    jsonDataBackup = "";
}


//jsonToCsv
function jsonToCSV(jsonData) {
    // 1. json 데이터 취득
    const json_array = jsonData;
    console.log(json_array);
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



//




//eof end of file