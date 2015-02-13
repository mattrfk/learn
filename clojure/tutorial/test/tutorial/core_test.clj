(ns tutorial.core-test
  (:require [clojure.test :refer :all]
            [tutorial.core :refer :all]))

(deftest a-test
  (testing "FIXME, I fail."

(deftest pairs-of-values
   (let [args ["--server" "localhost"
               "--port" "8080"
               "--environment" "production"]]
      (is (= {:server "localhost"
              :port "8080"
              :environment "production"}
              (parse-args args)))))   (is (= 0 1))))
