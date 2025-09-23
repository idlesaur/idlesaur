'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button, Card, Heading } from '@/components/ui';

export interface RenameDinoModalProps {
    open: boolean;
    onClose: () => void;
}

export const RenameDinoModal = ({ open, onClose }: RenameDinoModalProps) => {
    return (
        <div>
            <Modal open={open} onClose={onClose} ariaLabel="Rename Dino">
                <Card>
                    <Heading level={2}>Hello</Heading>
                    <p className="mb-4">This is a modal dialog.</p>
                    <div className="flex justify-end gap-2">
                        <Button onClick={onClose} variant="secondary">
                            Cancel
                        </Button>
                        <Button>Confirm</Button>
                    </div>
                </Card>
            </Modal>
        </div>
    );
};
