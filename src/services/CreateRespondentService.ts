/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Respondent from '../models/Respondent';
import Forms from '../models/Form';

interface Request {
  gender: string;
  schooling: string;
  age: Date;
  state: string;
  questionsAnswer: number[];
  form_id: string;
}

class CreateRespondentService {
  public async execute({
    gender,
    schooling,
    age,
    state,
    questionsAnswer,
    form_id,
  }: Request): Promise<Respondent> {
    let extraversion = 0;
    let conscientiousness = 0;
    let agreeableness = 0;
    let openness = 0;
    let neuroticism = 0;

    const formsRepository = getRepository(Forms);

    const form = await formsRepository.findOneOrFail({
      where: {
        id: form_id,
      },
    });

    for (let i = 0; i < questionsAnswer.length; i++) {
      switch (form.inventory.questions[i].trait) {
        case 'Extroversão':
          extraversion +=
            questionsAnswer[i] *
            (form.inventory.questions[i].inverted ? -1 : 1);
          break;

        case 'Conscienciosidade':
          conscientiousness +=
            questionsAnswer[i] *
            (form.inventory.questions[i].inverted ? -1 : 1);
          break;

        case 'Amabilidade':
          agreeableness +=
            questionsAnswer[i] *
            (form.inventory.questions[i].inverted ? -1 : 1);
          break;

        case 'Abertura à experiência':
          openness +=
            questionsAnswer[i] *
            (form.inventory.questions[i].inverted ? -1 : 1);
          break;

        case 'Neuroticismo':
          neuroticism +=
            questionsAnswer[i] *
            (form.inventory.questions[i].inverted ? -1 : 1);
          break;

        default:
          break;
      }
    }

    const respondentsRepository = getRepository(Respondent);

    const respondents = respondentsRepository.create({
      gender,
      schooling,
      age,
      state,
      questionsAnswer,
      form_id,
      extraversion,
      conscientiousness,
      agreeableness,
      openness,
      neuroticism,
    });

    await respondentsRepository.save(respondents);

    return respondents;
  }
}

export default CreateRespondentService;
