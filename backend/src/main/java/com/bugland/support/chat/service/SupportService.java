package com.bugland.support.chat.service;

import com.bugland.support.chat.dto.ChatRequest;
import com.bugland.support.chat.dto.ChatResponse;
import com.bugland.support.chat.dto.MessageDto;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Verarbeitet Kundenanfragen im First-Level-Support.
 *
 * Baut aus dem Chatverlauf einen Prompt mit dem BUGLAND-System-Prompt,
 * ruft Ollama auf und erkennt, ob die Antwort eine Eskalation auslöst.
 *
 * Eskalation tritt auf, wenn das Modell im Antworttext Schlüsselwörter
 * verwendet, die eine Weiterleitung an einen menschlichen Mitarbeiter
 * signalisieren (z. B. "Mitarbeiter", "weiterleiten").
 */
@Service
public class SupportService {

    private static final String SYSTEM_PROMPT = """
            Du bist BugBot, der offizielle First-Level-Support-Chatbot von BUGLAND Ltd.
            Du hilfst Kunden bei Fragen und Problemen rund um die Smart-Home-Produkte von BUGLAND.
            Du bist freundlich, geduldig, lösungsorientiert und kommunizierst klar und verständlich.
            Du beantwortest Anfragen auf Deutsch, es sei denn, der Kunde schreibt in einer anderen Sprache.

            ÜBER BUGLAND:
            BUGLAND Ltd. ist ein innovatives Start-up für Smart-Home-Technologien (gegründet 2018).

            PRODUKTE & BEKANNTE PROBLEME:
            - Cleanbug (Saug- und Wischroboter):
              PROBLEM 1: Stürzt bei Treppenstufen ab/bricht oder bleibt hängen.
                LÖSUNG: Virtuelle Begrenzungszonen in der App einrichten, Treppenbereich mit Magnetstreifen absperren.
                Bei Bruch: Ersatzgerät anfordern (keine Reparatur mit Originalteilen möglich).
              PROBLEM 2: Saug-/Wischfunktion unzureichend.
                LÖSUNG: Filter und Bürsten reinigen, Firmware-Update in der App durchführen.
            - Windowfly (Fensterreinigungsgerät):
              PROBLEM: Saugt sich fest, schwer ablösbar, kann Fenster beschädigen.
                LÖSUNG: Nur auf glattem sauberem Glas verwenden, Akku vor Betrieb voll laden.
                Bei Bruch oder gebrochenem Fenster: Ersatzgerät anfordern, Schaden dokumentieren.
            - Gardenbeetle (Rasenmäher/Unkrautentferner):
              LÖSUNG: Mähplan und Begrenzungsdraht prüfen, Software-Update durchführen.
                Bei Hardwareschaden: Eskalation.

            WICHTIG: Defekte Geräte können NICHT repariert werden – es gibt keine Originalersatzteile.
            Defekte Geräte werden immer durch ein Ersatzgerät ausgetauscht.

            ERSATZGERÄT ANFORDERN:
            - Seriennummer des defekten Geräts erfragen
            - Kaufdatum und Kaufnachweis erfragen
            - Vorgang an Mitarbeiter übergeben

            APP/KONFIGURATIONSPROBLEME:
            - App deinstallieren und neu installieren
            - Gerät zurücksetzen (Reset-Taste 10 Sekunden halten)
            - WLAN-Verbindung prüfen (2,4 GHz empfohlen)

            ESKALATION AN MITARBEITER wenn:
            - Hardwaredefekt/Bruch nicht anders lösbar
            - Kunde fragt ausdrücklich nach einem Mitarbeiter
            - Mehr als 2 Lösungsversuche ohne Erfolg
            - Kunde erwähnt rechtliche Schritte oder Erstattungen
            - Kunde ist sehr aufgebracht
            Eskalationstext: "Ich verstehe Ihre Frustration und es tut mir leid. Ich leite Sie jetzt an einen unserer Mitarbeiter weiter."
            Verwende dabei immer das Wort "Mitarbeiter" oder "weiterleiten".

            NICHT ZUSTÄNDIG FÜR: Preise/Rabatte, Lieferzeiten, Bestellstatus, rechtliche Fragen, themenfremde Anfragen.
            Antwort: "Für diese Anfrage bin ich leider nicht zuständig, aber ich verbinde Sie gerne mit der richtigen Stelle."

            KOMMUNIKATIONSREGELN:
            - Passe Duzen/Siezen dem Kunden an (Standard: Sie)
            - Keine langen Monologe, stelle gezielte Rückfragen
            - Zeige Empathie: z.B. "Das klingt wirklich ärgerlich, das verstehe ich gut."
            - Keine negativen Formulierungen ("nicht möglich") – stattdessen: "Was ich für Sie tun kann..."
            - Halte Antworten kurz und strukturiert
            """;

