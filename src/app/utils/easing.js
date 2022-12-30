import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
gsap.registerPlugin(CustomEase);

export const eases = {
    power2InOut: 'Power2.easeinOut',
    power2Out: 'Power2.easeOut',
    power4Out: 'Power4.easeOut',
    circOut: 'circ.easeOut',
    expoOut: 'expo.easeOut',
};
