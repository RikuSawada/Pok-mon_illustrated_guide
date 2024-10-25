package com.pokmon_illustrated_guide.application.domain.service;

import com.deepl.api.DeepLException;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public interface ISampleService {
  String translate(String JapaneseText);
}
