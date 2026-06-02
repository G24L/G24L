package com.bugland.support.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Leitet alle Frontend-Routen an index.html weiter, damit das
 * clientseitige Routing von Next.js funktioniert.
 *
 * API-Pfade (/api/...) und statische Assets (Dateien mit Endung)
 * werden von diesem Controller NICHT abgefangen.
 */
@Controller
public class ForwardController {

    @GetMapping(value = {"/", "/{path:^(?!api|_next|favicon\\.ico|.*\\..*).*$}"})
    public String forward() {
        return "forward:/index.html";
    }
}
