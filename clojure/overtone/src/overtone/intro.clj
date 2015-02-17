(ns overtone.core)

; connect to an internal SuperCollider synth server (scsynth)
(use 'overtone.live)

; define an instrument (inst)
; the inst macro takes a synthesizer definition form
; this is compiled into a SuperCollider synthdef
; which is then loaded into the synthesis server 
; a function is returned which triggers the synth (called foo)
(definst foo[] (saw 220))

(foo) ; this returns an id that can be used to modify or kill
(kill foo)

; the saw function ugen - unit-generator

; insts can take arguments
; a running synth outputs a wave of floats between -1 and 1
; multiply by 0.3 lowers the amplitude - reducing the volume
(definst baz [freq 440] (* 0.3 (saw freq)))

(baz) ; default is 440
(baz 220)
(baz 660)
(kill baz) ; stop all running synths with name baz

(stop) ; stop all running synths - any name

(definst quux [freq 440] (* 0.3 (saw freq)))
(quux)
(ctl quux :freq 550) ; change parameters to a running synth on the fly

; ugens can take either argument values or input symbols
(definst trem [freq 440 depth 10 rate 6 length 3]
  (* 0.3
     ; line: output a value from start to end over a length of time
     ; used to make trem end after length seconds
     ; ar suffux (default) audio rate - rate of audio card
     ; kr suffix - control rate (1/60 the speed of ar)
     (line:kr 0 1 length FREE)
     (saw (+ freq (* depth (sin-osc:kr rate))))))
(trem)

(definst trem2 [freq 440 depth 10 rate 6 length 3]
  (* 0.3
     (saw (+ freq (* depth (sin-osc:kr rate))))))
(trem2)
(stop)

;=======================================
(definst basic-sine [freq 440]
  (sin-osc freq))

(basic-sine)

; binary states
(definst basic-square [freq 440]
  (square freq))

; adding sounds together
(definst multiple-sines [freq 440]
  ( + 
      (sin-osc freq)
      (sin-osc ( * 0.5 freq))
      (sin-osc ( * 2 freq))))

(multiple-sines)
(stop)


; mix together with the mix function
(definst detuned-saws [freq 440]
  ; mix creates an instance for each item in the input vector
  (mix (saw (* freq [0.99 1 1.01]))))

(detuned-saws)
(detuned-saws 100)
(stop)

; use one oscillator as the input to another.
; control the frequency of a sine wave with another sine wave
; this creates a vibrato effect.
(definst wobbled-sin [pitch-freq 440 wobble-freq 5 wobble-depth 5]
  (let [wobbler (* wobble-depth (sin-osc wobble-freq))
        freq (+ pitch-freq wobbler)]
    (sin-osc freq)))
