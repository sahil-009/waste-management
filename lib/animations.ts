import { MotiProps } from 'moti';

export const fadeIn: MotiProps = {
    from: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { type: 'timing', duration: 600 },
};

export const fadeInUp: MotiProps = {
    from: { opacity: 0, translateY: 20 },
    animate: { opacity: 1, translateY: 0 },
    transition: { type: 'timing', duration: 600 },
};

export const fadeInDown: MotiProps = {
    from: { opacity: 0, translateY: -20 },
    animate: { opacity: 1, translateY: 0 },
    transition: { type: 'timing', duration: 600 },
};

export const scaleIn: MotiProps = {
    from: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { type: 'spring', damping: 15 },
};

export const slideInLeft: MotiProps = {
    from: { opacity: 0, translateX: -50 },
    animate: { opacity: 1, translateX: 0 },
    transition: { type: 'timing', duration: 500 },
};

export const slideInRight: MotiProps = {
    from: { opacity: 0, translateX: 50 },
    animate: { opacity: 1, translateX: 0 },
    transition: { type: 'timing', duration: 500 },
};

export const staggerDelay = (index: number, baseDelay = 150) => ({
    delay: index * baseDelay,
});

export const buttonPress = {
    scale: 0.95,
    transition: { type: 'timing', duration: 100 },
};

export const cardStagger = (index: number): MotiProps => ({
    from: { opacity: 0, translateY: 15 },
    animate: { opacity: 1, translateY: 0 },
    transition: {
        delay: index * 150,
        type: 'timing',
        duration: 400,
    },
});
