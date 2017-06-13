// for animateCss() from Animate.css
$.fn.extend({
    animateCss: function(animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

var quotes = [{
    "author": "Muhammad Ali",
    "text": "I hated every minute of training, but I said, Don't quit. Suffer now and live the rest of your life as a champion."
}, {
    "author": "Francis of Assisi",
    "text": "Start by doing what's necessary; then do what's possible; and suddenly you are doing the impossible."
}, {
    "author": "Steve Jobs",
    "text": "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it."
}, {
    "author": "Milton Berle",
    "text": "If opportunity doesn't knock, build a door."
}, {
    "author": "H. Jackson Brown, Jr.",
    "text": "The best preparation for tomorrow is doing your best today."
}, {
    "author": "Helen Keller",
    "text": "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart."
}, {
    "author": "Jimmy Dean",
    "text": "I can't change the direction of the wind, but I can adjust my sails to always reach my destination."
}, {
    "author": "Francis of Assisi",
    "text": "Start by doing what's necessary; then do what's possible; and suddenly you are doing the impossible."
}, {
    "author": "Vince Lombardi",
    "text": "Perfection is not attainable, but if we chase perfection we can catch excellence."
}, {
    "author": "Maya Angelou",
    "text": "Try to be a rainbow in someone's cloud."
}, {
    "author": "Audrey Hepburn",
    "text": "Nothing is impossible, the word itself says 'I'm possible'!"
}, {
    "author": "Steve Jobs",
    "text": "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it."
}, {
    "author": "William Shakespeare",
    "text": "We know what we are, but know not what we may be."
}, {
    "author": "Aristotle Onassis",
    "text": "It is during our darkest moments that we must focus to see the light."
}, {
    "author": "Rabindranath Tagore",
    "text": "Let your life lightly dance on the edges of Time like dew on the tip of a leaf."
}, {
    "author": "Milton Berle",
    "text": "If opportunity doesn't knock, build a door."
}, {
    "author": "Norman Vincent Peale",
    "text": "Change your thoughts and you change your world."
}, {
    "author": "Swami Sivananda",
    "text": "Put your heart, mind, and soul into even your smallest acts. This is the secret of success."
}, {
    "author": "John F. Kennedy",
    "text": "As we express our gratitude, we must never forget that the highest appreciation is not to utter words, but to live by them."
}, {
    "author": "Audrey Hepburn",
    "text": "I believe in pink. I believe that laughing is the best calorie burner. I believe in kissing, kissing a lot. I believe in being strong when everything seems to be going wrong. I believe that happy girls are the prettiest girls. I believe that tomorrow is another day and I believe in miracles."
}, {
    "author": "Buddha",
    "text": "Health is the greatest gift, contentment the greatest wealth, faithfulness the best relationship."
}, {
    "author": "Aesop",
    "text": "No act of kindness, no matter how small, is ever wasted."
}, {
    "author": "Theodore Roosevelt",
    "text": "Believe you can and you're halfway there."
}, {
    "author": "Maya Angelou",
    "text": "My mission in life is not merely to survive, but to thrive; and to do so with some passion, some compassion, some humor, and some style."
}, {
    "author": "Joseph Campbell",
    "text": "We must let go of the life we have planned, so as to accept the one that is waiting for us."
}, {
    "author": "A. P. J. Abdul Kalam",
    "text": "Let us sacrifice our today so that our children can have a better tomorrow."
}, {
    "author": "Paul Bryant",
    "text": "If you believe in yourself and have dedication and pride - and never quit, you'll be a winner. The price of victory is high but so are the rewards."
}, {
    "author": "Kevyn Aucoin",
    "text": "Today I choose life. Every morning when I wake up I can choose joy, happiness, negativity, pain... To feel the freedom that comes from being able to continue to make mistakes and choices - today I choose to feel life, not to deny my humanity but embrace it."
}, {
    "author": "Rabindranath Tagore",
    "text": "Clouds come floating into my life, no longer to carry rain or usher storm, but to add color to my sunset sky."
}, {
    "author": "Robert Browning",
    "text": "Ah, but a man's reach should exceed his grasp, Or what's a heaven for?"
}, {
    "author": "Joseph Campbell",
    "text": "A hero is someone who has given his or her life to something bigger than oneself."
}, {
    "author": "Edith Wharton",
    "text": "There are two ways of spreading light: to be the candle or the mirror that reflects it."
}, {
    "author": "Ronald Reagan",
    "text": "We can't help everyone, but everyone can help someone."
}, {
    "author": "Carl Sagan",
    "text": "Somewhere, something incredible is waiting to be known."
}, {
    "author": "Robert Frost",
    "text": "The best way out is always through."
}, {
    "author": "Alexander the Great",
    "text": "There is nothing impossible to him who will try."
}, {
    "author": "Vince Lombardi",
    "text": "The measure of who we are is what we do with what we have."
}, {
    "author": "Warren Buffett",
    "text": "Someone is sitting in the shade today because someone planted a tree a long time ago."
}, {
    "author": "Bruce Lee",
    "text": "If you always put limit on everything you do, physical or anything else. It will spread into your work and into your life. There are no limits. There are only plateaus, and you must not stay there, you must go beyond them."
}, {
    "author": "Malala Yousafzai",
    "text": "Let us remember: One book, one pen, one child, and one teacher can change the world."
}, {
    "author": "Wilma Rudolph",
    "text": "When the sun is shining I can do anything; no mountain is too high, no trouble too difficult to overcome."
}];

chooseQuote();

function generateQuote() {
    var el = $('#generateQuote');
    el.blur(); // fix the focus style
    el.attr('disabled', true);

    $('#quoteDiv').velocity('transition.slideUpOut');

    setTimeout(function() {
        $('#generateQuote').attr('disabled', false);
        $('#quoteDiv').velocity('transition.slideUpIn');
        chooseQuote();
    }, 1000);
}

function bounceButton() {
    $('#generateQuote').animateCss('bounceIn');
}

function chooseQuote() {
    var index = Math.floor((Math.random() * quotes.length));
    var quote = quotes[index];
    $('#quote').html('<i class="fa fa-quote-left" aria-hidden="true"></i>' + quote.text + '<i class="fa fa-quote-right" aria-hidden="true"></i>');
    $('#author').html('- ' + quote.author + ' -');

    // update href for the twitter link
    var twitterHref = 'https://twitter.com/intent/tweet?hashtags=inspiration&text=\"' + quote.text + '\"' + ' ' + quote.author;
    $('#twitter').attr('href', twitterHref);
}