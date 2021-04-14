# Zusammenfassung der Berfragung mit Martin Hasitschka

## Verwendung von Traceability

Sie verwenden Traceability in Ihren Projekten.
Sie verwenden Traceability hauptsächlich weil es für Sie ein wichtiges Werkzeug für Planung, Change Management und Application Lifecycle Management ist bzw. weil es den generellen Software Engineering Prozess unterstützt.
Sie verwenden Traceability nicht aus rechtlichen Gründen.

## Probleme bei der Verwendung von Traceability

Sie haben die Erfahrung gemacht, dass die Wartung von Tracelinks in Traceability Matrizen in großen Spreadsheets problematisch sein kann, da solche Spreadsheets rapide wachsen und dann der Wartungsaufwand sehr hoch ist.

## Potentielle Auswirkungen auf den Entiwcklungsprozess und die Entwickler durch die Verwendung von Tracey

Sie sehen Potential, dass Tracey eine Änderung in der Arbeitsweise und der Entwicklerkultur herbeiführen bzw. unterstützen kann.

Durch den Einsatz von Tracey verschiebt sich die Dokumentation und die Verwaltung von Requirements zunehmend in den Verantwortungsbereich von Entwicklern.
Für einen Entwickler reicht es daher nicht aus "nur" Programmierer zu sein.
Es wird eine kulturelle Transformation gefördert bei der sich Programmierer in Richtung Software Entwickler weiterentwickeln.

## Einsatz von Tracey in eigenen Projekten

Aktuell wird Tracey von nur einer Person entwickelt und gewartet.
Der Fortbestand des Projekts ist deswegen mit einem zu hohen Risiko behaftet um es in Projekten einzusetzen.
Das Risiko ist umso höher je langfristiger und größer das Projekt ist.
Deswegen würden Sie das Projekt unter den aktuellen Umständen nicht in Ihren Projekten verwenden.

## Unternehmen die von Tracey profitieren könnten

Aus Ihrer Sicht könnten Unternehmen bei denen Traceability gesetzlich vorgeschrieben ist sowie Unternehmen die langfristige Wartungsprojekte betreuen vom Einsatz von Tracey profitieren.

## Annahme: Tracey unterstützt Impact Analysis

Sie stimmen der Annahme zu, dass die Verwendung von Tracey die Impact Analysis positiv beeinflusst.
Entwickler können mithilfe der Tracelinks die Auswirkungen von Änderungen besser einschätzen.

## Annahme: Tracey verbessert Estimation Quality

Sie stimmen der Annahme nicht zu, dass die Verwendung von Tracey zu einer Verbesserung der Estimation Quality führt.
Da die Tracelinks unterschiedliche Granularitäten aufweisen können, kann es die Schätzung sogar negativ beeinflussen.
Nur wenn eine einheitliche Tracelink-Granularität verwendet wird kann potentiell die Estimation Quality positiv beeinflusst werden.

## Annahme: Tracey verbessert die Dokumentation

Sie stimmen der Annahme zu, dass die Verwendung von Tracey die Dokumentation (vor allem die Wartungsdokumentation) verbessert.
Die Zusammenhänge werden besser dokumentiert und werden automatisch aktualisiert auf Basis des aktuellen Stand der Software.
Ein großer Anteil der Dokumentation müsste nicht mehr geschrieben werden weil die Dokumentation von Tracey automatisch generiert wird.

## Annahme: Tracey verbessert den agilen Entwicklungsprozess

Sie stimmen der Annahme nicht zu, dass die Verwendung von Tracey den agilen Entwicklungsprozess verbessert.
Der Wert des Tools geht verloren wenn es nicht großflächig verwendet wird.
In einem Projekt mit mehreren Teams müsste das Management also eine Entscheidung für alle Teams treffen.
Das Team könnte diese Entscheidung über den Entwicklungsprozess also nicht selbst treffen.

## Generelle Anmerkungen

