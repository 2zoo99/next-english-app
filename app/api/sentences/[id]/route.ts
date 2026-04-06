import { prisma } from "@/lib/prisma";

export async function GET(
    _: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const sentence = await prisma.sentence.findUnique({
        where: { id: Number(id) },
        include: {
            sentenceWords: {
                orderBy: { order: 'asc' },
                include: { word: true }
            }
        }
    })
    return Response.json(sentence);

}

export async function DELETE(
    _: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    await prisma.sentence.delete({
        where: { id: Number(id) }
    })
    return new Response(null, { status: 204 });
}
