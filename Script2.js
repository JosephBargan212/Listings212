(function () {

    var jquery;
    var siteurl = 'https://raw.githubusercontent.com/JosephBargan212/Listings212/main/test123?token=GHSAT0AAAAAACD2Q4WQX27BKBT4TVAYS6VOZEHRIFA'

    var mrkt_stat = document.getElementById("mrkt_stat");

    if (mrkt_stat !== null) {
        return false;
    }

    if (!window.jqueryRma) {
        var script = document.createElement("script");
        script.id = "mrkt_stat";
        script.src = "https://code.jquery.com/jquery-3.6.0.min.js";

        document.getElementByTagName("head")[0].appendChild(script);
        script.onload = jqLoaded;
    }

    else {
        jquery = window.jQueryRma;
        query();
    }

    function jqLoaded() {
        jQuery = $.noConflict(true);
        window.jQueryRma = jQuery;
        query();
    }

    //Querying the CSV file
    function query() {
        var eq = 0;

        jquery(document).ready(function (){

            var head = jQuery("head");

            /*
            if (head.find(".widget-style").length === 0) {

                head.append(

                    '< link href = ""' +
                    css_url +
                    '"rel="stylesheet" type = "text/css" class="widget-style">'
                )

            }
            */

            jQuery(".widget_test")

                .each(function() {

                    eq++;

                    jQuery(this)[0].id = "wid-" + eq;

                    jQuery.ajax({

                        url: "https://raw.githubusercontent.com/JosephBargan212/Listings212/main/Clean_A_Output_2305.csv",

                        sucess: function (response) {

                            if (!response.error) {

                                let res_data = response.split("\r\n");

                                city_data = find_city_data("City of Toronto");

                                jQuery("#wid-" + eq).html(BuildWidget(city_data));
                            }
                            else {
                                jQuery("#wid-" + eq).html(
                                    '<div class = "error">' + resoponse.error_message + "</div>"
                                )
                            };
                        }

                    });
                })
        }
    }

    function find_city_data(city){

        var data_len = res_data.length;

        for (var i = 0; i < data_len; i++) {

            x = res_data[i].split(",");

            if (x[0] === city) {
                return x;
            }
        }

    };


    function BuildWidget(city_data) {

        var city = city_data[0];
        var num_sales = city_data[1];
        var avg_price = city_data[2];
        var mdn_price = city_data[3];
        var avg_splp = city_data[9]
        var avg_dom = city_data[10];
        
        


        var html;

        html = '<div class = "container">';

        html += '<h2 class = "widgettitle"> Real Estate Market Statistics </h2>';

        html += '<p class="widgetsubtitle"> A Monthly Report on the latest sales figures and market trends. </p>';

        html += '<div class="market_info" id = "market_info">';

        html += '<div class = "col-sm-12 col-md-6">';

        html += '<div class = "stat_box_title">';
        
        html += '<div class = "stat_title">';

        html += '<span class = "stat_city_name">';

        html += city + "</span>";

        html += "&nbsp; Avg. Sale Price";

        html += "</div> </div>"

        html += '<div class = "stat_box">'

        html += '<div class = "stat_content">'

        html += '<div style="-webkit-box-pack: center;justify-content: center;display: flex;">'

        html += '<h1 class = "stat_averageprice">'

        html += avg_price;

        html += '</h1> </div> </div>';

        html += '<div class="stat_caption"><h5><span class="stat_arrow"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><polygon points="0 0 24 0 24 24 0 24"></polygon><rect fill="#000000" opacity="0.3" x="11" y="5" width="2" height="14" rx="1"></rect><path d="M6.70710678,18.7071068 C6.31658249,19.0976311 5.68341751,19.0976311 5.29289322,18.7071068 C4.90236893,18.3165825 4.90236893,17.6834175 5.29289322,17.2928932 L11.2928932,11.2928932 C11.6714722,10.9143143 12.2810586,10.9010687 12.6757246,11.2628459 L18.6757246,16.7628459 C19.0828436,17.1360383 19.1103465,17.7686056 18.7371541,18.1757246 C18.3639617,18.5828436 17.7313944,18.6103465 17.3242754,18.2371541 L12.0300757,13.3841378 L6.70710678,18.7071068 Z" fill="#000000" fill-rule="nonzero" transform="translate(12.000003, 14.999999) scale(1, -1) translate(-12.000003, -14.999999) "></path></g></svg></span>  <span class="stat_avgchange"></span> #Todo</h5></div>';

        html += '</div> </div>';

        html += '<div class="col-sm-12 col-md-6">';

        html += '<div class="stat_box_title">';

        html += '<div class = "stat_title">';

        html += '<span class = "stat_city_name">';

        html += city + "</span>";

        html += "Monthly Market Report";

        html += '</div> </div>';

        html += '<div class = "stat_box">';

        html += '<div class = "stat_container">';

        html += '<h4 style="color: #889499">Number of Sales</h4>';
        
        html += '<h4 class="stat_numsales">';

        html += num_sales;

        html += '</h4></div>'

        html += '<div class="stat_container" style="background-color: #e4e4e4">';

        html += '<h4 style="color: #889499">Avg Days On Market</h4>'

        html += '<h4 class = "stat_AvgDOM">'

        html += avg_dom;

        html += '</h4></div>'

        html += '<div class="stat_container">'

        html += '<h4 style="color: #889499">Avg SPLP</h4>'

        html += '<h4 class="snp_SPLP">'

        html += avg_splp;

        html += '</h4></div>'

        html += '</div> </div> </div> </div>'

    }
})

