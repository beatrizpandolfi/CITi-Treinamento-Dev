import {Request, Response} from "express";
import prisma from "@database";

// POST -> criando novo calçado
export const createCalcado = async (req: Request, res: Response) => {
    try{
        // Não necessita do id para criar o POST, pois id é parametro default
        const {nome_produto, cor, marca, tamanho, preco, quantidade_em_estoque} = req.body;

        // Validação dos atributos para garantir que os dados totalmente preenchidos
        if (!nome_produto || 
            !cor || 
            !marca || 
            tamanho === undefined || 
            preco === undefined || 
            quantidade_em_estoque === undefined) {

            return res.status(400).json({ 
                message: "Preencha todas as informações obrigatórias." // Mensagem de erro
            });

        }

        // // Salva o novo calçado no banco de dados
        const calcado = await prisma.calcado.create({
            data: {
                nome_produto,
                cor,
                marca,
                tamanho,
                preco,
                quantidade_em_estoque,
            }
        })

        // Retorna mensagem de confirmação da criação do calçado
        return res.status(201).json({ 
            message: "Calçado criado com sucesso.",
        })


    }catch (error){
        // Retorna mensagem de erro ao tentar criar o calçado
        return res.status(500).json({ 
            message: "Erro ao criar calçado.",
            error,
        })
    }
}



// GET -> consulta/ leitura de calçados cadastrados
export const readAllCalcados = async (req: Request, res: Response) => {
    try{
        const calcados = await prisma.calcado.findMany(); // findMany usado para buscar todos os registros cadastrados

        // Condição if para caso não haja nenhum calçado registrado
        if (calcados.length === 0){
            return res.status(404).json({
                message: "Nenhum calçado foi criado ainda."
            })
        }

        // Retorna a variável calçados
        return res.status(200).json(calcados)


    }catch (error){
        // Retorna mensagem de erro ao tentar buscar calçados
        return res.status(500).json({
            message: "Erro ao buscar calçados.",
            error,
        })
    }
}

// extra: GET por id do calçado
export const readCalcadoById = async (req: Request, res: Response) => {
    const {id} = req.params;

    const calcado = await prisma.calcado.findUnique({
        where: {id: Number(id)}
    });

    if (!calcado) {
        return res.status(404).json({
            message: "Calçado não encontrado."
        });
    }

    return res.status(200).json(calcado);
}



// PATCH -> atualizar informações de um calçado
export const updateCalcado = async (req: Request, res: Response) => {
    try{
        // Será preciso  o id do calçado para alterá-lo
        const {id} = req.params;

        // É necessário os atributos do calcado para alterá-los
        const {nome_produto, cor, marca, tamanho, preco, quantidade_em_estoque} = req.body;

        // Busca do calçado atual no banco de dados
        const calcadoAtual = await prisma.calcado.findUnique({
            where: {id: Number(id)}
        })

        // Verifica se o calçado procurado realmente existe
        if (!calcadoAtual){
            return res.status(404).json({
                message: "Calçado não encontrado."
            })
        }

        // Garante que pelo menos um campo foi enviado para atualização
        if (nome_produto === undefined &&
            cor === undefined &&
            marca === undefined &&
            tamanho === undefined &&
            preco === undefined &&
            quantidade_em_estoque === undefined) {
                
                return res.status(400).json({
                    message: "Informe pelo menos um campo para atualizar.",
                });

        }

        // Mantém valores antigos caso novos não sejam enviados (uso do operador ??)
        const dadosAtualizados = { 
            nome_produto: nome_produto ?? calcadoAtual.nome_produto,
            cor: cor ?? calcadoAtual.cor,
            marca: marca ?? calcadoAtual.marca,
            tamanho: tamanho ?? calcadoAtual.tamanho,
            preco: preco ?? calcadoAtual.preco,
            quantidade_em_estoque: quantidade_em_estoque ?? calcadoAtual.quantidade_em_estoque,
        };

        // Verifica se houve alteração real para evitar atualização desnecessária no banco
        const mudou = dadosAtualizados.nome_produto !== calcadoAtual.nome_produto ||
            dadosAtualizados.cor !== calcadoAtual.cor ||
            dadosAtualizados.marca !== calcadoAtual.marca ||
            dadosAtualizados.tamanho !== calcadoAtual.tamanho ||
            dadosAtualizados.preco !== calcadoAtual.preco ||
            dadosAtualizados.quantidade_em_estoque !== calcadoAtual.quantidade_em_estoque;
        
        if (!mudou) {
            return res.status(200).json({
                message: "Nenhuma alteração foi feita.",
            });
        }
                
        // Atualiza o registro no banco de dados
        const calcado = await prisma.calcado.update({
            where: {id: Number(id)},
            data: dadosAtualizados,
        });
        

        // Retorna o calçado atualizado
        return res.status(200).json(calcado);


    }catch (error){
        // Retorna mensagem de erro ao tentar atualizar calçado
        return res.status(500).json ({
            message: "Erro ao tentar atualizar o calçado.",
            error,
        });
    }

}



// DELETE -> remover um calcado do sistema
export const deleteCalcado = async (req: Request, res: Response) => {
    try{
        // Será preciso do id do calçado para deletá-lo 
        const {id} = req.params;

        // Verifica se o calçado a ser deletado realmente existe
        if (!id){
            return res.status(404).json({
                message: "Calçado não encontrado."
            })
        }

        // Remove o registro do banco
        const calcado = await prisma.calcado.delete({
            where: {id: Number(id)}
        })

        return res.status(200).json({
            message: "Calçado deletado com sucesso."
        })


    }catch (error) {
        // Retorna mensagem de erro ao tentar deletar calçado
        return res.status(500).json({
            message: "Erro ao deletar calçado.",
            error,
        })
    }
}