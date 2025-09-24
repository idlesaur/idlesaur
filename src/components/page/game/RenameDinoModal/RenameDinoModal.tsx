'use client';

import React, { useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Form, FormField } from '@/components/ui';
import { Modal } from '@/components/ui/Modal';
import { Button, Card, Heading } from '@/components/ui';
import { useDinosaursStore, useToastsStore } from '@/state/providers';
import { RenameDinoState } from '@/app/lib/types';
import { RenameDinosaur, RenameDinosaurType } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';

export interface RenameDinoModalProps {
    open: boolean;
    onClose: () => void;
    renameDinosaurAction: (
        previousState: RenameDinoState | null,
        formData: FormData,
    ) => Promise<RenameDinoState>;
}

export const RenameDinoModal = ({
    renameDinosaurAction,
    open,
    onClose,
}: RenameDinoModalProps) => {
    const addSuccessToast = useToastsStore((state) => state.addSuccessToast);
    const addErrorToast = useToastsStore((state) => state.addErrorToast);

    const dinosaur = useDinosaursStore((state) => state.selectedDinosaur);
    const [formState, formAction, isPending] = useActionState(
        renameDinosaurAction,
        {
            success: false,
        },
    );

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isLoading },
    } = useForm<RenameDinosaurType>({
        defaultValues: {
            name: dinosaur?.name,
            id: dinosaur?.id,
        },
        resolver: zodResolver(RenameDinosaur),
    });

    useEffect(() => {
        if (isPending) {
            return;
        }

        if (formState?.success === false && formState?.message) {
            onClose();
            addErrorToast('Rename Dino Failed', formState.message);
        }
        if (formState?.success === true && formState?.message) {
            onClose();
            addSuccessToast('Rename Dino Success', formState.message);
        }
    }, [
        formState?.success,
        formState?.message,
        addErrorToast,
        addSuccessToast,
        isPending,
        onClose,
    ]);

    if (!dinosaur) {
        return null;
    }

    return (
        <Modal open={open} onClose={onClose} ariaLabel="Rename Dino">
            <Card>
                <Heading level={2}>Rename Dinosaur</Heading>

                <Form
                    handleSubmit={handleSubmit}
                    formAction={formAction}
                    formState={formState}
                    setError={setError}
                    className="flex flex-1 flex-col gap-4"
                >
                    <FormField
                        register={register}
                        type="hidden"
                        label="id"
                        value={dinosaur.id}
                    />
                    <FormField
                        className="w-full"
                        register={register}
                        label="name"
                        error={errors.name?.message}
                        autoFocus
                        disabled={isLoading || isPending}
                        aria-label="New dinosaur name"
                    />
                    <div className="mt-4 flex justify-end gap-2">
                        <Button onClick={onClose} variant="secondary">
                            Cancel
                        </Button>
                        <Button type="submit">Confirm</Button>
                    </div>
                </Form>
            </Card>
        </Modal>
    );
};
