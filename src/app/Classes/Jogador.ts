export class Jogador{
    id: number;
    nome: string;
    email: string;
    telefone: string;
    data_nascimento: string;
    lateralidade: string;
    foto: string;

    constuctor(id: number, nome: string, email: string, telefone: string, data_nascimento: string, lateralidade: string, foto: string){
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.data_nascimento = data_nascimento;
        this.lateralidade = lateralidade;
        this.foto = foto;
    }
}