    // Schlüsselwörter, die auf eine Eskalation an einen menschlichen Mitarbeiter hinweisen
    private static final List<String> ESCALATION_KEYWORDS = List.of(
            "mitarbeiter", "weiterleiten", "weiterleite", "support@bugland", "+49 800"
    );

    private final OllamaClient ollamaClient;

    public SupportService(OllamaClient ollamaClient) {
        this.ollamaClient = ollamaClient;
    }

    /**
     * Verarbeitet eine Chat-Anfrage und gibt Antwort mit Eskalations-Flag zurück.
     *
     * Pseudocode:
     *   prompt = buildPrompt(request.messages)      // Systemkontext + Verlauf zusammenbauen
     *   reply  = ollamaClient.complete(prompt)       // LLM aufrufen
     *   IF reply enthält Eskalationswort             // Schlüsselwort-Prüfung
     *     RETURN ChatResponse(reply, escalate=true)
     *   ELSE
     *     RETURN ChatResponse(reply, escalate=false)
     *
     * @param request eingehende Nutzeranfrage mit vollständigem Chatverlauf
     * @return Antwort des Assistenten plus Eskalations-Flag
     */
    public ChatResponse process(ChatRequest request) {
        String prompt = buildPrompt(request.messages());
        String reply = ollamaClient.complete(prompt);
        boolean escalate = detectEscalation(reply);
        return new ChatResponse(reply, escalate);
    }

    /**
     * Baut den vollständigen Prompt aus System-Prompt und Chatverlauf zusammen.
     *
     * Aufbau:
     *   [SYSTEM_PROMPT]
     *   Chatverlauf:
     *   KUNDE: <Nachricht>
     *   ASSISTENT: <Antwort>
     *   ...
     *   ASSISTENT: (das Modell soll hier fortsetzen)
     *
     * @param messages vollständiger Gesprächsverlauf
     * @return fertiger Prompt-String für Ollama
     */
    private String buildPrompt(List<MessageDto> messages) {
        StringBuilder sb = new StringBuilder();
        sb.append(SYSTEM_PROMPT).append("\nChatverlauf:\n");

        for (MessageDto msg : messages) {
            String role = "user".equalsIgnoreCase(msg.role()) ? "KUNDE" : "ASSISTENT";
            sb.append(role).append(": ").append(msg.content()).append("\n");
        }

        sb.append("\nASSISTENT: ");
        return sb.toString();
    }

    /**
     * Prüft, ob die Modell-Antwort eine Eskalation an einen Mitarbeiter signalisiert.
     *
     * Schleifen-Pseudocode:
     *   FOR EACH keyword IN ESCALATION_KEYWORDS
     *     IF reply.toLowerCase() enthält keyword
     *       RETURN true
     *   RETURN false
     *
     * @param reply Antworttext des Modells
     * @return true, wenn Eskalations-Schlüsselwort gefunden wurde
     */
    private boolean detectEscalation(String reply) {
        if (reply == null) return false;
        String lower = reply.toLowerCase();
        for (String keyword : ESCALATION_KEYWORDS) {
            if (lower.contains(keyword)) {
                return true;
            }
        }
        return false;
    }
}
