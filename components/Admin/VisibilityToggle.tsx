"use client";

import React, { useState } from "react";
import { toggleTestimonialVisibility } from "@/app/actions/testimonial";
import toast from "react-hot-toast";

interface VisibilityToggleProps {
    id: string;
    initialStatus: boolean;
}

export default function VisibilityToggle({ id, initialStatus }: VisibilityToggleProps) {
    const [isVisible, setIsVisible] = useState(initialStatus);
    const [isPending, setIsPending] = useState(false);

    const handleToggle = async () => {
        setIsPending(true);
        try {
            const { success } = await toggleTestimonialVisibility(id, !isVisible);
            if (success) {
                setIsVisible(!isVisible);
                toast.success(`Testimonial ${!isVisible ? 'enabled' : 'disabled'} for website`);
            } else {
                toast.error("Failed to update visibility");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-0.5">Show on Website</p>
                <p className="text-sm font-semibold text-slate-900">{isVisible ? 'Visible' : 'Hidden'}</p>
            </div>
            <button
                disabled={isPending}
                onClick={handleToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none disabled:opacity-50 ${
                    isVisible ? 'bg-[#081ff0]' : 'bg-slate-200'
                }`}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isVisible ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
            </button>
        </div>
    );
}
