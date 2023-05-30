"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utility = void 0;
const axios_1 = require("axios");
const axios_2 = require("axios");
class Utility {
    constructor() {
        this.apiUrl = '';
        this.apiKey = '';
    }
    async invokeAPI(tempPompt, command) {
        let prompt = this.createPrompt(tempPompt, command);
        const data = {
            prompt: prompt,
            max_tokens: 1000
        };
        this.getAPIParameters();
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        try {
            const response = await axios_1.default.post(this.apiUrl, data, {
                headers: this.headers
            });
            return response.data.choices[0].text.toString();
        }
        catch (error) {
            console.error(error);
            if (axios_1.default.isAxiosError(error)) {
                const axiosError = error;
                if (axiosError.response) {
                    // Access the error response data
                    console.log('Error Response:', axiosError.response.data);
                    console.log('Error Status:', axiosError.response.status);
                    console.log('Error Headers:', axiosError.response.headers);
                }
            }
            throw error;
        }
        finally {
            // Re-enable SSL verification
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';
        }
    }
    createPrompt(tempPompt, command) {
        let prompt = tempPompt.replace("\r\n", "\\n");
        switch (command) {
            case 'suggest':
                prompt = "Suggest on below code \\" + prompt;
                break;
            case 'optimize':
                prompt = "Optimize below code \\" + prompt;
                break;
            case 'explain':
                prompt = "Explain below code \\" + prompt;
                break;
            case 'tests':
                prompt = "Create Unit Tests \\" + prompt;
                break;
            case 'advise':
                prompt = "Advise on below \\" + prompt;
                break;
            default:
                break;
        }
        return prompt;
    }
    getAPIParameters() {
        this.apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
        this.apiKey = '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';
        this.headers = new axios_2.AxiosHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
        });
    }
}
exports.Utility = Utility;
/*

export async function invokeAPI(tempPompt:string,command:string){
  let prompt = createPrompt(tempPompt,command);
  const data = {
    prompt: prompt,
    max_tokens: 100
  };
  await axios.post(apiUrl, data, {
    headers: headers,
  })
  .then(response => {
    return response.data.choices[0].text
  })
  .catch(error => {
    console.error(error);
    return error;
  });
}


function createPrompt(tempPompt:string,command:string){
  let prompt: String = tempPompt.replace("\r\n", "\\n");
  switch(command){
    case 'suggest':
      prompt = "Suggest on below code" + prompt;
      break;
    case 'optimize':
      prompt = "Optimize below code" + prompt;
      break;
    case 'explain':
      prompt = "Explain below code" + prompt;
      break;
    case 'tests':
      prompt = "Create Unit Tests" + prompt;
      break;
    case 'advise':
      prompt = "Advise on below" + prompt;
      break;
    default:
      break;
  }
  return prompt;
}

function getAPIParameters(){
  const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
  const apiKey = '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';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
  };
}
}
*/ 
//# sourceMappingURL=utility.js.map