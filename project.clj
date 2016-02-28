(defproject fastform "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :min-lein-version "2.0.0"
  :dependencies [[org.clojure/clojure "1.7.0"]
                 [compojure "1.4.0"]
                 [ring/ring-defaults "0.1.5"]
                 [http-kit "2.1.18"]
                 [hiccup "1.0.5"]
                 ;;[clj-tagsoup/clj-tagsoup "0.3.0"]
                 [clj-tagsoup/clj-tagsoup "0.3.0" :exclusions [org.clojure/clojure]]
                 [org.clojure/java.jdbc "0.3.7"]
                 [cheshire "5.5.0"]
                 [org.xerial/sqlite-jdbc "3.7.2"]]
  :plugins [[lein-ring "0.9.7"]]
  ;;:ring {:handler fastform.handler/app}
  :main fastform.server
  :profiles
  {:dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                        [ring/ring-mock "0.3.0"]]}})
