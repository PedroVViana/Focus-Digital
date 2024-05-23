document.addEventListener('DOMContentLoaded', function() {
    const telefoneInput = document.getElementById('Telefone');

    telefoneInput.addEventListener('input', function() {
        let cleanedValue = telefoneInput.value.replace(/\D/g, '');
        // Limita o número máximo de caracteres para 15
        if (cleanedValue.length > 15) {
            cleanedValue = cleanedValue.substring(0, 15);
        }
        telefoneInput.value = cleanedValue;
    });
});

function showDropdownValue1(anything) {
    document.querySelector('.textBox').value = anything;
}

// Função para exibir o valor no segundo dropdown
function showDropdownValue2(anything) {
    document.querySelector('.textBox2').value = anything;
}

// Adiciona um event listener ao documento para fechar o dropdown 1 ao clicar fora dele
document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.dropdown');
    if (!dropdown.contains(event.target)) {
        dropdown.classList.remove('active');
    }
});

// Adiciona um event listener ao documento para fechar o dropdown 2 ao clicar fora dele
document.addEventListener('click', function(event) {
    const dropdown2 = document.querySelector('.dropdown2');
    if (!dropdown2.contains(event.target)) {
        dropdown2.classList.remove('active2');
    }
});

// Adiciona o evento de clique para alternar a classe 'active' do dropdown 1
let dropdown = document.querySelector('.dropdown');
dropdown.onclick = function() {
    dropdown.classList.toggle('active');
}

// Adiciona o evento de clique para alternar a classe 'active2' do dropdown 2
let dropdown2 = document.querySelector('.dropdown2');
dropdown2.onclick = function() {
    dropdown2.classList.toggle('active2');
}