package com.pokmon_illustrated_guide.application.controller.api.params.Sample;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class SampleRequestParams {
  @NotEmpty(message = "japaneseMessage cannot be empty")
  private String japaneseMessage;
}
