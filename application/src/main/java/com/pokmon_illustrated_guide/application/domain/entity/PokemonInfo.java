package com.pokmon_illustrated_guide.application.domain.entity;

import jakarta.persistence.Entity;
import lombok.Getter;

@Getter
public class PokemonInfo {
  private final String name;
  private final String url;

  public PokemonInfo(String name, String url) {
    this.name = name;
    this.url = url;
  }


}
