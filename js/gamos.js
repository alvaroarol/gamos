/**
 * CREATE A POLYGON FROM A LIST OF POINTS
 * @param {object} context : Drawing context.
 * @param {array} pointsArray : Contains all the point pairs (= array [x,y]), in order, of the polygon. The first point will be also used as the last point.
 * @param {string} fillColour : Interior colour; hex (#xxxxxx) or rgba (rgba(xxx,xxx,xxx,x))
 * @param {string} outlineColour : Outline colour; hex (#xxxxxx) or rgba (rgba(xxx,xxx,xxx,x))
 * @param {number} outlineWidth : Width of the outline; px
 */
function newShape(context, pointsArray, fillColour, outlineColour, outlineWidth){

    if(context && pointsArray){
        context.fillStyle = fillColour;
        context.strokeStyle = outlineColour;
        context.lineWidth = outlineWidth;
        context.beginPath();
        context.moveTo(pointsArray[0][0], pointsArray[0][1]);
        for(var i = 1; i < pointsArray.length; i ++){
            context.lineTo(pointsArray[i][0], pointsArray[i][1]);
        }
        context.lineTo(pointsArray[0][0], pointsArray[0][1]);
        context.fill();
        context.stroke();
    }

}


/**
 * By Ken Fyrstenberg Nilsen
 *
 * drawImageProp(context, image [, x, y, width, height [,offsetX, offsetY]])
 *
 * If image and context are only arguments rectangle will equal canvas
*/
function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {

    if (arguments.length === 2) {
        x = y = 0;
        w = ctx.canvas.width;
        h = ctx.canvas.height;
    }

    // default offset is center
    offsetX = typeof offsetX === "number" ? offsetX : 0.5;
    offsetY = typeof offsetY === "number" ? offsetY : 0.5;

    // keep bounds [0.0, 1.0]
    if (offsetX < 0) offsetX = 0;
    if (offsetY < 0) offsetY = 0;
    if (offsetX > 1) offsetX = 1;
    if (offsetY > 1) offsetY = 1;

    var iw = img.width,
        ih = img.height,
        r = Math.min(w / iw, h / ih),
        nw = iw * r,   // new prop. width
        nh = ih * r,   // new prop. height
        cx, cy, cw, ch, ar = 1;

    // decide which gap to fill
    if (nw < w) ar = w / nw;
    if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
    nw *= ar;
    nh *= ar;

    // calc source rectangle
    cw = iw / (nw / w);
    ch = ih / (nh / h);
    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY;

    // make sure source rectangle is valid
    if (cx < 0) cx = 0;
    if (cy < 0) cy = 0;
    if (cw > iw) cw = iw;
    if (ch > ih) ch = ih;

    // fill image in dest. rectangle
    ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
}


/**
 * MAKE THE GAMOS IMAGE
 * @param {string} photoSource : URL of the photo.
 * @param {array} informationsArray : Contains all the car's info as an associative array.
 */
