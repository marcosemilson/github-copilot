function validarCartaoCredito(numeroCartao) {
    if (!luhnAlgorithm(numeroCartao)) {
        return 'Número de cartão inválido';
    }

    const bandeiras = {
        visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
        mastercard: /^5[1-5][0-9]{14}$/,
        amex: /^3[47][0-9]{13}$/,
        discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
        diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
        jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
        unionpay: /^(62[0-9]{14,17})$/,
        hipercard: /^(606282\d{10}(\d{3})?)$/,
        aura: /^50[0-9]{14,17}$/,
        enroute: /^(2014|2149)\d{11}$/,
        voyager: /^8699[0-9]{11}$/
    };

    for (const [bandeira, regex] of Object.entries(bandeiras)) {
        if (regex.test(numeroCartao)) {
            return bandeira;
        }
    }

    return 'Bandeira desconhecida';
}

function luhnAlgorithm(numeroCartao) {
    let soma = 0;
    let alternar = false;
    for (let i = numeroCartao.length - 1; i >= 0; i--) {
        let n = parseInt(numeroCartao.charAt(i), 10);
        if (alternar) {
            n *= 2;
            if (n > 9) {
                n -= 9;
            }
        }
        soma += n;
        alternar = !alternar;
    }
    return (soma % 10) === 0;
}

// Exemplo de uso com input do usuário
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Digite o número do cartão de crédito: ', numeroCartao => {
    // Remove espaços em branco do número do cartão
    numeroCartao = numeroCartao.replace(/\s+/g, '');
    
    const bandeira = validarCartaoCredito(numeroCartao);
    console.log(`A bandeira do cartão é: ${bandeira}`);
    readline.close();
});