package com.pokmon_illustrated_guide.application.domain.service;

import com.pokmon_illustrated_guide.application.domain.entity.PokemonInfo;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public interface ISampleService {
  List<PokemonInfo> translate();
}
