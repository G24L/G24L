package com.bugland.support.chat.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

/**
 * Kapselt HTTP-Aufrufe an die lokale Ollama-Instanz.
 *
 * Sendet einen Prompt an /api/generate und liefert die
 * vollständige Modellantwort als String zurück (kein Streaming).
 */
@Service
public class OllamaClient {

    private final WebClient webClient;
    private final String model;
    private final double temperature;

    public OllamaClient(
            @Value("${app.ollama.base-url}") String baseUrl,
            @Value("${app.ollama.model}") String model,
            @Value("${app.ollama.temperature}") double temperature
    ) {
        this.webClient = WebClient.builder().baseUrl(baseUrl).build();
        this.model = model;
        this.temperature = temperature;
    }

    /**
     * Sendet einen Prompt an Ollama und blockiert bis zur vollständigen Antwort.
     *
     * @param prompt vollständiger Prompt-Text inklusive Chatverlauf
     * @return generierte Antwort des Modells
     */
    public String complete(String prompt) {
        Map<?, ?> response = webClient.post()
                .uri("/api/generate")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(Map.of(
                        "model", model,
                        "prompt", prompt,
                        "stream", false,
                        "options", Map.of("temperature", temperature)
                ))
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        if (response == null || response.get("response") == null) {
            return "Entschuldigung, ich konnte keine Antwort generieren. "
                    + "Bitte kontaktieren Sie uns direkt: support@bugland.de";
        }
        return String.valueOf(response.get("response"));
    }
}
