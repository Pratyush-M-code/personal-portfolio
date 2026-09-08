console.log('Happy developing ✨')

/*Pixelated borders*/
function pixelateCorner(element, options={}){
    const css_values = getComputedStyle(element);
    const pixelStep = parseFloat(css_values.getPropertyValue("--ps"));
    const stepCount = parseInt(css_values.getPropertyValue("--steps"));

    let x = 0;
    let y = pixelStep*stepCount;
    const polygonPath = [[x,y]];/*basically the first [] defines the total path and each nested [] is a point*/
    let horizontal = true;

    for(let i = 0; i < stepCount * 2; i = i + 1) {
        if(horizontal) {
            x = x + pixelStep
        } else {
           y = y - pixelStep
        }
        polygonPath.push([x,y]);
        horizontal = !horizontal
    }

    const start = (val) => (val === 0 ? "0px":`${val}px`)
    const end = (val) => (val === 0 ? "100%":`calc(100% - ${val}px)`)
    /*top-t + left-l + corner*/
    const tlcorner = [...polygonPath].map(([X,Y])=>`${start(X)} ${start(Y)}`);
    const trcorner = [...polygonPath].reverse().map(([X,Y])=>`${end(X)} ${start(Y)}`);
    const brcorner = [...polygonPath].map(([X,Y])=>`${end(X)} ${end(Y)}`);
    const blcorner = [...polygonPath].reverse().map(([X,Y])=>`${start(X)} ${end(Y)}`);
    const allPoints = [
        ...tlcorner,
        ...trcorner,
        ...brcorner,
        ...blcorner,
    ];

    element.style.clipPath = `polygon(${allPoints.join(', ')})`;

}

document.querySelectorAll('.pixel-corners').forEach((element) => pixelateCorner(element));
