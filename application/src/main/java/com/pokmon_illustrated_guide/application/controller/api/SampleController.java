package com.pokmon_illustrated_guide.application.controller.api;

import com.pokmon_illustrated_guide.application.controller.api.params.Sample.SampleRequestParams;
import com.pokmon_illustrated_guide.application.controller.api.params.Sample.SampleResponseParams;
import com.pokmon_illustrated_guide.application.domain.service.ISampleService;
import jakarta.validation.Valid;
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
    return new SampleResponseParams(sampleService.translate(params.getJapaneseMessage()));
  }

  @PostMapping("translate")
  public SampleResponseParams translatePost(@Valid @RequestBody SampleRequestParams params) {
    logger.info("/api/sample/translate:"+params);
    return new SampleResponseParams(sampleService.translate(params.getJapaneseMessage()));
  }

}
