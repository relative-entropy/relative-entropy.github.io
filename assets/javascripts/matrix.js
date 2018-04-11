var c = document.getElementById("matrix");
var ctx = c.getContext("2d");

// Set height and width of the canvas
c.height = c.offsetHeight;
c.width = c.offsetWidth;

// the characters
var gurmukhi = "੧੨੩੪੫੬੭੮੯੦ੳਅਰਤਯਪਸਦਗਹਜਕਲਙੜਚਵਬਨਮੲਥਫਸ਼ਧਘਝਖਲ਼ੜ੍ਹਛਭਣ"
var sanskrit = "१२३४५६७८९अरतयपसदगहजकलङषचवबनमआथय़फशधघझखळक्षछभणऒ"
var kanji = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑呂";
var katakana = "゠クタハムヰアケチヒモヲィコッャンイツヤウゥサフュヵテユヶェショワエトヘヨォスラヱオナリカセニホル・ヌレーキソネロヽノマヮミ"
var hex = "abcdefABCDEF01234567890"
// converting the strings into an array of single characters
var characters = (kanji + katakana + gurmukhi + hex).split("");
var font_size = 12;
var columns = c.width/font_size; // number of columns for the rain

// an array of drops - one per column
var drops = [];
// x below is the x coordinate
// 1 = y-coordinate of the drop (same for every drop initially)
for (var x = 0; x < columns; x++)
    drops[x] = 1;

// Get the colour based on the current time i.e. rgb(hh, mm, ss)
// Transparency used to show trail
function getColour() {
    return "rgba(" + moment().format('HH') + ","
                + moment().format('mm') + ","
                + moment().format('ss')  + ", 0.05)";
}

function draw() {
    ctx.fillStyle = getColour();
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#0F0"; // Green text
    ctx.font = font_size + "px arial";

    // Looping drops
    for (var i = 0; i < drops.length; i++) {
        // Generate a random character to print
        var text = characters[Math.floor(Math.random() * characters.length)];
        // x = i * font_size, y = value of drops[i] * font_size
        ctx.fillText(text, i * font_size, drops[i] * font_size);

        // Send the drop back to the top randomly after it has crossed the screen
        // Randomness added to the reset to make the drops scattered on the Y axis
        if (drops[i] * font_size > c.height && Math.random() > 0.975)
            drops[i] = 0;

        drops[i]++; // Incrementing Y coordinate
    }
}
setInterval(draw, 66);
