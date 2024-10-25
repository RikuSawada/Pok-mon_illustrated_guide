package com.pokmon_illustrated_guide.application.domain.service.classes;


import com.pokmon_illustrated_guide.application.domain.service.IDeepLService;
import com.pokmon_illustrated_guide.application.domain.service.ISampleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SampleService implements ISampleService {

    @Autowired
    IDeepLService deepLService;

    @Override
    public String translate(String japaneseText) {
        return deepLService.translate(japaneseText);
    }
}