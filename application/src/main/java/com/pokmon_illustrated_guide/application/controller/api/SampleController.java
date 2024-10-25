package com.pokmon_illustrated_guide.application.controller.api;

import com.pokmon_illustrated_guide.application.controller.api.params.Sample.SampleRequestParams;
import com.pokmon_illustrated_guide.application.controller.api.params.Sample.SampleResponseParams;
import com.pokmon_illustrated_guide.application.domain.entity.PokemonInfo;
import com.pokmon_illustrated_guide.application.domain.service.ISampleService;
import jakarta.validation.Valid;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sample")
public class SampleController {
  @Autowired
  ISampleService sampleService;

  private final Logger logger = LoggerFactory.getLogger("appLogger");

  @GetMapping("translate")
  public SampleResponseParams translate(@Valid @ModelAttribute SampleRequestParams params) {
    logger.info("/api/sample/translate:"+params);

    String url = "https://pokeapi.co/api/v2/pokemon/";

    // http通信を行うための準備
    HttpClient client = HttpClient.newHttpClient();
    HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create(url))
        .build();

    List<PokemonInfo> response = new ArrayList<PokemonInfo>();

    try{
      // ポケモンAPIにリクエスト送信
      HttpResponse<String> result = client.send(request, HttpResponse.BodyHandlers.ofString());

      // 受け取ったレスポンスをJSONをパースしてポケモンの名前を取得・表示
      JSONObject jsonObject = new JSONObject(result.body());
      JSONArray results = jsonObject.getJSONArray("results");

      for (int i=0;i<results.length();i++){
        JSONObject pokemon = results.getJSONObject(i);
        response.add(new PokemonInfo(pokemon.getString("name") ,pokemon.getString("url")));
      }
    } catch (IOException | InterruptedException | JSONException e) {
      throw new RuntimeException(e);
    }

    return new SampleResponseParams(response);
  }

  @PostMapping("translate")
  public SampleResponseParams translatePost(@Valid @RequestBody SampleRequestParams params) {
    logger.info("/api/sample/translate:"+params);
    return new SampleResponseParams(sampleService.translate());
  }

}
