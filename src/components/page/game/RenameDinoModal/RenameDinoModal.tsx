'use client';

import React, { useActionState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import { Form, FormField } from '@/components/ui';
import { Modal } from '@/components/ui/Modal';
import { Button, Card, Heading } from '@/components/ui';
import { useDinosaursStore } from '@/state/providers';
import { RenameDinoState } from '@/app/lib/types';

export interface RenameDinoInputs extends FieldValues {
    newName: string;
}

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
        formState: { isLoading },
    } = useForm<RenameDinoInputs>();

    if (!dinosaur) {
        return null;
    }

    return (
        <div>
            <Modal open={open} onClose={onClose} ariaLabel="Rename Dino">
                <Card>
                    <Heading level={2}>Rename Dinosaur</Heading>
                    <p className="mb-4">
                        What do you wish to rename {dinosaur.name} into?
                    </p>
                    <Form
                        handleSubmit={handleSubmit}
                        formAction={formAction}
                        formState={formState}
                        setError={setError}
                        className="w-full"
                    >
                        <FormField
                            register={register}
                            label="newName"
                            autoFocus
                            disabled={isLoading || isPending}
                            aria-label="New dinosaur name"
                        />
                        <div className="flex justify-end gap-2">
                            <Button onClick={onClose} variant="secondary">
                                Cancel
                            </Button>
                            <Button type="submit">Confirm</Button>
                        </div>
                    </Form>
                </Card>
            </Modal>
        </div>
    );
};
