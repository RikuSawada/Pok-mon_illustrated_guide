package com.pokmon_illustrated_guide.application.domain.service;

import com.pokmon_illustrated_guide.application.domain.entity.PokemonInfo;
import java.util.List;

public interface IPokemonApiService {
    List<PokemonInfo> fetchList();
}
