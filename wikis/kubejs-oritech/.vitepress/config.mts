import { defineConfig } from "../../../main/defineAlmostWiki"

export default defineConfig({
    srcDir: "./docs",
    title: "KubeJS Oritech",
    base: "/kubejs-oritech/",
    themeConfig: {
        sidebar: [
            {
                text: "Introduction",
                items: [{ text: "Getting Started", link: "/" }],
            },
            {
                text: "Recipes",
                items: [
                    { text: "Basics", link: "recipe/basics" },
                    {
                        text: "Generators",
                        items: [
                            { text: "Bio Generator", link: "recipe/generator/bio_generator" },
                            { text: "Fuel Generator", link: "recipe/generator/fuel_generator" },
                            { text: "Lava Generator", link: "recipe/generator/lava_generator" },
                            { text: "Nuclear Reactor", link: "recipe/generator/nuclear_reactor" },
                        ],
                    },
                    {
                        text: "Machines",
                        items: [
                            { text: "Assembler", link: "recipe/machine/assembler" },
                            { text: "Atomic Forge", link: "recipe/machine/atomic_forge" },
                            { text: "Bedrock Extractor", link: "recipe/machine/bedrock_extractor" },
                            { text: "Centrifuge", link: "recipe/machine/centrifuge" },
                            { text: "Enderic Laser", link: "recipe/machine/enderic_laser" },
                            { text: "Fluid Centrifuge", link: "recipe/machine/fluid_centrifuge" },
                            { text: "Foundry", link: "recipe/machine/foundry" },
                            { text: "Fragment Forge", link: "recipe/machine/fragment_forge" },
                            { text: "Industrial Chiller", link: "recipe/machine/industrial_chiller" },
                            { text: "Particle Accelerator", link: "recipe/machine/particle_accelerator" },
                            { text: "Pulverizer", link: "recipe/machine/pulverizer" },
                            { text: "Refinery", link: "recipe/machine/refinery" },
                        ],
                    },
                ],
            },
            {
                text: "Events",
                items: [
                    { text: "Deep Drill Registration", link: "event/deepdrill_registration" },
                    { text: "Soul Collection", link: "event/soulcollection" },
                    { text: "Tags", link: "event/tags" },
                ],
            },
        ],
    },
})
