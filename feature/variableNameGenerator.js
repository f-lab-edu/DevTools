const { Configuration, OpenAIApi } = require("openai");

const openAIkey ='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'; //보안성 취약
const configuration = new Configuration({
    apiKey: openAIkey,
});
const openai = new OpenAIApi(configuration);
const btnSearch = document.getElementById('btn_search');
const textInputBox = document.getElementById('vng_InputBox');


async function chatGptPrompt(textVal){
    console.log('chatGpt : ',textVal);
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003", //모델명
            prompt: textVal, //명령문
            temperature: 1, // 정확도(0~2) 사이에서 핵심적인 답변 증가
            max_tokens: 256, //최대 토큰수
            top_p: 1,
            frequency_penalty: 0, //같은 답변에 대한 가능성
            presence_penalty: 0, //세 주제에 대한 가능성
        });
        const answer = completion.data.choices[0].text;
        return answer
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
    }
}
//api key : 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
btnSearch.addEventListener('click',()=>{
    const textVal = textInputBox.value;
    console.log("click ",textVal);
    const answer = chatGptPrompt(textVal);
 //   console.log('btnSearch answer =: ', answer);

});


