function formatCurrency(numberToFormat) {
    numberToFormat = numberToFormat.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    return numberToFormat;
}