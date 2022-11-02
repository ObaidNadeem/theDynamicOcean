// let gradientColors = [
//     { r: 13, g: 246, b: 255 }, //arctic Blue #0DF6FF
//     { r: 164, g: 240, b: 244 }, //lightMint #A4F0F4
//     { r: 123, g: 202, b: 214 }, //lightTeal #7BCAD6
//     { r: 69, g: 169, b: 255 } //Blue #45A9FF
// ]

let intensity = .03

let gradientColors = [
    "#6092EF",
    "#A4F0F4",              
    "#0DF6FF",
    "#45A9FF",
    "#6092EF",
    "#0DF6FF",

]

let maxRadius = 140;
let minRadius = 70;

let wrapper = document.getElementById("wrapper")
let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")

svg.setAttribute("width", "100%")
svg.setAttribute("height", "100%")
svg.setAttribute("id", "container")

let defs = document.createElementNS("http://www.w3.org/2000/svg", "defs")
// filters

//Blur Filter
let blur = document.createElementNS("http://www.w3.org/2000/svg", "filter")
blur.setAttribute("id", "blur")

let GBlur = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur")
GBlur.setAttribute("stdDeviation", "0")
// GBlur.setAttribute("stdDeviation", "0")
// GBlur.setAttribute("stdDeviation", `${gsap.getProperty("body", "width") * intensity }`)

blur.appendChild(GBlur)
defs.appendChild(blur)

//Blur Filter
let mainBlur = document.createElementNS("http://www.w3.org/2000/svg", "filter")
mainBlur.setAttribute("id", "mainBlur")

let mainGBlur = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur")
// mainGBlur.setAttribute("stdDeviation", "15")
mainGBlur.setAttribute("stdDeviation", "0")

mainBlur.appendChild(mainGBlur)
defs.appendChild(mainBlur)


// Gooey Filter
let gooey = document.createElementNS("http://www.w3.org/2000/svg", "filter")
gooey.setAttribute("id", "gooey")

let gooeyBlur = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur")
gooeyBlur.setAttribute("in", "SourceGraphic")
gooeyBlur.setAttribute("stdDeviation", `${gsap.getProperty("body","width") * .1}`)

gooeyBlur.setAttribute("color-interpolation-filters", "sRGB")
gooeyBlur.setAttribute("result", "gooeyBlur")

let gooeyColorMatrix = document.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix")
gooeyColorMatrix.setAttribute("in", "gooeyBlur")
gooeyColorMatrix.setAttribute("mode", "matrix")
gooeyColorMatrix.setAttribute("values", "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 100 -35")
gooeyColorMatrix.setAttribute("result", "goo")

let gooeyColorMatrix2 = document.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix")
gooeyColorMatrix2.setAttribute("in", "goo")
gooeyColorMatrix2.setAttribute("type", "saturate")
gooeyColorMatrix2.setAttribute("values", "1")
gooeyColorMatrix2.setAttribute("result", "saturated")

let gooeyComposite = document.createElementNS("http://www.w3.org/2000/svg", "feComposite")
gooeyComposite.setAttribute("in", "SourceGraphic")
gooeyComposite.setAttribute("in2", "saturated")
gooeyComposite.setAttribute("operator", "atop")

gooey.appendChild(gooeyBlur)
gooey.appendChild(gooeyColorMatrix)
gooey.appendChild(gooeyColorMatrix2)
gooey.appendChild(gooeyComposite)

defs.appendChild(gooey)

svg.appendChild(defs)

// Gradient Circles
let circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle')

circle1.setAttribute('cx', '0vw');
circle1.setAttribute('cy', '110vh');
circle1.setAttribute('r', '30vw');
circle1.setAttribute('fill', '#6092EF');
circle1.setAttribute('id', 'circle1');
circle1.setAttribute('class', 'circle');


let circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle')

