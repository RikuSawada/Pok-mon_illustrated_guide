package com.pokmon_illustrated_guide.application.domain.service.classes;


//import com.pokmon_illustrated_guide.application.domain.service.IDeepLService;
import com.pokmon_illustrated_guide.application.domain.entity.PokemonInfo;
import com.pokmon_illustrated_guide.application.domain.service.IPokemonApiService;
import com.pokmon_illustrated_guide.application.domain.service.ISampleService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SampleService implements ISampleService {

    @Autowired
    IPokemonApiService pokemonApiService;

    @Override
    public List<PokemonInfo> translate() {
        return pokemonApiService.fetchList();
    }
}