package com.pokmon_illustrated_guide.application.domain.service;

import com.deepl.api.DeepLException;
import org.springframework.stereotype.Service;

@Service
public interface IDeepLService {
  String translate(String JapaneseText);
}
