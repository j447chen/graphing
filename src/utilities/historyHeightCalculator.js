let historyHeightCalculator = (initalHeight, currentHeight) => {
    let heightWindow = window.innerHeight;

    if (initalHeight < heightWindow){
        return currentHeight * (initalHeight/heightWindow);
    }
    return currentHeight * (heightWindow/initalHeight);

}
export default historyHeightCalculator;
