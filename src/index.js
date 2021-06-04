import { AlphabetSoup } from "./alphabetSoup";
import prompt from "prompt";
import {
  getPresentation,
  getMessage,
  getMessageError,
  getMessageSuccess,
  getMessageWarning,
} from "./helpers/promp";

const onError = () => {
  console.error(getMessageError());
  return 1;
};

console.info(getPresentation());
prompt.start();
const recursivePrompt = (message) => {
  prompt.get([message], function (error, result) {
    if (error) {
      return onError();
    }
    const alphabetSoup = new AlphabetSoup(result[message]);
    if (alphabetSoup.SelectedCase) {
      console.info(getMessageSuccess(alphabetSoup.GetSearchWordCount()));
    } else {
      console.info(getMessageWarning());
      recursivePrompt(getMessage());
    }
  });
};
recursivePrompt(getMessage());
