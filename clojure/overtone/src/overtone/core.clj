(ns overtone.core)

; connect to an internal SuperCollider synth server (scsynth)
(use 'overtone.live)

; the inst macro takes a synthesizer definition form
; this is compiled into a SuperCollider synthdef
; which is then loaded into the synthesis server 
; a function is returned which triggers the synth (called foo)
(definst foo[] (saw 220))

(foo) ; this returns an id that can be used to modify or kill
(kill foo)

; ugen
