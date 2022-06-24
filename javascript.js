class Produto{
        constructor(){
            this.id = 1;
            this.editId = null;
            this.arrayProdutos = []
        }
        cadastrar(){
            let produto = this.lerDados()

            if(this.validaCampos(produto)){
                if(this.editId == null){
                    this.adicionar(produto)}
                else{
                    this.atualizar(this.editId, produto);
                }
            }
            this.listaTabela();
            this.cancelar();
        }

        listaTabela() {
            let tbody = document.getElementById('tbody');
            tbody.innerText = '';

            for(let i = 0; i < this.arrayProdutos.length; i++){
                let tr = tbody.insertRow();

                let td_id = tr.insertCell();
                let td_produto = tr.insertCell();
                let td_categoria = tr.insertCell();
                let td_valor = tr.insertCell();
                let td_acoes = tr.insertCell();
                let imgEdit = document.createElement('img');
                let imgDelet = document.createElement('img');
                
                td_id.innerText = this.arrayProdutos[i].id;
                td_produto.innerText = this.arrayProdutos[i].nomeProduto;
                td_categoria.innerText = this.arrayProdutos[i].categoria;
                td_valor.innerText = this.arrayProdutos[i].valor;
                td_acoes.appendChild(imgEdit)
                td_acoes.appendChild(imgDelet)

                td_id.classList.add('center');
                td_acoes.classList.add('center');
                imgEdit.src = 'https://cdn-icons-png.flaticon.com/512/84/84380.png'
                imgEdit.setAttribute("onclick", "produto.editar("+ JSON.stringify(this.arrayProdutos[i])+")");

                imgDelet.src = 'https://cdn-icons-png.flaticon.com/512/54/54324.png'
                imgDelet.setAttribute("onclick", "produto.deletar("+ this.arrayProdutos[i].id +")");
                
            }   
        }

        adicionar(produto){
            this.arrayProdutos.push(produto);
            this.id++;
        }
        lerDados(){
            let produto = {}

            produto.id = this.id;
            produto.nomeProduto = document.getElementById('produto').value;
            produto.valor = document.getElementById('valor').value;
            produto.categoria = document.getElementById('categoria').value;

            return produto;
        }

        validaCampos(produto){
            let msg = '';

            if(produto.nomeProduto == '') {
                msg += 'informe o nome do produto \n';
            }
            if(produto.valor == '') {
                msg += 'informe o valor do produto \n';
            }
            if(msg != '') {
                alert(msg);
                return false
            }
            return true;
        }
        
        cancelar() {
            document.getElementById('produto').value = '';
            document.getElementById('valor').value = '';

            document.getElementById('btn1').innerText = 'Salvar';
            this.editId = null;
        
        }
        deletar(id) {
            let tbody = document.getElementById('tbody');

            for(let i = 0; i < this.arrayProdutos.length; i++) {
                if(this.arrayProdutos[i].id == id) {
                    this.arrayProdutos.splice(i, 1);
                    tbody.deleteRow(i);
                }
            }

        }
        editar(dados) {
            this.editId = dados.id;

            document.getElementById('produto').value = dados.nomeProduto;
            document.getElementById('valor').value = dados.valor;
            document.getElementById('categoria').value = dados.categoria;
            document.getElementById('btn1').innerText = 'Atualizar';
        }

        atualizar(id, produto) {
            for(let i = 0; i < this.arrayProdutos.length; i++){
                if(this.arrayProdutos[i].id == id) {
                    this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                    this.arrayProdutos[i].valor = produto.valor;
                    this.arrayProdutos[i].categoria = produto.categoria;
                }
            }
        }
}

var produto = new Produto();