circle2.setAttribute('cx', '100vw');
circle2.setAttribute('cy', '90vh');
circle2.setAttribute('r', '20vw');
circle2.setAttribute('fill', '#45A9FF');
circle2.setAttribute('id', 'circle2');

let circle3 = document.createElementNS('http://www.w3.org/2000/svg', 'circle')

circle3.setAttribute('cx', '0vw');
circle3.setAttribute('cy', '90vh');
circle3.setAttribute('r', '20vw');
circle3.setAttribute('fill', '#7BCAD6');
circle3.setAttribute('id', 'circle3');

let circle4 = document.createElementNS('http://www.w3.org/2000/svg', 'circle')

circle4.setAttribute('cx', '120vw');
circle4.setAttribute('cy', '80vh');
circle4.setAttribute('r', '20vw');
circle4.setAttribute('fill', '#6092EF');
circle4.setAttribute('id', 'circle4');

console.log(document.innerWidth)

gsap.to([circle1,circle4], {
    keyframes: {
        y: [0, 100, 0],
        x: [0, -750, 0, 750, 0],
    },
    repeat: -1,
    repeatRefresh: true,
    // onRepeat: generateRandom(),
    duration: 3,
    repeatDelay: 0,
    delay: gsap.utils.random()

})

let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');

// g.appendChild(circle2)
// g.appendChild(circle3)
// g.appendChild(circle4)

function subtle(b) {
    if (window.innerWidth > 768) {
        a = b.getBoundingClientRect();
        c = (a.left + a.width / 2);
        d = (a.top + a.height / 1.5);
        // let wavePos = gsap.getProperty(b, "y")
        // console.log(wavePos)
        
        b.addEventListener("mousemove", (event) => {
            console.log("in")
            gsap.to(b, .25, {
                x: () => (event.pageX - c) ,
                y: () => -(event.pageY - d) 
            });

        })

        b.addEventListener("mouseout", (event) => {
            console.log("out")
            gsap.to(b, .25, {
                x: () => 0,
                y: () => 0
            });
        })
    }
}

let x,X,y

function generateRandom(circle,i){

    y = gsap.utils.random(0,200)
    x = gsap.utils.random(0, 200)
    X = gsap.utils.random(-200, 0)

    gsap.to(circle, {
        keyframes: {
            y: [0, gsap.utils.random(0,200), 0],
            x: [0, gsap.utils.random(-100, 100), 0, gsap.utils.random(-100, 100), 0],
        },
        repeat: -1,
        repeatRefresh: true,
        // onRepeat: generateRandom(),
        duration: 10,
        repeatDelay: 0,
        delay: .5 * i

    })

}

generateRandom()

for (let i = 0; i < 6; i++) {

    let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')

    circle.setAttribute('cx', `${-15 + (i * 30)}vw`);
    circle.setAttribute('cy', '70vh');
    circle.setAttribute('r', '20vw');
    // circle.setAttribute('fill', i < 3 ? `${gradientColors[0]}` : `${gradientColors[3]}`);
    // circle.setAttribute('fill', i < 3 ? `${gradientColors[i]}` : `${gradientColors[3]}`);
    circle.setAttribute('fill', `${gradientColors[i]}` );
    circle.setAttribute('id', `circle${i}`);
    circle.setAttribute('class', "circle");

    g.appendChild(circle)
    generateRandom(circle,i)
   

    circle.addEventListener("mouseover", function() {
        subtle(this)
    })
}

g.appendChild(circle1)
g.appendChild(circle4)

g.setAttribute("filter", "url(#gooey)")

let mainG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
mainG.setAttribute("filter", "url(#mainBlur)")

mainG.appendChild(g)

svg.appendChild(mainG)

wrapper.appendChild(svg);

window.addEventListener("mousemove", function(){
    console.log(event.clientY)

    let cir = document.getElementsByClassName("circle")
    // let b = cir.getBoundingClientRect()
    console.log(cir)
    
})


