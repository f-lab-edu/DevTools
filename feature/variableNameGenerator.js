import 'dotenv';
const { Configuration, OpenAIApi } = require("openai");
const openAIkey = process.env.OPENAI_KEY;
const configuration = new Configuration({
   apiKey: openAIkey
});
const openai = new OpenAIApi(configuration);
const btnSearch = document.getElementById('btn_search');
const textInputBox = document.getElementById('vng_InputBox');


async function chatGptPrompt(textVal,timeout){
    try {
        const connectionOpenAI = openai.createCompletion({

            model: "text-davinci-003", //모델명
            prompt: textVal, //명령문
            temperature: 1, // 정확도(0~2) 사이에서 핵심적인 답변 증가
            max_tokens: 256, //최대 토큰수
            top_p: 1,
            frequency_penalty: 0, //같은 답변에 대한 가능성
            presence_penalty: 0, //세 주제에 대한 가능성

        });
        const completion = await Promise.race([
            connectionOpenAI,
            new Promise((_, reject) => { //실패로 처리하기위해 resolve 매개변수 자리는 생략  하고 reject 함수 만 사용
                setTimeout(() => {
                    console.log("timeOut methode");
                    reject( new Error("[Time out] 요청시간을초과하였습니다."));
                }, timeout);
            }),
        ]);
        const result = completion.data.choices[0].text;
        return result
    } catch (err) {
        console.log("ERROR 발생 : ",err);
        alert("[ERROR] ",err);
        if (err.response) {
            console.log(err.response.status);
            console.log(err.response.data);
        } else {
            console.log(err.message);
        }
    }
}

btnSearch.addEventListener('click',()=>{
    const textVal = textInputBox.value;
    let answer;
    console.log("click ",textVal);
    chatGptPrompt(textVal,3000).then((result) =>console.log("console : ",result) );


});


//eof end of file