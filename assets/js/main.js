function randomSorter() {
    var team = $(".rsorter"),
        kids = team.children(".sortable");

    while (kids.length) {
        team.append(kids.splice(Math.floor(Math.random() * kids.length), 1)[0]);
    }
}

function resizeCarousel() {
    $(".flex-grid-carousel").each(function () {
        var items = $(this).find(".item");
        var heights = items.map(function () {
            var $this = $(this);
            $this.height('auto');

            return $this.height();
        });
        var maxHeight = Math.max.apply(null, heights);

        items.each(function () {
            $(this).height(maxHeight);
        });
    });
}

Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
};

$(document).ready(function () {
    $.getJSON(baseurl + "/assets/data/quotes.json", function (d) {
        var now = new Date();
        var quoteCard = Handlebars.compile($("#quote-card-template").html());
        var quoteBlock = (now.getMonth() < d.length) ? now.getMonth() : now.getMonth() % d.length;
        var compiled = quoteCard({ quotes: d[quoteBlock] });

        $("#quotebook").html(compiled);

        randomSorter();
    });

    resizeCarousel();

    $('[data-toggle="tooltip"]').tooltip();

    $(".js-event").each(function (e) {
        var $this = $(this);
        var now = new Date();
        var date = new Date($this.data("date")).addDays(1);

        if (date.getTime() <= now) {
            $this.hide();
        }
    });

    $(window).resize(function() {
        resizeCarousel();
    });
});
