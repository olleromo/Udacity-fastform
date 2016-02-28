(ns fastform.form
  (:use [hiccup.core]
        [hiccup.page]
        [hiccup.form]
        [fastform.udacityform]))

(defn show-landing-page [req]
  (slurp "./resources/public/index5.html"))
