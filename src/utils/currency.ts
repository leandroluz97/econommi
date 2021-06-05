

export default function currency(amount:number) {
    const convertedCurrency = new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(amount)
    return convertedCurrency

    
}