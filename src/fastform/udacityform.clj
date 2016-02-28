(ns fastform.udacityform
  (:use [hiccup.core]
        [hiccup.page]
        [hiccup.form]))

(def udacityform
    [:body {}
     [:header {}
      [:span {:class "company-name"} "Cam's Company"]
      [:span {:class "company-page"} "Checkout Page"]]
     [:section {:class "progress-bar"} "Seems like this could be a good place for a progress bar..."][:section {:class "form"}
                                                                                                                 [:h3 {} "Your Name and Demographic Information"]
                                                                                                                 [:label {} "First Name"
                                                                                                                  [:input {:type "text"}]]
                                                                                                                 [:label {} "Last Name"
                                                                                                                  [:input {:type "text"}]]
                                                                                                                 [:label {} "Email Address"
                                                                                                                  [:input {:type "text"}]]
                                                                                                                 [:label {} "Put me on the mailing list?"
                                                                                                                  [:input {:type "checkbox", :class "inline"}]]
                                                                                                                   [:h3 {} "Your Credit Card Information"]
                                                                                                                 [:div {:class "cc-warning"}
                                                                                                                  [:em {} "Note: don't enter any actual credit card info!"]]
                                                                                                                 [:label {} "Credit Card Number"
                                                                                                                  [:input {:type "text"}]]
                                                                                                                 [:label {} "Credit Card Type"
                                                                                                                  [:select {:name "cc"} [:option {} "Visa"]
                                                                                                                   [:option {} "American Express"]
                                                                                                                   [:option {} "Mastercard"]
                                                                                                                   [:option {} "Discover"]]]
                                                                                                                 [:label {} "Expiration Date"
                                                                                                                  [:input {:type "text", :placeholder "MM"}]
                                                                                                                  [:input {:type "text", :placeholder "YY"}]]
                                                                                                                 [:label {} "CVV"
                                                                                                                  [:input {:type "number"}]]
                                                                                                                 [:h3 {} "Your Billing Address"]
                                                                                                                 [:label {} "First Name"
                                                                                                                  [:input {:type "text"}]]
                                                                                                                 [:label {} "Middle Initial"
                                                                                                                  [:input {:type "text"}]]
                                                                                                                 [:label {} "Last Name"
                                                                                                                  [:input {:type "text"}]]                                                                                      [:label {} "Company"                                                                                          [:input {:type "text"}]]
                                                                                                      [:label {} "Address Line 1"
                                                                                                       [:input {:type "text"}]]
                                                                                                                 [:label {} "Address Line 2"
                                                                                                                  [:input {:type "text"}]]
                                                                                                                 [:label {} "City"
                                                                                                                  [:input {:type "text"}]]
                                                                                                                 [:label {} "State/Province"
                                                                                                                  [:input {:type "text"}]]
                                                                                                                 [:label {} "Postal Code"
                                                                                                                  [:input {:type "text"}]]
                                                                                                                 [:label{}"Country" [:input {:type "text"}]]]
     [:section {:class "order-review"}
      [:h3 {} "Your Order"]
      [:table {:class "your-order"}
       [:tr {:class "headings"}
        [:td {:colspan "1", :rowspan "1"} "Product"]
        [:td {:colspan "1", :rowspan "1"} "Quantity"]
        [:td {:colspan "1", :rowspan "1"} "Price"]
        [:td {:colspan "1", :rowspan "1"} "Total"]]
       [:tr {} [:td {:colspan "1", :rowspan "1"} "Game Console 2015"]
        [:td {:colspan "1", :rowspan "1"} "1"]
        [:td {:colspan "1", :rowspan "1"} "$500.00"]
        [:td {:colspan "1", :rowspan "1"} "$500.00"]]
       [:tr {} [:td {:colspan "1", :rowspan "1"} "Platformer Bros 3D"]
        [:td {:colspan "1", :rowspan "1"} "1"]
        [:td {:colspan "1", :rowspan "1"} "$50.00"]
        [:td {:colspan "1", :rowspan "1"} "$50.00"]]
       [:tr {:class "total"} [:td {:colspan "1", :rowspan "1"} "Total"]
        [:td {:colspan "1", :rowspan "1"} "$550.00"]]]
      [:label {:class "check-correct"} "Is your order correct?"
       [:input {:type "checkbox"}]]
      [:input {:type "submit", :id "submit"}]]
     [:script {} "var submit = document.querySelector('#submit');submit.onclick = function (){}" ]])
