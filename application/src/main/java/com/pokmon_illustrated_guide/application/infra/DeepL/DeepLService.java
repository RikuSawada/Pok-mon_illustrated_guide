package com.pokmon_illustrated_guide.application.infra.DeepL;

import com.deepl.api.DeepLException;
import com.deepl.api.TextResult;
import com.deepl.api.Translator;
import com.pokmon_illustrated_guide.application.domain.service.ISampleService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class DeepLService implements ISampleService {

  Translator translator;

  @Value("${deepl.api.key}")
  String apiKey;

  public String translate(String japaneseText) {
    translator = new Translator(apiKey);

    try {
      TextResult result =
          translator.translateText(japaneseText, "ja", "en-US");
      return result.getText();
    } catch (DeepLException | InterruptedException e){
      e.printStackTrace();
    }
    return "";
  }
}
