import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/prisma';

export async function POST() {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json(
            { success: false, message: 'Unauthorized' },
            { status: 401 },
        );
    }

    try {
        // Random bones gained per dig (1-5)
        const bonesGained = Math.floor(Math.random() * 5) + 1;

        const updatedCurrency = await prisma.currency.update({
            where: { userId: session?.user?.id },
            data: { bones: { increment: bonesGained } },
        });

        return NextResponse.json({
            success: true,
            bonesGained,
            totalBones: updatedCurrency.bones,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: 'Server error' },
            { status: 500 },
        );
    }
}
