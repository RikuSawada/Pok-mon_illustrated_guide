package com.pokmon_illustrated_guide.application.controller.api.params.Sample;

import com.pokmon_illustrated_guide.application.domain.entity.PokemonInfo;
import java.util.List;
import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class SampleResponseParams {
  List<PokemonInfo> pokemonInfoList;

  public SampleResponseParams(List<PokemonInfo> pokemonInfoList) {
    this.pokemonInfoList = pokemonInfoList;
  }
}
