"use client";
import dynamic from 'next/dynamic';

export const PillarGraphic = dynamic(() => import('@/shared/ui/PillarGraphic'), { ssr: false });
export const MobilePillarToggle = dynamic(() => import('@/shared/ui/MobilePillarToggle'), { ssr: false });
export const DisconnectedGraphic = dynamic(() => import('@/shared/ui/DisconnectedGraphic'), { ssr: false });
