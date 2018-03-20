export function numberToReal(value) {
    return 'R$ ' + value.toFixed(2).toString().replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}