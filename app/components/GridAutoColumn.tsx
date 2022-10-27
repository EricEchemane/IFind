import { SimpleGrid } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

type Props = {
    widthBasis: number;
    children: JSX.Element[];
    spacing?: number | "xs" | "sm" | "md" | "lg" | "xl";
};

export default function GridAutoColumn({ widthBasis, children, spacing }: Props) {
    const { width } = useViewportSize();
    return (
        <SimpleGrid
            spacing={spacing}
            cols={Math.floor(width / widthBasis)}>
            {children}
        </SimpleGrid>
    );
}