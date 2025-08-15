'use client';

import React, { useState } from 'react';
import { PiBone } from 'react-icons/pi';
import { PriceButton } from '@/components/Game';

export const BoneButton = () => {
    const [loading, setLoading] = useState(false);

    const handleDig = async () => {
        setLoading(true);

        try {
            const res = await fetch('/api/actions/dig', { method: 'POST' });
            const data = await res.json();

            if (data.success) {
                alert(`You dug up ${data.bonesGained} bones!`);
            } else {
                alert(data.message || 'Something went wrong.');
            }
        } catch (err) {
            console.error(err);
            alert('Network error.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <PriceButton
            onClick={handleDig}
            icon={<PiBone />}
            text="Dig for bones"
            disabled={loading}
        />
    );
};
