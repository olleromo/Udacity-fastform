(ns fastform.server
  (:use [compojure.route :only [files resources]]
        [compojure.handler :only [site]] ; form, query params decode; cookie; session, etc
        [compojure.core :only [defroutes GET POST DELETE ANY context]]
        [ring.middleware.cookies]
        [ring.util.response]
        ;; [hiccup.core]
        ;; [hiccup.page]
        ;; [hiccup.form]
        [cheshire.core :refer :all]
        org.httpkit.server
        [clojure.java.jdbc :as sql]
        [fastform.db]
        )
  (:gen-class))


(defn landing-page [req]
  (slurp "./resources/public/index5.html"))

(defn organize [req]
  (slurp "./resources/public/organize.html"))

(defn organizer [req]
  (slurp "./resources/public/organizer.html"))

(defn attendee [req]
  (slurp "./resources/public/attendee.html"))

(defn login [req]
  (slurp "./resources/public/login.html"))

(defn verify [req]
  (redirect "/organize"))

(defn get-meetups [req]
  (generate-string (sql/query db "select * from event")))

(defn autocomplete [req]
  (slurp "./resources/public/placeautocomplete.html"))

(defroutes all-routes
  (GET "/" [] landing-page)
  (GET "/organize" [] organize)
  (POST "/organize" req (save-event req))
  (GET "/login" [] login)
  (POST "/login" req (verify req))
  (GET "/organizer" [] organizer)
  (POST "/organizer" req (save-user req))
  (GET "/attendee" [] attendee)
  (GET "/attendee/meetups" req (get-meetups req))
  (GET "/autocomplete" req (autocomplete req))
  (resources "/") ;; static file url prefix /static, in `public` folder
  (not-found "<p>Page not found.</p>")) ;; all other, return 404

(defn -main []
  (run-server (site #'all-routes) {:port 8080 :join? false}))

