exports.predictFuturePrices = (historyData) => {
    // Sort data by date
    historyData.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Prepare data for regression
    // X = days since first data point, Y = price
    const timestamps = historyData.map(d => new Date(d.date).getTime());
    const prices = historyData.map(d => d.price);

    if (prices.length < 2) {
        return []; // Not enough data for regression
    }

    const minTime = timestamps[0];
    const x = timestamps.map(t => (t - minTime) / (1000 * 60 * 60 * 24)); // Convert to days
    const y = prices;

    // Linear Regression (Least Squares)
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((acc, curr, i) => acc + curr * y[i], 0);
    const sumXX = x.reduce((acc, curr) => acc + curr * curr, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    // Predict next 7 days
    const lastDay = x[x.length - 1];
    const predictions = [];

    for (let i = 1; i <= 7; i++) {
        const nextDay = lastDay + i;
        const predictedPrice = slope * nextDay + intercept;

        const predictionDate = new Date(minTime + nextDay * (1000 * 60 * 60 * 24));

        predictions.push({
            date: predictionDate,
            price: Math.round(predictedPrice * 100) / 100 // Round to 2 decimal places
        });
    }

    return predictions;
};