- Tracey ist sehr leichtgewichtig (wenige Regeln, leicht verständlich) und entwicklerfreundlich.
- Wenn es unterschiedliche Teams für die Erstentwicklung und die laufende Wartung gibt, dann hat das Team für die Erstentwicklung den größten Aufwand während das Team für die Wartung die meisten Vorteile genießt.
- Nutzungsbeispiel aus vergangenen Projekten wo Tracey nütlich wäre: Software in mehreren Varianten für einzelne Länder entwickelt. Wenn ein Land wegfällt soll der gesamte länderspezifische Code entfernt werden. Die Tracelinks auf Basis von Codezeilen wären hier sehr nützlich

<!--
Requirements Traceability wird in Projekten verwendet
Requirements Traceability wird nicht aus rechtlichen Gründen verwendet
Requirements Traceability wird verwendet als Planungswerkzeug 
Requirements Traceability wird verwendet für besseres Change Management
Requirements Traceability wird verwendet für besseres Application Lifecycle Management
Requirements Traceability wird verwendet weil es Software Engineering unterstützt

Probleme bei der Umsetzung von Requirements Traceability:
- Wartung der Tracelinks in einem großen Spreadsheet problematisch
- hoher Wartungsaufwand der Tracelinks
- Traceability Matrix in Spreadsheet wächst sehr schnell

Ent-Helvetisierung:
- Software mit spezieller Implementierung für die Schweiz
- Schweiz fällt als Kundengebiet weg
- Entfernen des Schweizer Codes um das Projekt zu vereinfachen

Kulturelle Verbesserung:
- Programmierer werden mehr zu Software Engineers

Generelle Anmerkungen zum Tool
- leichtgewichtiger Traceability Ansatz
- entwicklerfreundlich

Würde das Werkzeug nicht bei sich selbst einsetzen weil
- aktuell steht nur ein Entwickler dahinter -> das projekt steht auf wackligen Beinen

Werkzeug macht in Unternehmen Sinn
- die verpflichtend Traceability bereitstellen müssen
- die Projekte mit einem langen Zeitraum haben -> viel Wartung

Zustimmung das das Tool die Impact Analysis unterstützt

keine Zustimmung das das Tool die Estimation Quality verbessert.
- tracelinks können unterschiedliche Granularität aufweisen. Das kann die Schätzung sogar erschweren
- Nur wenn eine einheitliche Tracelink Granularität verwendet wird kann es potentiell die Schätzqualität verbessern
- Dann könnten Tracelinks gezählt werden

Zustimmung das das Tool die technische Dokumentation (Wartungsdokumentation) verbessert weil
- dadurch viel Dokumentation obsolet wird/automatisch generiert wird
- Die generierte Dokumentation automatisch aktualisiert wird

keine Zustimmung das das Tool den agilen Entwicklungsprozess verbessert
- der Wert des Tools geht verloren wenn es nicht großflächig verwendet wird
- In einem Projekt mit mehreren Teams müsste das Management also eine Entscheidung für alle Teams treffen
- Das Tool müsste vom Management zwanghaft eingeführt werden -> Das Entwicklungsteam könnte diese Entscheidung unter Umständen nicht selbst treffen
- Auch wenn es gegen die agilen Prinzipien ist, ist es für den Entwicklungsprozess sinnvoll

Um alle Tracelinks zu einem Parent Requirement herauszufinden muss jedes einzelne Kindrequirement durchgegangen werden.
- Der State eines Requirements ist nicht abgebildet -> könnte in Zukunft über Connector zu JIRA über JIRA Identifier erledigt werden
- Der State eines Tracelinks ist nicht abgebildet
+ Das Tool ist sprachunabhängig

Wenn zwei unterschiedliche Teams zuständig sind für Erstentwicklung und Wartung, dann hat das Erstentwicklungsteam den Aufwand die Dokumentation zu erzeugen und das Wartungsteam hat den Nutzen. Das Erstentwicklungsteam hat den Nutzen jedoch kaum.

Evaluierung:
- Einfachheit: 1
- Benutzerfreundlichkeit für Entwickler: 1
- Lesbarkeit: 1
- Innovation: 
- Praktikabilität: 1
- Integrabilität: 2 (weil nicht voll ausgebaut, Integration zu anderen Management Tools wichtig)

-->
