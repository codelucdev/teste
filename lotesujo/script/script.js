
        document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('gerarPDF').addEventListener('click', function() {
                var numeroLote = document.getElementById('numero_lote').value.toUpperCase();
                var endereco = document.getElementById('endereco').value.toUpperCase();
                var bairro = document.getElementById('bairro').value.toUpperCase();
                var proprietario = document.getElementById('proprietario').value.toUpperCase();
                var prazoDias = document.getElementById('numero_dias').value;
                var foto = document.getElementById('foto').files[0]; // Capturar o arquivo de imagem selecionado
                

                // Verificar se todos os campos estão preenchidos
                if (!numeroLote || !endereco || !bairro || !proprietario || !prazoDias) {
                    document.getElementById('error-message').textContent = 'Por favor, preencha todos os campos.';
                    return;
                }

                // Limpar mensagem de erro
                document.getElementById('error-message').textContent = '';

                // Criar objeto FileReader para ler o conteúdo da imagem
                var reader = new FileReader();
                reader.onload = function(event) {
                    var fotoURL = event.target.result; // URL da imagem selecionada
                    var conteudoPDF = `
                        <div class="pdf" style="display:flex; justify-content: center; align-itens: center; flex-direction: column;">
                            <header style="display:flex; justify-content: center; align-items: center; flex-direction: column; margin: 50px 50px;">
                                <img src="img/logoprefeitura.jpeg" alt="Logo Prefeitura" style="width: 100px; height: 100px;">
                                <h2  style="color:black;">NOTIFICAÇÃO DE LOTE SUJO ${numeroLote}-2024</h2>
                            </header>

                            <section style="margin: 0 65px;">
                                <p>Considerando o teor da Lei Municipal n°2.126/19 (Código de Posturas), a Prefeitura Municipal de São João da Ponte MG NOTIFICA <strong>${proprietario}</strong>,
                                    titular de um lote na <strong>${endereco}, ${bairro}</strong>, nos seguintes termos:
                                </p>
                                <p>
                                    Art. 13. - Os terrenos situados na área urbana e de expansão urbana deste Município deverão ser mantidos limpos,
                                    capinados e isentos de quaisquer materiais nocivos a saúde da vizinhança e da coletividade.
                                </p>
                                <p>
                                    §1° - A capinação do terreno deverá ser realizada por, pelo menos,
                                    03 (três) vezes por ano e toda vez que a vegetação atingir mais de 50 cm (cinquenta centímetros) de altura.
                                </p>
                                <p>
                                    Art. 17 – É Proibido depositar ou descarregar qualquer espécie de lixo, folhagem de jardins ou resíduos industriais, em terrenos localizados
                                    nos núcleos urbanos ou na área em expansão urbana, mesmo que os referidos terrenos não estejam devidamente fechados.
                                </p>
                                <p>
                                    Sendo assim, <strong>${proprietario}</strong> fica <strong>CIENTE a efetuar a limpeza do lote acima citado no prazo máximo de ${prazoDias}
                                    dias a contar do recebimento deste, caso não cumpra com a notificação, o imóvel esta passivo de MULTA.</strong>
                                </p>
                                <p>
                                    Entretanto, fica o notificado ciente que caso reitere a infração verificada ou pratique outras condutas proibidas, poderá ser agravada a penalidade,
                                    inclusive com a aplicação de multa e outras sanções descritas no artigo 180 da Lei Municipal n° 2.126/19.
                                </p>
                            </section>

                            <footer style="display:flex; justify-content: center; align-items: center; flex-direction: column; heigh: 100%; width: 100%; padding-bottom: 250px;" >
                                <p>São João da Ponte MG ${new Date().toLocaleDateString()}</p>
                                <p><strong>Data de vencimento:</strong> ${new Date(new Date().getTime() + (prazoDias * 24 * 60 * 60 * 1000)).toLocaleDateString()}</p>
                                <p>_________________________________</p>
                                <p>Lucas Renan Santana Barbosa</p>
                                <p>Fiscal de Posturas</p>
                                <p>Assinatura________________________________ Data de recebimento____/____/____</p>
                                <!-- Adicionar a imagem -->
                                
                            </footer>
                            <div class="img" style="display:flex; justify-content: center; align-items: center; flex-direction: column; heigh: 100%; width: 100%;backgroud-color:green;">
                                    <img src="${fotoURL}" alt="Foto" style="width: 600px; max-height: 800px;">
                            </div>
                            
                        </div>
                        
                    `;

                    // Gerar o PDF com os dados da notificação e a imagem
                    html2pdf().from(conteudoPDF).set({
                        filename: 'notificacao_lote_sujo.pdf',
                        pagebreak: { mode: 'avoid-all' },
                        html2canvas: { scale: 2 }, // Aumenta a escala da captura de tela
                        jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait', output: 3 } // Ajusta a qualidade do PDF
                    }).save();
                };

                // Ler o conteúdo da imagem como URL de dados
                reader.readAsDataURL(foto);
            });
        });
       