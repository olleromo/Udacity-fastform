(ns fastform.db
  (:use [clojure.java.jdbc :as sql]
        [cheshire.core :refer :all]))

(def db {:classname "org.sqlite.JDBC", :subprotocol "sqlite", :subname "test.db"})

(def user1
  {:fname "Bob"
   :lname "Bobson"
   :password "secret"
   :password2 "secret"
   :email "bob@bobson.com"
   :title "Mr"
   :jobtitle "Clerk"
   :employer "IBM"
   :birthday ""
   :addr1 "Long Street 34"
   :addr2 ""
   :addrcity "Gotham"
   :addrstate "Texas"
   :addrpc "12345"
   :addrcountry "USA"})

(def user2
  {:fname "John"
   :lname "Johnson"
   :password "secret2"
   :password2 "secret2"
   :email "john@johnson.com"
   :title "Mr"
   :jobtitle "Janitor"
   :employer "Smithson & Smithson"
   :birthday ""
   :addr1 "Back Street 21"
   :addr2 ""
   :addrcity "Amersham"
   :addrstate "London"
   :addrpc "SWE45"
   :addrcountry "England"})

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
(def event1
  {:user 1
   :eventname "Json Conf"
   :eventtype "Conference"
   :eventhost "Google"
   :eventstart "2016-2-3T12:39"
   :eventend "2016-5-8T11:00"
   :eventguestlist "me, you, her, him"
   :addr1 "Great Street 2"
   :addr2 ""
   :addrcity "Buffalo"
   :addrstate "NY"
   :addrpc "12349"
   :addrcountry "USA"
   :eventmessage "The best conference ever about Json!"})

(def event2
  {:user 1
   :eventname "Gofer meet"
   :eventtype "Meetup"
   :eventhost "John"
   :eventstart "2016-8-8T10:00"
   :eventend "2016-8-8T11:00"
   :eventguestlist "me, you, her, him"
   :addr1 "Small Street 2"
   :addr2 ""
   :addrcity "Sherman Oaks"
   :addrstate "CA"
   :addrpc "54321"
   :addrcountry "USA"
   :eventmessage "The best meetup ever about Go!"})

(def event3
  {:user 1
   :eventname "Flux meet"
   :eventtype "Meetup"
   :eventhost "Bob"
   :eventstart "2016-9-12T13:00"
   :eventend "2016-9-12T16:00"
   :eventguestlist "me, you, her, him"
   :addr1 "Curvy Street 2"
   :addr2 ""
   :addrcity "Encino"
   :addrstate "CA"
   :addrpc "54324"
   :addrcountry "USA"
   :eventmessage "The best meetup ever about Flux!"})

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

(defn populate []
  (sql/insert! db :user user1)
  (sql/insert! db :user user2)
  (sql/insert! db :event event1)
  (sql/insert! db :event event2)
  (sql/insert! db :event event3))

(defn setup []
  (make-user-table)
  (make-event-table)
  (populate))
