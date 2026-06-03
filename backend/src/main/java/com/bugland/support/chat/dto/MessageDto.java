package com.bugland.support.chat.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record MessageDto(
        @NotBlank @Pattern(regexp = "user|assistant") String role,
        @NotBlank String content
) {}
