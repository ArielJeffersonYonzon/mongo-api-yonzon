const validateProduct = (req, res, next) => {
    const { name, price, category, stock } = req.body;
    
const error = [];

if (!name || name.trim().length === 0){
    error.push('Valid name is required')
}

if (!price ||  isNaN(price) || price < 0){
    error.push('Valid price is required')
}

if (!category || category.trim().length === 0){
    error.push('Category is required')
}

if (stock !== undefined && (isNaN(stock) || stock < 0)){
    error.push('Stock must be a non-negative number')
}

if (error.length > 0){
    return res.status(400).json({ error });
}

next();
}

module.exports = validateProduct