let historyHeightCalculator = (initalHeight, currentHeight) => {
    let heightWindow = window.innerHeight;

    if (window.innerWidth <= 760){
        if (initalHeight < heightWindow){
            return 0.85 * (currentHeight * (initalHeight/heightWindow));
        }
        return 0.85 * (currentHeight * (heightWindow/initalHeight));
    }

    if (initalHeight < heightWindow){
        return currentHeight * (initalHeight/heightWindow);
    }
    return currentHeight * (heightWindow/initalHeight);

}
export default historyHeightCalculator;
