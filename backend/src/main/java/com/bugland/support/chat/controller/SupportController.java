package com.bugland.support.chat.controller;

import com.bugland.support.chat.dto.ChatRequest;
import com.bugland.support.chat.dto.ChatResponse;
import com.bugland.support.chat.service.SupportService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST-Controller für den BUGLAND First-Level-Support-Chatbot.
 *
 * Stellt POST /api/support/chat bereit. CORS ist für das Next.js-
 * Frontend auf localhost:3000 und localhost:3001 freigegeben.
 */
@RestController
@RequestMapping("/api/support")
public class SupportController {

    private final SupportService supportService;

    public SupportController(SupportService supportService) {
        this.supportService = supportService;
    }

    /**
     * Empfängt eine Konversation und gibt die nächste Assistenten-Antwort zurück.
     *
     * Request-Body: { "messages": [{ "role": "user"|"assistant", "content": "..." }, ...] }
     * Response:     { "reply": "...", "escalate": true|false }
     *
     * Das Feld "escalate" signalisiert dem Frontend, Kontaktdaten für einen
     * menschlichen Mitarbeiter anzuzeigen.
     *
     * @param request validierter Request mit dem vollständigen Chatverlauf
     * @return HTTP 200 mit ChatResponse oder HTTP 400 bei Validierungsfehler
     */
    @PostMapping("/chat")
    public ResponseEntity<ChatResponse> chat(@Valid @RequestBody ChatRequest request) {
        ChatResponse response = supportService.process(request);
        return ResponseEntity.ok(response);
    }
}
