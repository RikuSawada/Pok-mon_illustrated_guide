package com.pokmon_illustrated_guide.application.controller.api.params.Sample;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class SampleResponseParams {
  String message;

  public SampleResponseParams(String message) {
    this.message = message;
  }
}