function createImage(photoSource, informationsArray){

    // CANVAS
    var canvas = document.getElementById("canvas");
    canvas.width = 1920;
    canvas.height = 1080;
    var ctx = canvas.getContext("2d");
    ctx.imageSmoothingQuality = "high";

    // BACKGROUND
    var background = new Image();
    background.src = 'img/gamos-bg.jpg';
    background.onload = function(){

        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        // SHAPES
        // photo corners
        var leftTop = [ [900,70], [935,70], [935,80], [910,80], [910,105], [900,105] ];
        var rightTop = [ [1750,70], [1785,70], [1785,105], [1775,105], [1775,80], [1750,80] ];
        var rightBottom = [ [1750,695], [1785,695], [1785,660], [1775,660], [1775,685], [1750,685] ];
        var leftBottom = [ [900,695], [935,695], [935,685], [910,685], [910,660], [900,660] ];
        newShape(ctx, leftTop, '#FFFFFF', '#000000', 3);
        newShape(ctx, rightTop, '#FFFFFF', '#000000', 3);
        newShape(ctx, rightBottom, '#FFFFFF', '#000000', 3);
        newShape(ctx, leftBottom, '#FFFFFF', '#000000', 3);
        // main bands
        var firstBand = [ [0,80], [860,80], [780,155], [860,230], [0,230] ];
        var secondBand = [ [0,310], [810,310], [730,385], [810,460], [0,460] ];
        var thirdBand = [ [0,540], [760,540], [680,615], [760,690], [0,690] ];
        newShape(ctx, firstBand, 'rgba(0, 0, 0, 0.5)', 'transparent', 0);
        newShape(ctx, secondBand, 'rgba(0, 0, 0, 0.5)', 'transparent', 0);
        newShape(ctx, thirdBand, 'rgba(0, 0, 0, 0.5)', 'transparent', 0);
        // colour box
        ctx.fillStyle = mainColour;
        ctx.fillRect(55, 390, 50, 40);
        //  colour box lines
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(55, 390, 50, 3);
        ctx.fillRect(102, 390, 3, 40);
        ctx.fillRect(55, 427, 50, 3);
        ctx.fillRect(55, 390, 3, 40);
        // bottom info separator
        ctx.fillStyle = mainColour;
        ctx.fillRect(0, 745, 1920, 11);
        // bottom info box
        var gradient = ctx.createLinearGradient(0, 0, 0, 1080);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.5)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 756, 1920, 1080);
        // info lines
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.fillRect(216, 835, 695, 5);
        ctx.fillRect(216, 905, 695, 5);
        ctx.fillRect(216, 975, 695, 5);
        ctx.fillRect(216, 1045, 695, 5);
        ctx.fillRect(1011, 840, 695, 5);
        ctx.fillRect(1011, 910, 695, 5);
        ctx.fillRect(1011, 980, 695, 5);
        ctx.fillRect(1011, 1050, 695, 5);


        // IMAGES
        // photo
        photo = new Image();
        photo.src = photoSource;
        photo.onload = function(){
            drawImageProp(ctx, photo, 911, 81, 863, 603);
            //ctx.drawImage(photo, 911, 81, 863, 603);
        }
        // brand
        brand = new Image();
        brand.src = 'img/brands/' + brandCountries[informationsArray.brand][2];
        brand.onload = function(){
            ctx.drawImage(brand, 25, 100, 110, 110);
        }
        // calendar
        calendar = new Image();
        calendar.src = 'img/icons/calendar.png';
        calendar.onload = function(){
            ctx.drawImage(calendar, 55, 325, 50, 50);
        }
        // flag
        flag = new Image();
        flag.src = 'img/flags/list/' + brandCountries[informationsArray.brand][1];
        flag.onload = function(){
            ctx.drawImage(flag, 55, 555, 50, 50);
        }
        // silhouette
        silhouette = new Image();
        silhouette.src = 'img/icons/silhouette.png';
        silhouette.onload = function(){
            ctx.drawImage(silhouette, 55, 615, 50, 50);
        }
        // icons
        engine = new Image();
        engine.src = 'img/icons/engine.png';
        engine.onload = function(){
            ctx.drawImage(engine, 216, 785, 45, 45);
        }
        piston = new Image();
        piston.src = 'img/icons/piston.png';
        piston.onload = function(){
            ctx.drawImage(piston, 216, 855, 45, 45);
        }
        horse = new Image();
        horse.src = 'img/icons/horse.png';
        horse.onload = function(){
            ctx.drawImage(horse, 216, 925, 45, 45);
        }
        tachometer = new Image();
        tachometer.src = 'img/icons/tachometer.png';
        tachometer.onload = function(){
            ctx.drawImage(tachometer, 216, 995, 45, 45);
        }
        weight = new Image();
        weight.src = 'img/icons/weight.png';
        weight.onload = function(){
            ctx.drawImage(weight, 1011, 790, 45, 45);
        }
        chassis = new Image();
        chassis.src = 'img/icons/chassis.png';
        chassis.onload = function(){
            ctx.drawImage(chassis, 1011, 860, 45, 45);
        }
        gears = new Image();
        gears.src = 'img/icons/gears.png';
        gears.onload = function(){
            ctx.drawImage(gears, 1011, 930, 45, 45);
        }
        flags = new Image();
        flags.src = 'img/icons/flags.png';
        flags.onload = function(){
            ctx.drawImage(flags, 1011, 1000, 45, 45);
        }


        // TEXT
        // first banner
        ctx.fillStyle = 'white';
        ctx.textAlign = 'start';
        ctx.font = '50px BebasNeue';
        ctx.fillText(informationsArray.brand, 175, 140);
        ctx.fillText(informationsArray.model, 175, 200);
        // second banner
        ctx.fillText(informationsArray.year, 175, 370);
        ctx.fillText(informationsArray.colour, 175, 430);
        // third banner
        ctx.fillText(brandCountries[informationsArray.brand][0], 175, 600);
        ctx.fillText(informationsArray.name, 175, 660);
        // info box
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.textAlign = 'start';
        ctx.font = '40px BebasNeue';
        ctx.fillText('MOTEUR', 290, 825);
        ctx.fillText('CYLINDRÉE', 290, 895);
        ctx.fillText('PUISSANCE', 290, 965);
        ctx.fillText('COUPLE', 290, 1035);
        ctx.fillText('POIDS', 1085, 825);
        ctx.fillText('TRANSMISSION', 1085, 895);
        ctx.fillText('BOÎTE DE VITESSES', 1085, 965);
        ctx.fillText('0 - 100 KM/H', 1085, 1035);
        ctx.fillStyle = 'white';
        ctx.textAlign = 'end';
        ctx.fillText(informationsArray.engine, 910, 825);
        ctx.fillText(informationsArray.capacity, 910, 895);
        ctx.fillText(informationsArray.power, 910, 965);
        ctx.fillText(informationsArray.torque, 910, 1035);
        ctx.fillText(informationsArray.weight, 1710, 825);
        ctx.fillText(informationsArray.transmission, 1710, 895);
        ctx.fillText(informationsArray.gearbox, 1710, 965);
        ctx.fillText(informationsArray.acceleration, 1710, 1035);

        setTimeout(function(){
            canvas.toBlob(function(blob) {
                var newImg = document.createElement("img"),
                url = URL.createObjectURL(blob);
                document.getElementById("gamos").src = url;
            });
        }, 1000)

    }

}
