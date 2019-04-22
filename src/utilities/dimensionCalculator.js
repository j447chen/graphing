let dimensionCalculator = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    if(windowWidth > 930){
        return {
            height: (windowHeight - (4*16) - (2*10)) * 0.88,
            width: ((windowWidth - (2*16) - (3*10))* 3/4)*0.95,
        };
    }
    else if (windowWidth >= 768 && windowWidth <= 930){
        return {
            height: (windowHeight - (4*16) - (2*10)) * 0.88,
            width: ((windowWidth - (2*16) - (3*10))* 3/4)*0.85,
        };
    }
    return {
        height: (windowHeight - (4*16) - (2*10)) * 0.45 ,
        width: ((windowWidth - (2*16) - (3*10)))* 0.95,
    }
}

export default dimensionCalculator;
