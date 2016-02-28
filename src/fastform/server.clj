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
        )
  (:gen-class))

(def db {:classname "org.sqlite.JDBC", :subprotocol "sqlite", :subname "test.db"})

(defn make-user-table []
  (sql/execute! db ["drop table if exists user"])
  (let [user (sql/create-table-ddl :user
                                   [:id :integer
                                    :primary :key
                                    :autoincrement]
                                   [:fname :text]
                                   [:lname :text]
                                   [:password :text]
                                   [:password2 :text]
                                   [:email :text]
                                   [:title :text]
                                   [:jobtitle :text]
                                   [:employer :text]
                                   [:birthday :text]
                                   [:addr1 :text]
                                   [:addr2 :text]
                                   [:addrcity :text]
                                   [:addrstate :text]
                                   [:addrpc :text]
                                   [:addrcountry :text])]
    (sql/execute! db [user])))

(defn save-user [req]
  (let [fp (:form-params req)]
    (sql/insert! db :user
                 (merge (into {} (map (fn [x] [(keyword (first x)) (second x)]) fp))))))

(defn make-event-table []
  (sql/execute! db ["drop table if exists event"])
  (let [event (sql/create-table-ddl :event
                                   [:id :integer
                                    :primary :key
                                    :autoincrement]
                                   [:user :integer]
                                   [:eventname :text]
                                   [:eventtype :text]
                                   [:eventhost :text]
                                   [:eventstart :text]
                                   [:eventend :text]
                                   [:eventguestlist :text]
                                   [:addr1 :text]
                                   [:addr2 :text]
                                   [:addrcity :text]
                                   [:addrstate :text]
                                   [:addrpc :text]
                                   [:addrcountry :text]
                                   [:eventmessage :text])]
    (sql/execute! db [event])))

(defn save-event [req]
  (let [fp (:form-params req)]
    (sql/insert! db :event
                 (merge {:user "Bob"}
                        (into {} (map (fn [x] [(keyword (first x)) (second x)]) fp))))))

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
  (resources "/") ;; static file url prefix /static, in `public` folder
  (not-found "<p>Page not found.</p>")) ;; all other, return 404

(defn -main []
  (run-server (site #'all-routes) {:port 8080 :join? false}))

