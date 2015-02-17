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

; examples from https://skillsmatter.com/skillscasts/2894-clojurex-unpanel-2894#showModal?modal-signup-complete
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

(wobbled-sin)
(stop)

(definst dubstep [freq 100 wobble-freq 2]
  (let [sweep (lin-exp (lf-saw wobble-freq) -1 1 40 5000)
        son (mix (saw (* freq [0.99 1 1.01])))]
    (lpf son sweep)))

(dubstep)
(dubstep 150 4)
(dubstep 250 2)
(dubstep 100 3)
(dubstep 80 1)
(stop)

; controlling the frequency after it has started
(ctl dubstep :wobble-freq 6)
(ctl dubstep :wobble-freq 3)
(ctl dubstep :wobble-freq 2)

; MIDI notes
; 60 = middle c
; 12 semitones = 72 = 1 octave
(dubstep (midi->hz 60))

; clojure keywords
(dubstep (midi->hz (note :c4)))

; more concise: define a vector of notes
(def notes (vec (map (comp midi->hz note) [:c3 :g3 :e3])))
(dubstep (notes 0))
(dubstep (notes 1))
(dubstep (notes 2))


; =========================
; Rythms
; =========================

; shape white noise with a percussive envelope
(definst hat [volume 1.0]
  (let [src (white-noise)
        env (env-gen (perc 0.0001 0.3) :action FREE)]
    (* volume 3 src env)))]

(hat)

; TODO: lin-env? 
(definst kick [volume 1.0]
  (let [body-freq (* 220 (env-gen (lin 0.01 0 0.3 1) :action NO-ACTION))
        body (sin-osc body-freq)

        pop-freq (+ 220 (* 200 (env-gen (lin 0.01 0 0.1 1) :action NO-ACTION)))
        pop (sin-osc pop-freq)

        env (env-gen (perc 0.001 0.25) :action FREE)
      ]
    (* 4 env (+ body pop))))

; schedule beats to happen in the future

(at (+ 1000 (now)) (hat))

(let
  [time (now)]
  (at (+    0 time) (hat) )
  (at (+  400 time) (hat) )
  (at (+  600 time) (hat) )
  (at (+  800 time) (hat) )
  (at (+ 1000 time) (hat) )
  )


(stop)
(loop-beats (now))
(defn loop-beats [time]
  [time (now)]
  (at (+    0 time) (hat) )
  (at (+  400 time) (kick) )
  (at (+  600 time) (hat) )
  (at (+  800 time) (hat) )
  (at (+  900 time) (kick) )
  (at (+  1100 time) (hat) )
  (at (+  1200 time) (hat) )
  (apply-at (+ 0 time) loop-beats (+ 1400 time) []))
