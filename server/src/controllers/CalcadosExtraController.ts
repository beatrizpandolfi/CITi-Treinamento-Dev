import {Request, Response} from "express";
import {getCalcadosByTamanho, getCalcadosByMarca, getTotalEstoque} from "../repositorie/CalcadosRepositorie";

// GET -> busca por tamanho
export const readCalcadosByTamanho = async (req: Request, res: Response) => {
    try {
        // O query permite maior flexibilidade para combinar múltiplos critérios de busca (se trata de uma operação de filtro)
        const {tamanho} = req.query;

        // Valida se o tamanho foi informado 
        if (!tamanho) {
            return res.status(400).json({
                message: "Informe o tamanho para busca."
            })
        }

        // Converte o valor para número antes de enviar ao repositorie
        const calcados = await getCalcadosByTamanho(Number(tamanho));

        // Retorna os resultados encontrados
        return res.status(200).json(calcados);


    } catch (error) {
        // Retorna mensagem de erro ao buscar por tamanho
        return res.status(500).json({
            message: "Erro ao buscar calçados por tamanho.",
            error,
        })
    }
}


// GET -> buscar por marca
export const readCalcadosByMarca = async (req: Request, res: Response) => {
    try {
        // Obtem o atributo marca da query
        const {marca} = req.query;

        // Valida se a marca foi informada
        if (!marca) {
            return res.status(400).json({
                message: "Informe a marca para busca."
            })
        }

        // Converte para string e envia para o repositorie
        const calcados = await getCalcadosByMarca(String(marca));

        // Retorna os resultados filtrados
        return res.status(200).json(calcados);


    } catch (error) {
        // Retorna mensagem de erro ao buscar por marca
        return res.status(500).json({
            message: "Erro ao buscar calçados por marca.",
            error,
        })
    }
}


// GET -> total em estoque
export const readTotalEstoque = async (req: Request, res: Response) => {
    try {
        // Chama o repositorie que realiza a soma no banco
        const total = await getTotalEstoque();

        // Retorna o total de pares disponíveis 
        return res.status(200).json({
            total_estoque: total
        })


    } catch (error) {
        // Retorna mensagem de erro ao calcular estoque total
        return res.status(500).json({
            message: "Erro ao calcular estoque.",
            error,
        })
    }
}