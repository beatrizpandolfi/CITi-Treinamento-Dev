import prisma from "@database"

// Busca por tamanho
export const getCalcadosByTamanho = async (tamanho: number) => {
    return await prisma.calcado.findMany({
        where: {tamanho} // Filtro pelo tamanho
    })
}


// Busca por marca
export const getCalcadosByMarca = async (marca: string) => {
    return await prisma.calcado.findMany({
        where: {
            marca: {
                equals: marca, // Compara o valor da marca com o informado
                mode: "insensitive", // Ignora diferença entre letras maiúsculas e minúsculas
            }
        }
    })
}


// Contagem total de pares por estoque 
export const getTotalEstoque = async () => {
    // Uso do aggregate para somar todos os valores em quantidade_em_estoque
    const resultado = await prisma.calcado.aggregate({
        _sum: {
            quantidade_em_estoque: true // Indica que quero a soma desse campo
        }
    })

    // Retorna o total somado e caso não haja registros, retorna 0 para evitar undefined
    return resultado._sum.quantidade_em_estoque || 0;
}