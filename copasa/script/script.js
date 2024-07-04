document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('gerarPDF').addEventListener('click', function() {
        var numeroNotifi = document.getElementById('numero_noty').value.toUpperCase();
        var rua = document.getElementById('rua').value.toUpperCase();
        var responsavel = document.getElementById('responsavel').value;
        var prazoDias = document.getElementById('numero_dias').value;
        var bairro = document.getElementById('bairro').value;
        var n_proximo = document.getElementById('n_proximo').value;
        var foto = document.getElementById('foto').files[0]; // Capturar o arquivo de imagem selecionado

        // Verificar se todos os campos estão preenchidos
        if (!numeroNotifi || !rua || !bairro || !responsavel || !prazoDias || !n_proximo) {
            document.getElementById('error-message').textContent = 'Por favor, preencha todos os campos.';
            return;
        }

        // Limpar mensagem de erro
        document.getElementById('error-message').textContent = '';

        // Nome do arquivo
        var nomeArquivo = 'NOTIFICACAO_COPASA_' + '_NUMERO-CONTROLE_' + numeroNotifi + '.pdf';

        // Criar objeto FileReader para ler o conteúdo da imagem
        var reader = new FileReader();
        reader.onload = function(event) {
            var fotoURL = event.target.result; // URL da imagem selecionada
            var conteudoPDF =
            `
                <div class="pdf" style="display:flex; justify-content: center; align-items: center; flex-direction: column;">

                    <header style="display:flex; justify-content: center; align-items: center; flex-direction: column; margin: 50px 50px;">
                        <img src="img/logoprefeitura.jpeg" alt="Logo Prefeitura" style="width: 100px; height: 100px;">
                        <h2 style="color:black;">NOTIFICAÇÃO COPASA ${numeroNotifi}-2024</h2>
                    </header>

                    <section style="margin: 0 65px;">
                        <p style="text-indent: 3em;">
                            <strong>A SECRETARIA DE OBRAS E SERVIÇOS URBANOS DO MUNICÍPIO DE SÃO JOÃO DA PONTE</strong>, entidade de direito público interno, pertencente ao Estado de Minas Gerais,
                            no CNPJ sob n° 16.928.483/0001-29, sediada na Praça Olímpio Campos, n° 128, Centro, nesta cidade de São João da Ponte, vem perante a Vossa Senhoria
                             promover <strong>NOTIFICAÇÂO PRELIMINAR</strong>, ficando assim a entidade obrigada a recompor a via pública, conforme foto anexa, localizada na ${rua}, próximo 
                             ao imóvel n° ${n_proximo}, ${bairro}, neste município, com o piso existente anteriormente, <strong>no prazo máximo de ${prazoDias} dias</strong> a contar do recebimento.
                        </p>
                        <p>
                            <em>LEI MUNICIPAL n° 2.212/2021 DE JULHO DE 2021</em><br>
                        </p>
                        <p style="text-indent: 3em;">
                            <em>"Torna obrigatória a reconstrução e via pública pela COPASA - Companhia de Saneamento de Minas Gerais, após haver promovido escavação para reparar redes de água ou esgotamento sanitário e/ou colocação
                            de novas instalações e dá outras providencias."</em>
                        </p>
                        <p style="text-indent: 3em;">
                                Saliento que o não cumprimento desta NOTIFICAÇÃO PRELIMINAR no prazo estipulado pela Lei Municipal acarretará MULTA DIÁRIA no valor de 350 UFM (Unidade Fiscal Municipal),
                            o que equivale hoje ao valor de R$ 2.086,00 ( dois mil e oitenta e seis reais), que somente cessará a cobrança até que seja restabelecida a via para seu uso regular. 

                        </p><br><br>
                        <p>São João da Ponte MG ${new Date().toLocaleDateString()}</p>
                            <p style="padding-bottom: 30px;"><strong>Data de vencimento:</strong> ${new Date(new Date().getTime() + (prazoDias * 24 * 60 * 60 * 1000)).toLocaleDateString()}</p>
                    </section>

                    <footer style="display:flex; justify-content: center; align-items: center; flex-direction: column; height: 100%; width: 100%; padding-bottom:250px;">
                        
                        <p>_________________________________</p><br>
                        <p style="text-align:center;"><strong>${responsavel}</strong></p><br><br>

                        <p><strong style="text-align:center;">${responsavel === 'LUCAS RENAN SANTANA BARBOSA' ? 'FISCAL DE POSTURAS' : (responsavel === 'ALISSON GUSMÃO CORDEIRO' ? 'CHEFE DO DEPARTAMENTO DE OBRAS' : 'SECRETÁRIO DE INFRAESTRUTURA')}</strong></p>
                            
                        <p style= "text-align: center; padding-top: 18px;">Assinatura________________________________ Data de recebimento____/____/____</p>

                    </footer>

                    
                    <!-- Adicionar a imagem -->

                    <div class="img" style="display:flex; justify-content: center; align-items: center; flex-direction: column; height: 100%; width: 100%;">
                            <img src="${fotoURL}" alt="Foto" style="width: 600px; max-height: 800px;">
                    </div>
                    
                </div>
                
            `;

            // Gerar o PDF com os dados da notificação e a imagem
            html2pdf().from(conteudoPDF).set({
                filename: nomeArquivo,
                pagebreak: { mode: 'avoid-all' },
                html2canvas: { scale: 2 }, // Aumenta a escala da captura de tela
                jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait', output: 3 } // Ajusta a qualidade do PDF
            }).save();
        };

        // Ler o conteúdo da imagem como URL de dados
        reader.readAsDataURL(foto);
    });
});