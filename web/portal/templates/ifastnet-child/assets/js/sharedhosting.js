var sharedHosting = (function() {

    var sharedHosting = function(options) {
        //console.log(options);
    };
    sharedHosting.prototype = {
        loadToggleAction		: function(_selector) {
            var yearly_prices = this.getYearlyPrices();
            var monthly_prices = this.getMonthlyPrices();

            $('.togglebtn.freeDomain').on('click', function() {
                if($(this).hasClass('btn-active')) {
                    $(this).removeClass('btn-active');
                    $(this).find('i').removeClass('glyphicon-check').addClass('glyphicon-unchecked');
                    if($('.togglebtn.yearlyPrice').hasClass('btn-active')) {
                        $('.YearlyWithFreeDomains').hide();
                        $('.withFreeDomains').hide();
                        $('.withoutFreeDomains').hide();
                        $('.YearlyWithoutFreeDomains').show();
                        $('.yearlywithoutfreedomainsLi').show();

                        $('.superpremium').attr('href', yearly_prices.super_premium_nofreedomain);
                        $('.ultimatepremium').attr('href', yearly_prices.ultimate_premium_nofreedomain);
                    } else {
                        $('.YearlyWithFreeDomains').hide();
                        $('.YearlyWithoutFreeDomains').hide();
                        $('.withFreeDomains').hide();
                        $('.withoutFreeDomains').show();

                        $('.superpremium').attr('href', monthly_prices.super_premium_nofreedomain);
                        $('.ultimatepremium').attr('href', monthly_prices.ultimate_premium_nofreedomain);
                    }
                } else {
                    $(this).addClass('btn-active');
                    $(this).find('i').removeClass('glyphicon-unchecked').addClass('glyphicon-check');
                    if($('.togglebtn.yearlyPrice').hasClass('btn-active')) {
                        $('.withoutFreeDomains').hide();
                        $('.YearlyWithoutFreeDomains').hide();
                        $('.withFreeDomains').hide();
                        $('.YearlyWithFreeDomains').show();

                        $('.superpremium').attr('href', yearly_prices.super_premium_freedomain);
                        $('.ultimatepremium').attr('href', yearly_prices.ultimate_premium_freedomain);
                    } else {
                        $('.withoutFreeDomains').hide();
                        $('.YearlyWithFreeDomains').hide();
                        $('.YearlyWithoutFreeDomains').hide();
                        $('.withFreeDomains').show();

                        $('.superpremium').attr('href', monthly_prices.super_premium_freedomain);
                        $('.ultimatepremium').attr('href', monthly_prices.ultimate_premium_freedomain);
                    }
                }
            });

            $('.togglebtn.yearlyPrice').on('click', function() {
                if($(this).hasClass('btn-active')) {
                    $(this).removeClass('btn-active');
                    $(this).find('i').removeClass('glyphicon-check').addClass('glyphicon-unchecked');
                    if($('.togglebtn.freeDomain').hasClass('btn-active')) {
                        $('.withoutFreeDomains').hide();
                        $('.YearlyWithoutFreeDomains').hide();
                        $('.YearlyWithFreeDomains').hide();
                        $('.withFreeDomains').show();

                        $('.superpremium').attr('href', monthly_prices.super_premium_freedomain);
                        $('.ultimatepremium').attr('href', monthly_prices.ultimate_premium_freedomain);
                    } else {
                        $('.withFreeDomains').hide();
                        $('.YearlyWithoutFreeDomains').hide();
                        $('.YearlyWithFreeDomains').hide();
                        $('.withoutFreeDomains').show();

                        $('.superpremium').attr('href', monthly_prices.super_premium_nofreedomain);
                        $('.ultimatepremium').attr('href', monthly_prices.ultimate_premium_nofreedomain);
                    }
                } else {
                    $(this).addClass('btn-active');
                    $(this).find('i').removeClass('glyphicon-unchecked').addClass('glyphicon-check');
                    if($('.togglebtn.freeDomain').hasClass('btn-active')) {
                        $('.YearlyWithoutFreeDomains').hide();
                        $('.withoutFreeDomains').hide();
                        $('.withFreeDomains').hide();
                        $('.YearlyWithFreeDomains').show();

                        $('.superpremium').attr('href', yearly_prices.super_premium_freedomain);
                        $('.ultimatepremium').attr('href', yearly_prices.ultimate_premium_freedomain);
                    } else {
                        $('.YearlyWithFreeDomains').hide();
                        $('.withoutFreeDomains').hide();
                        $('.withFreeDomains').hide();
                        $('.YearlyWithoutFreeDomains').show();
                        $('.yearlywithoutfreedomainsLi').show();

                        $('.superpremium').attr('href', yearly_prices.super_premium_nofreedomain);
                        $('.ultimatepremium').attr('href', yearly_prices.ultimate_premium_nofreedomain);
                    }
                }
            });
        },

        getYearlyPrices     : function(_selector) {
            var yearly_prices = {
                'super_premium_freedomain'          : '/portal/cart.php?a=add&pid=3',
                'super_premium_nofreedomain'        : '/portal/cart.php?a=add&pid=87',
                'ultimate_premium_freedomain'       : '/portal/cart.php?a=add&pid=4',
                'ultimate_premium_nofreedomain'     : '/portal/cart.php?a=add&pid=88&billingcycle=annually'
            }
            return yearly_prices;
        },
        getMonthlyPrices    : function(_selector) {
            var monthly_prices = {
                'super_premium_freedomain'          : '/portal/cart.php?a=add&pid=1',
                'super_premium_nofreedomain'        : '/portal/cart.php?a=add&pid=86',
                'ultimate_premium_freedomain'       : '/portal/cart.php?a=add&pid=6',
                'ultimate_premium_nofreedomain'     : '/portal/cart.php?a=add&pid=88&billingcycle=monthly'
            }
            return monthly_prices;
        }
    };
    return sharedHosting;
})();

$(document).ready(function(){
    var sharedHostingObj = new sharedHosting;
    sharedHostingObj.loadToggleAction();
});