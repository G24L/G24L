package com.bugland.support.chat.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

/**
 * Kapselt HTTP-Aufrufe an die lokale Ollama-Instanz.
 *
 * Verwendet /api/chat mit expliziten Rollen (system, user, assistant),
 * damit der Systemkontext vom Modell zuverlässig befolgt wird.
 */
@Service
public class OllamaClient {

    private static final String FALLBACK = "Entschuldigung, ich konnte keine Antwort generieren. "
            + "Bitte kontaktieren Sie uns direkt: support@bugland.de";

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
     * Sendet eine Nachrichtenliste an /api/chat und gibt die Antwort zurück.
     *
     * Jede Map in der Liste hat die Felder "role" (system/user/assistant)
     * und "content". Der Systemkontext steht dabei als erste Nachricht
     * mit role="system", damit das Modell ihn prioritär verarbeitet.
     *
     * @param messages vollständige Nachrichtenliste inkl. Systemrolle
     * @return generierte Antwort des Modells
     */
    public String chat(List<Map<String, String>> messages) {
        Map<?, ?> response = webClient.post()
                .uri("/api/chat")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(Map.of(
                        "model", model,
                        "messages", messages,
                        "stream", false,
                        "options", Map.of("temperature", temperature)
                ))
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        if (response == null) return FALLBACK;

        Map<?, ?> message = (Map<?, ?>) response.get("message");
        if (message == null || message.get("content") == null) return FALLBACK;

        return String.valueOf(message.get("content"));
    }
}
