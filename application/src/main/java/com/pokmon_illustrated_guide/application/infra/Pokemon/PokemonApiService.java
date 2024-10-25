package com.pokmon_illustrated_guide.application.infra.Pokemon;

import com.pokmon_illustrated_guide.application.domain.entity.PokemonInfo;
import com.pokmon_illustrated_guide.application.domain.service.IPokemonApiService;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;
import org.json.JSONException;
import org.springframework.stereotype.Service;

import org.json.JSONArray;
import org.json.JSONObject;

@Service
public class PokemonApiService implements IPokemonApiService {

  @Override
  public List<PokemonInfo> fetchList() {
    String url = "https://pokeapi.co/api/v2/pokemon/";
    HttpClient client = HttpClient.newHttpClient();
    HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create(url))
        .build();

    List<PokemonInfo> response = new ArrayList<PokemonInfo>();

    try{
      HttpResponse<String> result = client.send(request, HttpResponse.BodyHandlers.ofString());

      // JSONをパースしてポケモンの名前を取得・表示
      JSONObject jsonObject = new JSONObject(result.body());
      JSONArray results = jsonObject.getJSONArray("results");

      for (int i=0;i<results.length();i++){
        JSONObject pokemon = results.getJSONObject(i);
        response.add(new PokemonInfo(pokemon.getString("name") ,pokemon.getString("url")));
      }

      return response;
    } catch (IOException | InterruptedException | JSONException e) {
      throw new RuntimeException(e);
    }
  }
}
